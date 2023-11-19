import { KV_SEPARATAOR, LINE_SEPARATOR } from './appConfig';
import { Reader } from './reader';
// Line
// key 4096 bytes
// separator 1 bytes
// value 65535 bytes
// line break 1 bytes
// total: 69633 bytes
class App {
    kvSeparator: string;
    lineSepatator: string;
    chunkSize: number;
    reader: Reader;
    constructor(kvSeparator: string, lineSepatator: string, reader: Reader) {
        this.kvSeparator = kvSeparator;
        this.lineSepatator = lineSepatator;
        this.chunkSize = 69633;
        this.reader = reader;
    }
    public async run() {
        const { fileName, searchKey } = this.readArguments();
        const reader = this.reader.readStream(fileName, this.chunkSize, 'utf8');
        const linesInChunk: string[] = [];
        let chunkString = '';
        let success = false;
        for await (const chunk of reader) {
            if (success) {
                reader.destroy();
                break;
            }
            for (let i = 0; i < chunk.length; i++) {
                if (chunk[i] !== this.lineSepatator) {
                    chunkString += chunk[i];
                } else {
                    linesInChunk.push(chunkString);
                    const [key, value] = chunkString.split(this.kvSeparator);
                    if (key === searchKey) {
                        console.log('Result')
                        console.log(value);
                        success = true;
                    }
                    chunkString = '';
                }
            }
        }
        if (!success) {
            console.log(`Failed to find key: ${searchKey} in file ${fileName}`);
        }
    }

    public readArguments(): { fileName: string; searchKey: string } {
        if (process.argv.length <= 3) {
            console.log('Missing filename or searchkey');
            console.log('Use: npx ts-node app.ts [path-to-file] [search-key]');
            process.exit(0);
        } else {
            console.log(
                `Using file ${process.argv[2]}, and searching for ${process.argv[3]}`
            );
            return { fileName: process.argv[2], searchKey: process.argv[3] };
        }
    }
}

new App(KV_SEPARATAOR, LINE_SEPARATOR, new Reader()).run();
