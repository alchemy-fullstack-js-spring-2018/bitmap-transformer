const bitmapHeader = require('./bitmap-header');
const fs = require('fs');

module.exports = class BitmapTransformer {
    constructor(filename, header) {
        this.header = header;
        this.readStream = fs.createReadStream(filename, {
            encoding: 'utf8',
            highWaterMark: 300
        });
    }

    transform(fn, outFile) {
        
        const { readStream } = this;
        const writeStream = fs.createWriteStream(outFile);

        return new Promise((resolve, reject) => {

            readStream.on('data', chunk => {

                writeStream.write(fn(chunk));
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
                    // const = fs.readFileSync(filename);
                    console.log(filename);
                    const bitmap = new BitmapTransformer(filename, header);
                    resolve(bitmap);
                });
            });
    }
};