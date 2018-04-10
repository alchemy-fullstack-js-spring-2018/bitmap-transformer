const bitmapHeader = require('./bitmap-header');
const fs = require('fs');
const readFrom = require('./read-from');

class BitmapTransformer { 
    constructor(fileName, header) {
        this.header = header;
        this.fileName = fileName;
        this.ReadStream = fs.createReadStream(fileName, {
            start: this.header.pixelOffset / 8
        });
    }

    

    transform(fn, outputFileName) {
        const { readStream } = this;
        const writeStream = fs.createWriteStream(outputFileName); 
    
       

        return new Promise((resolve, reject) => {
            readFrom(this.fileName, this.header.pixelOffset)
                .then(buffer => {
                    writeStream.write(buffer);

                    readStream.on('data', chunk => {
                
            
                        for(let i = 0; i < chunk.length; i += 3){
                        
                            const streamPixel = {};
                            streamPixel.r = chunk.readUInt8(i);
                            streamPixel.g = chunk.readUInt8(i + 1);
                            streamPixel.b = chunk.readUInt8(i + 2);
            
                            const newPixel = fn(chunk);
                            const buff = Buffer.alloc(3);
            
                            buff.writeUInt8(newPixel.r, 0);
                            buff.writeUInt8(newPixel.g, 1);
                            buff.writeUInt8(newPixel.b, 2);

                            writeStream.write(buffer);
            
                        }
                    });

                    readStream.on('close', () => {
                        writeStream.end(resolve);
                    }),

                    readStream.on('error', reject);
                });


        });
       
    }
}
BitmapTransformer.create = function(fileName) {
    return bitmapHeader(fileName)
        .then(header => {
            return new Promise (resolve => {
                return resolve(new BitmapTransformer(fileName, header));
            });
        });
                
};
    

module.exports = BitmapTransformer;