const BitmapHeader = require('./bitmap-header');
// const fs = require('fs');

class BitmapTransformer {
    // constructor(buffer) {
    //     this.buffer = buffer;
    //     this.header = new BitmapHeader(buffer);
    // }
    constructor(file, header) {
        this.file = file;
        this.header = header;
        console.log(this);
    }

    transform(fn, outputFile) {

        // TODO:
        // Change signature:
        // First parameter is a transform function
        // second paramter is output filename to write to!
        // createWriteStream of output filename
        
        // const writeStream = fs.createWriteStream(outputFile);

        // Copy the file up to image pixels into write stream!
        // (HINT: Use readFrom function we created in class)



        // Use filename to createReadStream (HINT: start at offset)
        // Read chunks (do the math! - test with highWaterMark)
        // Write transformed chunks to write stream
        // End writeStream on readStream close
        // Return promise that fires when done!

        for(let i = outputFile.header.pixelOffset; i < this.buffer.length; i += (this.header.bitsPerPixel / 8)) {
            const pixel = {};
            pixel.b = this.buffer.readUInt8(i);
            pixel.g = this.buffer.readUInt8(i + 1);
            pixel.r = this.buffer.readUInt8(i + 2);
            const newPixel = fn(pixel);
            this.buffer.writeUInt8(newPixel.b, i);
            this.buffer.writeUInt8(newPixel.g, i + 1);
            this.buffer.writeUInt8(newPixel.r, i + 2);
        }
    }
}

BitmapTransformer.create = function(file) {
    // return new BitmapTransformer(file)
    return new BitmapHeader(file)
        .then(header => {
            return new BitmapTransformer(file, header);
        });
};

module.exports = BitmapTransformer;