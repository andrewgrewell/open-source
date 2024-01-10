import { extractMetaFromFile } from '../extract-meta-from-file';
import { getStaticPost } from '../get-static-post';
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

describe('getStaticPost', () => {
  it('should return the expected result', async () => {
    mockReadDirAsync.mockResolvedValueOnce(['2021-01-01_test-title.md' as any]);
    mockExtractMetaFromFile.mockReturnValueOnce({
      date: '2021-01-01',
      slug: 'test-title',
    });
    mockReadFileAsync.mockResolvedValueOnce('test content');
    mockSerialize.mockResolvedValueOnce('serialized content');
    expect(await getStaticPost('postsPath', 'test-title')).toMatchInlineSnapshot(`
      {
        "createdDate": "2021-01-01",
        "mdx": "serialized content",
        "slug": "test-title",
      }
    `);
  });
});
