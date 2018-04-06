const assert = require('assert');
const constants = require('../lib/bitmap-constants');
const BitmapHeader = require('../lib/bitmap-header');
const fs = require('fs');

describe('bitmap header', () => {

    // let buffer = null;
    // beforeEach(() => {
    //     buffer = fs.readFileSync('./test/test-bitmap.bmp');

    // });

    it.only('has correct specs', () => {

        assert.ok(constants.PIXEL_OFFSET);
        assert.ok(constants.BITS_PER_PIXEL_OFFSET);
        assert.ok(constants.FILE_SIZE_OFFSET);
    });

    it.only('parses header data', () => {
        const filename = './test/test-bitmap.bmp';
        const header = BitmapHeader(filename);
        console.log(header);
        assert.equal(header.pixelOffset, 54);
        assert.equal(header.bitsPerPixel, 24);
        assert.equal(header.fileSize, 30054);
    });
});