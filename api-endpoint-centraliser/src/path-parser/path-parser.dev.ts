/**
 * Parses a path with their path params.
 *
 * @param path - The path string to be parsed.
 * @param pathValues - The values to be replaced within the path.
 */
export function pathParser(
  path: string,
  pathValues: Record<string, string> | undefined
): string {
  const requiredPathParams = getPathParams(path);
  if (!requiredPathParams) return path;

  if (!pathValues || Object.keys(pathValues).length === 0) {
    throw new PathParserError(`The values for "${path}" URL are required.`);
  }

  let parsedUrl: string = path;
  const replacedValues: string[] = [];

  for (const key in pathValues) {
    const isRequiredParam = requiredPathParams.includes(key);
    const optionValue = pathValues[key];
    if (!isRequiredParam || !optionValue) continue;

    parsedUrl = parsedUrl.replaceAll(`{${key}}`, optionValue);
    replacedValues.push(key);
  }

  if (replacedValues.length !== requiredPathParams.length) {
    const missingKeys = getPathParams(parsedUrl)!;
    const formattedMissingKeys = missingKeys.join(", ");

    throw new PathParserError(
      `The values for "${path}" path are required, missing keys: ${formattedMissingKeys}`
    );
  }

  return parsedUrl;
}

/**
 * Returns the dynamic values from a url.
 *
 * @example
 * getPathParams("/orders") // undefined
 * getPathParams("/orders/{id}") // ["id"]
 * getPathParams("/orders/{id}/cancel/{id}") // ["id"]
 * getPathParams("/orders/{id}/foo/{t_id}") // ["id", "t_id"]
 */
function getPathParams(url: string): string[] | undefined {
  const matches = url.match(/{(.*?)}/g);
  if (!matches) return;

  const matchesWithoutBrackets = matches.map((match) => match.slice(1, -1));
  const uniqueMatches = Array.from(new Set(matchesWithoutBrackets));
  return uniqueMatches;
}

export class PathParserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = PathParserError.name;
  }
}
