const bitmapHeader = require('./bitmap-header');
const fs = require('fs');
const readFrom = require('./read-from');

module.exports = class BitmapTransformer {
    constructor(filename, header) {
        this.header = header;
        this.readStream = fs.createReadStream(filename, {
            highWaterMark: 300
        });
    }

    transform(fn, outFile) {
        
        const { readStream, header } = this;
        const writeStream = fs.createWriteStream(outFile);

        

        return new Promise((resolve, reject) => {
            readStream.on('data', chunk => {
                for(let i = header.pixelOffset; i < chunk.length; i += 3){
                    const pix = {
                        r: chunk[i],
                        g: chunk[i + 1],
                        b: chunk[i + 2]
                    };
                    const transPix = fn(pix);

                    writeStream.write(transPix.r.toString());
                    writeStream.write(transPix.g.toString());
                    writeStream.write(transPix.b.toString());
                }
            });

            readStream.on('close', () => {
                writeStream.end(resolve);
            });

            readStream.on('error', 'reject');
        });


        // for(let i = this.header.pixelOffset; i < this.header.fileSize; i += 3) {

        //     const pix = {
        //         r: readStream[i],
        //         g: readStream[i + 1],
        //         b: readStream[i + 2]
        //     };
            
        //     let transpix = fn(pix);

        //     readStream[i] = transpix.r;
        //     readStream[i + 1] = transpix.g;
        //     readStream[i + 2] = transpix.b;           
        // }

        // return readStream;
    }

    static create(filename) {
        return bitmapHeader(filename)
            .then(header => {
                return new Promise((resolve, reject) => {
                    console.log(filename);
                    const bitmap = new BitmapTransformer(filename, header);
                    resolve(bitmap);
                    reject(console.log('error in: bitmap-transformer'));
                });
            });
    }
};