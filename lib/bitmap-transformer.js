const bitmapHeader = require('./bitmap-header');
const fs = require('fs');
const readFrom = require('./read-from');

class BitmapTransformer {
    constructor(inputFile, header) {
        this.inputFile = inputFile;
        this.header = header;
    }
    
    transform(transformation, outputFile) {
        return new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(outputFile);
            const readStream = fs.createReadStream(this.inputFile, { start: this.header.pixelOffset });

            const empty = Buffer.from([]);
            let carryover = empty;

            readFrom(this.inputFile, this.header.pixelOffset)
                .then(buffer => {
                    writeStream.write(buffer, processPixels);
                });

            function processPixels() {
                readStream.on('data', chunk => {
                    chunk = Buffer.concat([carryover, chunk]);
                    carryover = empty;

                    const remainder = chunk.length % 3;
                    let endpoint = chunk.length;

                    switch (remainder) {
                        case 1:
                            carryover = chunk.slice(-1);
                            endpoint = chunk.length - 1;
                            break;
                        case 2:
                            carryover = chunk.slice(-2);
                            endpoint = chunk.length - 2;
                            break;
                    }

                    for(let i = 0; i < endpoint; i += 3) {
                        const { b, g, r } = transformation({
                            b: chunk[i],
                            g: chunk[i + 1],
                            r: chunk[i + 2]
                        });

                        const newPixel = Buffer.from([b, g, r]);
                        
                        writeStream.write(newPixel);
                    }
                });

                readStream.on('close', () => {
                    if(carryover.length) writeStream.write(Buffer.from([0, 0])); // accounts for 2 empty bytes at the end of Photoshop bmps
                    writeStream.end(resolve);
                });

                readStream.on('error', reject);

            }
        });
    }
}

BitmapTransformer.create = function(inputFile) {
    return bitmapHeader(inputFile)
        .then(header => {
            return new BitmapTransformer(inputFile, header);
        });
};

module.exports = BitmapTransformer;


