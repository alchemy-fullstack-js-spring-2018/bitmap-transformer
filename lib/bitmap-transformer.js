const bitmapHeader = require('./bitmap-header');
const fs = require('fs');

module.exports = class BitmapTransform {
    constructor(filename, header) {
        this.filename = filename;
        this.header = header;
        this.readStream = fs.createReadStream(filename, {
            start: 10,
            highWaterMark: 5009
        });
    }

    transform(fn, filename) {
       
        const readStream = this.readStream;
        const writeStream = fs.createWriteStream(filename);

        return new Promise((resolve, reject) => {
            readStream.on('data', chunk => {
                for(let i = this.header.pixelOffset; i < chunk; i++) {
                    const colors = {};
                    colors.b = this.header.readUInt8(i);
                    colors.g = this.header.readUInt8(i + 1);
                    colors.r = this.header.readUInt8(i + 2);

                }        
                writeStream.write(fn(chunk));
            });

            readStream.on('close', () => {
                writeStream.end(resolve);
            });
            readStream.on('error', reject);
        });

            
        //     const transformed = fn(colors);

        //     this.filename.writeUInt8(transformed.b, i);
        //     this.filename.writeUInt8(transformed.g, i + 1);
        //     this.filename.writeUInt8(transformed.r, i + 2);
        // }
      
    }

    static create(filename) {
        return bitmapHeader(filename)
            .then(header => {
                return new Promise((resolve, reject) => {
                    return resolve(new BitmapTransform(filename, header));
                });
            });
    }
};