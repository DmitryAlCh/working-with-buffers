import fs from 'fs';

interface CustomReader extends NodeJS.ReadableStream {
    destroy: () => void;
}
// Nodejs has the destroy method, but TS does not

export class Reader {
    readStream(
        fileName: string,
        chunkSize: number,
        encoding: BufferEncoding
    ): CustomReader {
        return fs.createReadStream(fileName, {
            encoding: encoding,
            highWaterMark: chunkSize,
        });
    }
}

export class Writer {
    writeStream(
        fileName: string,
        chunkSize: number = 16384, // Node default
        encoding: BufferEncoding
    ): NodeJS.WritableStream {
        return fs.createWriteStream(fileName, {
            encoding,
            highWaterMark: chunkSize,
        });
    }
}
