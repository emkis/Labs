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
  if (!pathValues) return path;

  let parsedUrl: string = path;

  for (const key in pathValues) {
    const optionValue = pathValues[key]!;
    parsedUrl = parsedUrl.replaceAll(`{${key}}`, optionValue);
  }

  return parsedUrl;
}
