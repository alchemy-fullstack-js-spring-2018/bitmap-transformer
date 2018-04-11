const BitmapHeader = require('./bitmap-header');
const fs = require('fs');
const readFrom = require('../lib/read-from');

class BitmapTransformer {
    constructor(filename, header) {
        this.filename = filename;
        this.header = header;
        this.readStream = fs.createReadStream(filename, {
            start: header.pixelOffset
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
                        for(let i = 0; i < chunk.length; i += 3){
                            let colorData = fn({ r: (chunk[i]), g: chunk[i + 1], b: chunk[i + 2] });
                            const buffer = Buffer.alloc(3);
                            buffer.writeUInt8(colorData.r, 0);
                            buffer.writeUInt8(colorData.g, 1);
                            buffer.writeUInt8(colorData.b, 2);
                            writeStream.write(buffer);
                        }
        
                    });
        
                    readStream.on('close', () => {
                        writeStream.end(resolve);
                    });
        
                    readStream.on('error', reject);
                })
                .catch(err => reject(err));
                
        });
    }
}

BitmapTransformer.create = function(filename){
    return BitmapHeader(filename)
        .then(header =>{
            return new BitmapTransformer(filename, header); 
        });
};
module.exports = BitmapTransformer;