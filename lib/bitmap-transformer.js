import { Stream } from 'stream';

const bitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new bitmapHeader(buffer);
    }

    create(filename) {
        // TODO: create header (async) 
        // pass header to bitmap transformer along with filename
        // return promise that resolves to bitMap transformer instance 
    }

    transform(fn, outputFileName) {
        // TODO: createWriteStream of filename
        // copy file up to the image pixels into write Stream
        // hint: use 'readFrom' fn from class
        // Use `filename` to createReadStream (HINT: start at offset)
        // Read chunks (do the math! - test with `highWaterMark`)
        // Write transformed chunks to write stream
        // End writeStream on readStream close
        // Return promise that fires when done!

        const header = this.header;
        const buffer = this.buffer;

        for(let i = header.pixelOffset; i < header.fileSize; i += 3) {
            const pixel = {};
            pixel.b = buffer.readUInt8(i);
            pixel.g = buffer.readUInt8(i + 1);
            pixel.r = buffer.readUInt8(i + 2);

            const trans = fn(pixel);

            buffer.writeUInt8(trans.b, i);
            buffer.writeUInt8(trans.g, i + 1);
            buffer.writeUInt8(trans.r, i + 2);
        }

        // there is a buffer.slice
    }
};