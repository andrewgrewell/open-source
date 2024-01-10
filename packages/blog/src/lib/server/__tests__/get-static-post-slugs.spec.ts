import { extractMetaFromFile } from '../extract-meta-from-file';
import { getStaticPostSlugs } from '../get-static-post-slugs';
import { readDirAsync } from '@ag-oss/fs';

jest.mock('@ag-oss/fs', () => ({
  ...(jest.requireActual('@ag-oss/fs') as Record<string, unknown>),
  readDirAsync: jest.fn(),
}));
jest.mock('../extract-meta-from-file', () => ({
  extractMetaFromFile: jest.fn(),
}));

const mockReadDirAsync = readDirAsync as jest.MockedFunction<typeof readDirAsync>;
const mockExtractMetaFromFile = extractMetaFromFile as jest.MockedFunction<any>;

describe('getStaticPostSlugs', () => {
  it('should return the expected result', async () => {
    mockReadDirAsync.mockResolvedValueOnce([
      '2021-01-01_test-title.md',
      '2021-01-02_test-title-2.md',
      '2021-01-03_test-title-3.md',
    ] as any);
    mockExtractMetaFromFile.mockImplementation((file) => {
      const [date, slug] = file.split('_');
      return {
        date,
        slug: slug.replace('.md', ''),
      };
    });
    expect(await getStaticPostSlugs('postsPath')).toMatchInlineSnapshot(`
      [
        "test-title",
        "test-title-2",
        "test-title-3",
      ]
    `);
  });
});
