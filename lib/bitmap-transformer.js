const bitmapHeader = require('./bitmap-header');
const fs = require('fs');
const readFrom = require('./read-from');

// const bitMap = bitmapTransformer;

module.exports = class bitmapTransformer {
    constructor(fileName, header) {
        this.header = header;
        this.fileName = fileName;
        this.ReadStream = fs.createReadStream(fileName, {
            start: header.pixelOffset / 8
        });
    }    
    static create(fileName) {
        return bitmapHeader(fileName)
            .then(header => {
                return new Promise(resolve => {
                    return resolve(new bitmapTransformer(fileName, header)); 
                });                    
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
                            streamPixel.r = chunk.readUInt8(i);
                            streamPixel.g = chunk.readUInt8(i + 1);
                            streamPixel.b = chunk.readUInt8(i + 2);

                            const newPixel = fn(newPixel);
                            const buffer = Buffer.alloc(3);

                            buffer.writeUInt8(newPixel.r, 0);
                            buffer.writeUInt8(newPixel.g, 1);
                            buffer.writeUInt8(newPixel.b, 2);

                            writeStream.write(buffer);

                        }
                        readStream.on('close', () => {
                            writeStream.end(resolve);
                        }),

                        readStream.on('error', reject);
                    });
                });
            
        }); 
    }        
};           
    
    

