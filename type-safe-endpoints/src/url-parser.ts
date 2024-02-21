export function urlParser(
  url: string,
  urlOptions: Record<string, string> | undefined
): string {
  if (!urlOptions) return url;

  let parsedUrl: string = url;

  for (const key in urlOptions) {
    const optionValue = urlOptions[key]!;
    parsedUrl = parsedUrl.replaceAll(`{${key}}`, optionValue);
  }

  return parsedUrl;
}
