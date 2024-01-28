import FileHelper from 'src/util/file.helper';
import { readFile } from 'fs';

FileHelper.migrateFileByLine('./Daily.txt', './Daily.json');
console.log('import.ts');

// TODO: Read the file after promise
