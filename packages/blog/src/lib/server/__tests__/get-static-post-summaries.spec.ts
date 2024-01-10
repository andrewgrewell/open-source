import { extractMetaFromFile } from '../extract-meta-from-file';
import { getStaticPostSummaries } from '../get-static-post-summaries';
import { readDirAsync, readFileAsync } from '@ag-oss/fs';
import { serialize } from 'next-mdx-remote/serialize';

jest.mock('@ag-oss/fs', () => ({
  ...(jest.requireActual('@ag-oss/fs') as Record<string, unknown>),
  readDirAsync: jest.fn(),
  readFileAsync: jest.fn(),
}));
jest.mock('../extract-meta-from-file', () => ({
  extractMetaFromFile: jest.fn(),
}));
jest.mock('next-mdx-remote/serialize', () => ({
  serialize: jest.fn(),
}));

const mockReadDirAsync = readDirAsync as jest.MockedFunction<typeof readDirAsync>;
const mockExtractMetaFromFile = extractMetaFromFile as jest.MockedFunction<any>;
const mockReadFileAsync = readFileAsync as jest.MockedFunction<any>;
const mockSerialize = serialize as jest.MockedFunction<any>;

describe('getStaticPostSummaries', () => {
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
    mockReadFileAsync.mockImplementation((file) => `${file} content`);
    mockSerialize.mockImplementation((source) => `${source} serialized`);
    expect(await getStaticPostSummaries('postsPath')).toMatchInlineSnapshot(`
      [
        {
          "createdDate": "2021-01-01",
          "slug": "test-title",
        },
        {
          "createdDate": "2021-01-02",
          "slug": "test-title-2",
        },
        {
          "createdDate": "2021-01-03",
          "slug": "test-title-3",
        },
      ]
    `);
  });
});
