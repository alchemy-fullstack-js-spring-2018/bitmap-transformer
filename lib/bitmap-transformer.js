const bitmapHeader = require('./bitmap-header');
const readFrom = require('./readFrom');
const fs = require('fs');


class BitmapTransform {
    constructor(fileName, header) {
        this.header = header;
        this.fileName = fileName;
        this.readStream = fs.createReadStream(fileName, {
            start: this.header.pixelOffset
        });
    }

    transform(fn, outputFile) {
        const { readStream } = this;
        const writeStream = fs.createWriteStream(outputFile);
        const fileName = this.fileName;

        return new Promise((resolve, reject) => {

            readFrom(fileName, this.header.pixelOffset)
                .then(buffer => {
                    writeStream.write(buffer);

                    readStream.on('data', chunk => {

                        for(let i = 0; i < chunk.length; i += 3){
                            const readPixel = {};
                            readPixel.b = chunk.readUInt8(i);
                            readPixel.g = chunk.readUInt8(i + 1);
                            readPixel.r = chunk.readUInt8(i + 2);
                    
                            const newPixel = fn(readPixel);
                            const buffer = Buffer.alloc(3);
                    
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

    static create(fileName){

        return bitmapHeader(fileName)
            .then(header => {
                return new Promise ((resolve) => {
                    return resolve(new BitmapTransform(fileName, header));
                });
            });
    }
}


module.exports = BitmapTransform;