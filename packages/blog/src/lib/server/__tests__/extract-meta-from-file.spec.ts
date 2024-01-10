import { extractMetaFromFile } from '../extract-meta-from-file';

describe('extractMetaFromFile', () => {
  const testDate = '2345-12-31';
  const testSlug = 'test-title';
  const testFileName = `${testDate}_${testSlug}.md`;

  it('should return the date from the file name', () => {
    const { date } = extractMetaFromFile(testFileName);
    expect(date).toEqual(testDate);
  });

  it('should throw an error if unable to extract date', () => {
    const fileName = 'march-01-2023_slug';
    expect(() => extractMetaFromFile(fileName)).toThrow(
      `Unable to extract date, invalid file name: ${fileName}`,
    );
  });

  it('should return the slug from the file name', () => {
    const { slug } = extractMetaFromFile(testFileName);
    expect(slug).toEqual(testSlug);
  });

  it('should throw an error if unable to extract slug', () => {
    const fileName = '1999-01-01';
    expect(() => extractMetaFromFile(fileName)).toThrow(
      `Unable to extract slug, invalid file name: ${fileName}`,
    );
  });
});
