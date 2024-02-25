export function urlParser(
  url: string,
  urlValues: Record<string, string> | undefined
): string {
  const requiredUrlValues = getUrlValues(url);
  if (!requiredUrlValues) return url;

  if (!urlValues || Object.keys(urlValues).length === 0) {
    throw new URLParserError(`The values for "${url}" URL are required.`);
  }

  let parsedUrl: string = url;
  const replacedValues: string[] = [];

  for (const key in urlValues) {
    const isRequiredKey = requiredUrlValues.includes(key);
    const optionValue = urlValues[key];
    if (!isRequiredKey || !optionValue) continue;

    parsedUrl = parsedUrl.replaceAll(`{${key}}`, optionValue);
    replacedValues.push(key);
  }

  if (replacedValues.length !== requiredUrlValues.length) {
    const missingKeys = getUrlValues(parsedUrl)!;
    const formattedMissingKeys = missingKeys.join(", ");

    throw new URLParserError(
      `The values for "${url}" URL are required, missing keys: ${formattedMissingKeys}.`
    );
  }

  return parsedUrl;
}

/**
 * Returns the dynamic values from a url.
 *
 * @example
 * getUrlValues("/orders") // undefined
 * getUrlValues("/orders/{id}") // ["id"]
 * getUrlValues("/orders/{id}/cancel/{id}") // ["id"]
 * getUrlValues("/orders/{id}/foo/{t_id}") // ["id", "t_id"]
 */
function getUrlValues(url: string): string[] | undefined {
  const matches = url.match(/{(.*?)}/g);
  if (!matches) return;

  const uniqueMatches = Array.from(new Set(matches));
  return uniqueMatches;
}

class URLParserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "URLParserError";
  }
}
