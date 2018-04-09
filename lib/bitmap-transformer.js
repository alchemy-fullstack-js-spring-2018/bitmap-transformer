const bitmapHeader = require('./bitmap-header');
const fs = require('fs');
const readFrom = require('./read-from');

module.exports = class BitmapTransformer {
    constructor(filename, header) {
        this.header = header;
        this.filename = filename;
        this.readStream = fs.createReadStream(filename, {
            start: this.header.pixelOffset,
            highWaterMark: 300
        });
    }

    transform(fn, outFile) {
        
        const { readStream, header, filename } = this;
        const writeStream = fs.createWriteStream(outFile);

        return new Promise((resolve, reject) => {
            readFrom(filename, header.pixelOffset)
                .then(buffer => {
                    writeStream.write(buffer);
                    readStream.on('data', chunk => {
                        for(let i = 0; i < chunk.length; i += 3){
                            const pix = {
                                r: chunk[i],
                                g: chunk[i + 1],
                                b: chunk[i + 2]
                            };
                            const transPix = fn(pix);
                            const bufferPix = Buffer.alloc(3);

                            bufferPix.writeUInt8(transPix.r, 0);
                            bufferPix.writeUInt8(transPix.g, 1);
                            bufferPix.writeUInt8(transPix.b, 2);
                            writeStream.write(bufferPix);
                        }
                    });

                    readStream.on('close', () => {
                        writeStream.end(resolve);
                    });

                    readStream.on('error', reject);
                });
        });
    }

    static create(filename) {
        return bitmapHeader(filename)
            .then(header => {
                return new Promise((resolve, reject) => {
                    const bitmap = new BitmapTransformer(filename, header);
                    resolve(bitmap);
                    reject(console.log('error in: bitmap-transformer'));
                });
            });
    }
};