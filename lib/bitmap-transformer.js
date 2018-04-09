const fs = require('fs');
const readFrom = require('./read-from');
const bitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransformer {
    constructor(fileName, header) {
        this.header = header;
        this.fileName = fileName;
        this.readStream = fs.createReadStream(fileName, {
            encoding: 'utf8',
            highWaterMark: this.header.bitsPerPixel / 8,
            start: this.header.pixelOffset / 8
        });
    }
    
    transform(fn, outputFileName) {
        const { fileName, readStream } = this;
        
        const writeStream = fs.createWriteStream(outputFileName, {
            encoding: 'utf8',
            highWaterMark: this.header.bitsPerPixel / 8,
        });

        return new Promise((resolve, reject) => {
            let newHeader;
            readFrom(fileName, 112)
                .then(buffer => {
                    newHeader = buffer.readIntLE(0, 14);
                    return resolve(newHeader);
                });

            writeStream.write(newHeader)
                .then(() => {

                    return readStream.on('data', pixel => {
                        const streamPixel = {};
                        streamPixel.b = pixel.slice(0, 7);
                        streamPixel.g = pixel.slice(8, 15);
                        streamPixel.r = pixel.slice(16, 24);

                        const newPixel = fn(streamPixel);
                        writeStream.write(newPixel);
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
                return new Promise ((resolve) => {
                    return resolve(new BitmapTransformer(fileName, header));
                });
            });
    }
};