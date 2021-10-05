import fs from 'fs';

export const createFile = (
  basePath: string,
  filename: string,
  content: string
): boolean => {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }

  const fileDescriptor = fs.openSync(basePath + filename, 'w');
  fs.appendFileSync(fileDescriptor, content, 'utf8');
  if (fileDescriptor !== undefined) fs.closeSync(fileDescriptor);

  return true;
};
