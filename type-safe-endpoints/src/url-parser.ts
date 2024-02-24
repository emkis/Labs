export function urlParser(
  url: string,
  urlValues: Record<string, string> | undefined
): string {
  if (!urlValues) return url;

  let parsedUrl: string = url;

  for (const key in urlValues) {
    const optionValue = urlValues[key]!;
    parsedUrl = parsedUrl.replaceAll(`{${key}}`, optionValue);
  }

  return parsedUrl;
}
