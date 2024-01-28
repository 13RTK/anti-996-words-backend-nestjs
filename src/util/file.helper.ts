import { createReadStream, appendFile, readFile } from 'fs';
import { createInterface } from 'readline';
import FormatHelper from './format.helper';

class FileHelper {
  public static migrateFileByLine(filepath: string, outputPath: string): void {
    const readLineInterface = createInterface({
      input: createReadStream(filepath),
    });
    const words: string[] = [];

    // TODO: Promisify the readLine
    readLineInterface.on('line', (curLine) => {
      const formatStringArr = FormatHelper.stringToJSON(curLine);

      words.push(
        JSON.stringify({
          word: formatStringArr[0],
          answer: formatStringArr[1],
        }),
      );
    });

    readLineInterface.on('close', () => {
      this.appendFilePromise(
        outputPath,
        JSON.stringify({
          createDate: new Date().toDateString(),
          words,
        }),
      );
    });
  }

  // Promisify the readFile
  public static readFilePromise(filepath): Promise<string> {
    return new Promise((resolve, reject) => {
      readFile(filepath, 'utf-8', (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    });
  }

  public static appendFilePromise(
    filepath: string,
    data: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      appendFile(filepath, data, (error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }
}

export default FileHelper;
