const dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
const titleRegex = /_(.+)\.md/;
export function extractMetaFromFile(fileName: string) {
  const date = fileName.match(dateRegex)?.[0];
  if (!date) {
    throw new Error(`Unable to extract date, invalid file name: ${fileName}`);
  }
  const slug = fileName.match(titleRegex)?.[1];
  if (!slug) {
    throw new Error(`Unable to extract slug, invalid file name: ${fileName}`);
  }
  return {
    date,
    slug,
  };
}
