const fs = require('fs');
const readFrom = require('./read-from');
const bitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransformer {
    constructor(fileName, header) {
        this.fileName = fileName;
        this.header = header;
        this.readStream = fs.createReadStream(fileName, {
            encoding: 'utf8',
            start: this.header.pixelOffset / 8,
            highWaterMark: this.header.bitsPerPixel / 8
        });
    }
    
    transform(fn, outputFileName) {
        const { fileName, readStream } = this;
        
        const writeStream = fs.createWriteStream(outputFileName);

        return new Promise((resolve, reject) => {
            readFrom(fileName, this.header.pixelOffset)
                .then(buffer => {
                    writeStream.write(buffer);

                    readStream.on('data', chunk => {

                        for(let i = 0; i < chunk.length; i += 3) {

                            const streamPixel = {};
                            streamPixel.b = chunk.readUInt8(i); // getting error: chunk.readUInt8 is not a function
                            streamPixel.g = chunk.readUInt8(i + 1);
                            streamPixel.r = chunk.readUInt8(i + 2);

                            const newPixel = fn(streamPixel);

                            buffer.writeUInt8(newPixel.b, 0);
                            buffer.writeUInt8(newPixel.g, 1);
                            buffer.writeUInt8(newPixel.r, 2);

                            writeStream.write(buffer);
                        }
                    }),

                    readStream.on('close', () => {
                        writeStream.end(resolve);
                    }),

                    readStream.on('error', reject);
                });
        });
    }

    static create(fileName) {
        return bitmapHeader(fileName)
            .then(header => {
                return new Promise(resolve => {
                    return resolve(new BitmapTransformer(fileName, header));
                });
            });
    }
};