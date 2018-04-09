const bitmapHeader = require('./bitmap-header');
const fs = require('fs');
const readFrom = require('/.read-from');

module.exports = class bitmapTransformer {
    constructor(fileName, header) {
        this.header = header;
        this.fileName = fileName;
        this.ReadStream = fs.createReadStream(fileName, {
            encoding: 'utf8',
            highWaterMark: this.header.bitsPerPixel / 8,
            start: this.header.pixelOffset / 8
        });
    }

    

    transform(fn, outputFileName) {
        const { fileName, readStream } = this;

        const writeStream = fs.createWriteStream(outputFileName, {
            encoding: 'utf8',
            highWaterMark: this.header.bitsPerPixel / 8,
        });

        return new Promise((resolve, reject) => {
            let newHeader;
            readFrom(fileName, 112)
                .then(buffer => {
                    newHeader = buffer.readIntLE(0, 14);
                    return resolve(newHeader);
                });
                writeStream.write(newHeader)
                    .then(() => {
                        
                        return readStream.on('data', pixel => {
                            const streamPixel = {};
                            streamPixel.r = pixel.slice(0, 7);
                            streamPixel.g = pixel.slice(8, 15);
                            streamPixel.b = pixel.slice(16, 24);

                            const newPixel = fn(streamPixel);
                                writeStream.write(newPixel);

                        }),

                        readStream.on('close', () => {
                            writeStream.end(resolve);
                        }),

                        readStream.on('error', reject);
                    });


        });
        // const buff = this.buffer;
        // const head = this.header;

        // for(let i = head.pixelOffset; i < head.fileSize; i += 3){
        //     const pixel = {};
        //     pixel.r = buff.readUInt8(i);
        //     pixel.g = buff.readUInt8(i + 1);
        //     pixel.b = buff.readUInt8(i + 2);

        //     const newPixel = fn(pixel);

        //     buff.writeUInt8(newPixel.r, i);
        //     buff.writeUInt8(newPixel.g, i + 1);
        //     buff.writeUInt8(newPixel.b, i + 2);

        //     //next input the static create() method to create a new promise.
       
        // }
    bitmapTransformer.create(fileName) {
        return bitmapHeader(fileName)
                .then(header => {
                    return new Promise ((resolve) => {
                        return resolve(new BitmapTransformer(filename, header));
                    });
                });
                
    }
};
