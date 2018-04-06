const bitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransform {
    constructor(filename, header) {
        this.filename = filename;
        this.header = header;
    }

    transform(fn) {
       
        for(let i = this.header.pixelOffset; i < this.header.fileSize; i += ((this.header.bitsPerPixel) / 8)) {
            const colors = {};
            colors.b = this.buffer.readUInt8(i);
            colors.g = this.buffer.readUInt8(i + 1);
            colors.r = this.buffer.readUInt8(i + 2);
            
            
            const transformed = fn(colors);

            this.buffer.writeUInt8(transformed.b, i);
            this.buffer.writeUInt8(transformed.g, i + 1);
            this.buffer.writeUInt8(transformed.r, i + 2);
        }
      
    }

    static create(filename) {
        return bitmapHeader(filename)
            .then(header => {
                return new Promise((resolve, reject) => {
                    return resolve(new BitmapTransform(filename, header));
                });
            });
    }
};