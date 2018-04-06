const bitmapHeader = require('./bitmap-header');
const fs = require('fs');

module.exports = class BitmapTransformer {
    constructor(buffer, header) {
        this.buffer = buffer;
        this.header = header;
    }

    transform(fn) {

        for(let i = this.header.pixelOffset; i < this.header.fileSize; i += 3) {

            const pix = {
                r: this.buffer[i],
                g: this.buffer[i + 1],
                b: this.buffer[i + 2]
            };
            
            let transpix = fn(pix);

            this.buffer[i] = transpix.r;
            this.buffer[i + 1] = transpix.g;
            this.buffer[i + 2] = transpix.b;           
        }

        return this.buffer;
    }

    static create(filename) {
        bitmapHeader(filename)
            .then(header => {
                return new Promise((resolve, reject) => {
                    const buffer = fs.readFileSync(filename);
                    const bitmap = new BitmapTransformer(buffer, header);
                    // bitmap -> val = val;
                    return resolve(bitmap);
                });
            });
    }
};