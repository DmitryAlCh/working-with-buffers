import { randomBytes } from 'crypto';
import { KV_SEPARATAOR, LINE_SEPARATOR } from './appConfig';
import { Writer } from './reader';

class TestFileGenerator {
    fileName: string;
    sizeInMb: number;
    chunkSize: number;
    kvSeparotor: string;
    lineSeprator: string;
    lineSizeInMb: number;
    constructor(
        fileName: string = process.argv[2],
        sizeInMb: number = parseInt(process.argv[3]),
        chunkSize: number = 16384,
        kvSeparator: string = KV_SEPARATAOR,
        lineSeparator: string = LINE_SEPARATOR
    ) {
        this.fileName = fileName;
        this.sizeInMb = sizeInMb;
        this.chunkSize = chunkSize;
        this.kvSeparotor = kvSeparator;
        this.lineSeprator = lineSeparator;
        this.lineSizeInMb = 0.07; //according to task
    }
    public make(): void {
        console.log(`Starting to write ${this.fileName}`);
        const writer = new Writer().writeStream(
            this.fileName,
            this.chunkSize,
            'utf8'
        );
        for (
            let i = 0;
            i < Math.floor(this.sizeInMb / this.lineSizeInMb);
            i++
        ) {
            const line = `${this.generateRandomHex(4096)}${
                this.kvSeparotor
            }${this.generateRandomHex(65535)}${this.lineSeprator}`;

            if (i == Math.floor(this.sizeInMb / this.lineSizeInMb) / 2) {
                console.log(
                    'Here is a an existing key somewhere in the middle',
                    line.split(this.lineSeprator)[0]
                );
            }
            writer.write(line);
        }
        writer.end();
        console.log(`Completed writing ${this.fileName}`);
    }
    public generateRandomHex(sizeInBytes: number): string {
        const lengthInBytes = Math.floor(Math.random() * sizeInBytes);
        return randomBytes(lengthInBytes).toString('hex');
    }
}

new TestFileGenerator().make();
