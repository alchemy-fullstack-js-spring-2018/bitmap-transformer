const bitmapHeader = require('./bitmap-header');
const fs = require('fs');
const readFrom = require('./read-from');

module.exports = class BitmapTransform {
    constructor(filename, header) {
        this.filename = filename;
        this.header = header;
        this.readStream = fs.createReadStream(filename, {
            start: header.pixelOffset,
            highWaterMark: 3000
        });
    }

    transform(fn, filename) {
       
        const { readStream } = this;
        const writeStream = fs.createWriteStream(filename);

        return new Promise((resolve, reject) => {
            readFrom(this.filename, this.header.pixelOffset)
                .then(buffer => {
                    writeStream.write(buffer);
                    readStream.on('data', chunk => {
                        for(let i = 0; i < chunk.length; i += 3) {
                            const colors = {};
                            colors.b = chunk.readUInt8(i);
                            colors.g = chunk.readUInt8(i + 1);
                            colors.r = chunk.readUInt8(i + 2);
        
                            const transformed = fn(colors);
                            const buffer = Buffer.alloc(3);
        
                            buffer.writeUInt8(transformed.b, 0);
                            buffer.writeUInt8(transformed.g, 1);
                            buffer.writeUInt8(transformed.r, 2);
                            writeStream.write(buffer);
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
                return (new BitmapTransform(filename, header));
            });
    }
};