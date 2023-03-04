import packageJson from './playground/package.json'
import { writeFile } from 'fs/promises'
import { resolve } from 'node:path'
import { format } from 'prettier'

type PackageProperties = keyof typeof packageJson

// add the path of the `package.json` you want to clear here
const packagePath = resolve(__dirname, 'playground', 'package.json')

// add the keys you want to remove
const unwantedProperties: PackageProperties[] = [
  'keywords',
  'files',
  'scripts',
  'devDependencies',
]

init()

function init() {
  deleteProperties()
  rewritePackageJson()
}

function deleteProperties() {
  unwantedProperties.forEach((key) => delete packageJson[key])
}

async function rewritePackageJson() {
  try {
    const content = JSON.stringify(packageJson)
    const prettifiedContent = format(content, { parser: 'json-stringify' })
    await writeFile(packagePath, prettifiedContent)
  } catch {
    console.error('Failed to rewrite the cleaned package.json file.')
  }
}
