// const bitmapHeader = require('./bitmap-header');


module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = BitmapTransformer.create();
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
};

// BitmapTransformer.create = 