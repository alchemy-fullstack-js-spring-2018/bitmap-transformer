const bitmapHeader = require('./bitmap-header');
const readFrom = require('./readFrom');
const fs = require('fs');


class BitmapTransform {
    constructor(fileName, header) {
        // this.buffer = buffer;
        this.header = header;
        this.fileName = fileName;
        this.readStream = fs.createReadStream(fileName, {
            encoding: 'utf8',
            highWaterMark: (this.header.bitsPerPixel / 8), //bits to bytes
            start: (this.header.pixelOffset / 8) //bits to bytes
        });
    }

    transform(fn, outputFile) {
        const { readStream } = this;
        const writeStream = fs.createWriteStream(outputFile, {
            encoding: 'utf8',
            highWaterMark: (BitmapTransform.header.bitsPerPixel / 8), //bits to bytes
            // start: (this.header.pixelOffset / 8) //bits to bytes
        });

        return new Promise((resolve, reject) => {
            writeStream.write(this.header)
                .then(() => {

                    return readStream.on('data', pixel => {
                        const readPixel = {};
                        readPixel.b = pixel.slice(0, 7);
                        readPixel.g = pixel.slice(8, 15);
                        readPixel.r = pixel.slice(16, 24);
            
                        const newPixel = fn(readPixel);
            
                        writeStream.write(newPixel);
                    }),
        
                    readStream.on('close', () => {
                        writeStream.end(resolve);
                    }),
        
                    readStream.on('error', reject);
                });
        });
    }

    static create(fileName){

        return bitmapHeader(fileName)
            .then(header => {
                return new BitmapTransform(fileName, header);
            });
    }
}


module.exports = BitmapTransform;