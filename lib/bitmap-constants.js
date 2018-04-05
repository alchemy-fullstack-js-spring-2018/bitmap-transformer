const fs = require('fs');

module.exports = {

    PIXEL_OFFSET: 10,
    BITS_PER_PIXEL_OFFSET: 28,
    FILE_SIZE_OFFSET: 2,
    buffer: fs.readFileSync('./test/test-bitmap.bmp')

};

