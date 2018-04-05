const BitmapHeader = require('../lib/bitmap-header');

function invert(buffer, bitsPerPixel){
    // const header = new BitmapHeader();
    // const bitSize = header.bitsPerPixel;
    let bitArray = [];
    for(let i = 0; i < 25; i++){
        const bits = buffer.readIntLE(i, bitsPerPixel);
        bitArray.push(bits);
    }
    console.log(bitArray);
}

module.exports = invert;