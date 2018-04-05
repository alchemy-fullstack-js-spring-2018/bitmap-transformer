const BitmapHeader = require('./bitmap-header');
const Constants = require('./bitmap-constants');

module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {
        // this is a guide to what needs to happen
        // not a recipe

        // find the right place in the buffer that you to loop 
        // and start:
        // 1. reading pixel

        const newConstant = new Constants();
        this.header.pixelOffset = this.buffer.readIntLE(newConstant.PIXEL_OFFSET, 4);
        this.header.bitsPerPixel = this.buffer.readIntLE(newConstant.BITS_PER_PIXEL_OFFSET, 2);
        this.header.fileSize = this.buffer.readIntLE(newConstant.FILE_SIZE_OFFSET, 4);
        
        // const firstPixel = this.buffer.readIntLE(this.header.pixelOffset, this.header.bitsPerPixel);

        for(let i = this.header.pixelOffset; i < this.header.fileSize - this.header.pixelOffset; i += 3) {
            
            let x;
            if(i <= 9999){
                x = 0;
            } else if(i <= 19999) {
                x = 1;
            } else if(i <= 29999) {
                x = 2;
            } else {
                x = 3;
            }

            const pix = {
                r: this.buffer[x][i],
                g: this.buffer[x][i + 1],
                b: this.buffer[x][i + 2]
            };
            
            let transpix = fn(pix);

            return this.buffer.writeIntLE(transpix, i, 3);
        }

        // 2. passing to fn



        // 3. write pixel back to buffer

        // you have access to:
        // this.buffer;
        // this.header.bitsPerPixel;

        // there is a buffer.slice

        // control your javascript loop 
        // (you can "step" by something other than 1)
    }
};