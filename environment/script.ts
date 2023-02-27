import fs from 'node:fs'
import path from 'node:path'
import { program } from 'commander'

type ProgramOptions = {
  directories: string
  extensions: string
  root: string
  ignore: string
}

program
  .option('-d, --directories <paths>', 'directories you want to check for env values', 'src, app')
  .option('-e, --extensions <types>', 'file extensions you support', '.ts, .tsx, .js, .jsx')
  .option('-i, --ignore <envs>', 'env values to ignore', 'DEV, PROD, NODE_ENV')
  .requiredOption('-r, --root <path>', 'root path where you have your env files')
  .parse(process.argv)

const programOptions = program.opts<ProgramOptions>()
const envPrefixes = ['import.meta.env', 'process.env']
const directoriesToSearch = getParsedArguments(programOptions.directories)
const extensionsToSearch = getParsedArguments(programOptions.extensions)
const ignoredEnvValues = getParsedArguments(programOptions.ignore)
const rootDirectory = programOptions.root.trim()

const envFilesToSearch = [
  path.resolve(rootDirectory, '.env'),
  path.resolve(rootDirectory, '.env.local'),
  path.resolve(rootDirectory, '.env.development'),
]

findUninitializedEnvVars()

function findUninitializedEnvVars() {
  const initialized = envFilesToSearch.map(initializedEnvVars).flat()
  const used = directoriesToSearch.map(usedEnvVariables).flat()
  const uninitialized = used.filter((env) => {
    if (ignoredEnvValues.includes(env)) return false
    return !initialized.includes(env)
  })

  if (uninitialized.length === 0) return
  const outputMessage = makeOutputMessage(uninitialized)
  console.warn(outputMessage)
  process.exit(1)
}

function makeOutputMessage(uninitialized: string[]) {
  const isPlural = uninitialized.length > 1
  const word = isPlural ? 'variables' : 'variable'
  const envKeys = uninitialized.map((key) => `"${key}"`).join(', ')

  return `The environment ${word} ${envKeys} were not initialized!` 
    + `\n` + 
    `Make sure all the variables you are using on you project are being initialized in you ".env*" files.`
}

function getParsedArguments(input: string) {
  const rawInputs = input.split(',')
  const sanitizedInputs = rawInputs
    .filter((input) => Boolean(input.trim()))
    .map((input) => input.trim())

  return sanitizedInputs
}

function safeRead<T extends () => ReturnType<T>>(readHandler: T) {
  try {
    return readHandler()
  } catch (error: any) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

function usedEnvVariables(dir: string): string[] {
  const files = safeRead(() => fs.readdirSync(dir))
  if (!files) return []
  const envValues: string[] = []

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    const isDirectory = stat.isDirectory()

    if (isDirectory) {
      envValues.push(...usedEnvVariables(filePath))
    }

    const fileExtension = path.extname(filePath)
    const isValidExtension = extensionsToSearch.includes(fileExtension)
    if (!isValidExtension) continue

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const hasEnvValues = envPrefixes.some((string) => fileContent.includes(string))
    if (!hasEnvValues) continue
    const fileLines = fileContent.split('\n')

    fileLines.forEach((line) => {
      const match = line.match(/(?:import\.meta\.env|process\.env)\.(\w+)/)
      const envValue = match ? match[1] : null
      envValue && envValues.push(envValue)
    })
  }
  
  return envValues
}

function initializedEnvVars(path: string): string[] {
  const envFile = safeRead(() => fs.readFileSync(path, 'utf8'))
  if (!envFile) return []

  const lines = envFile.split('\n')
  const result: string[] = []

  for (const rawLine of lines) {
    const line = rawLine.trim()
    const isComment = line?.startsWith('#')
    if (!line || isComment) continue

    const [key, value] = line.split('=')
    const sanitizedValue = value ? value.trim() : null
    sanitizedValue && result.push(key)
  }

  return result
}
