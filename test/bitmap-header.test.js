const assert = require('assert');
const constants = require('../lib/bitmap-constants');
const BitmapHeader = require('../lib/bitmap-header');
// const BitmapTransform = require('../lib/bitmap-transformer');
// const Invert = require('../lib/invert-transformer');
const fs = require('fs');


describe('bitmap header', () => {
    

    let buffer = null;

    beforeEach(() => {
        buffer = fs.readFileSync('./test/test-bitmap.bmp'); //sets the buffer equal to the reading of the bitmap picture.
    });

    it('has correct specs', () => {
        // TODONE: read the wiki spec docs to figure out what these values should be
        
    
        assert.ok(constants.PIXEL_OFFSET, 10); //10 bits
        assert.ok(constants.BITS_PER_PIXEL_OFFSET, 28);//32 bits
        assert.ok(constants.FILE_SIZE_OFFSET, 2); //32 bits
    });

});

it('parses header data', () => {
    // TODO: use the constants to populate the following properties
    // on the BitmapHeader in its constructor.
    // These test values are correct for the supplied test-bitmap.bmp
    const header = new BitmapHeader(buffer);
    assert.equal(header.pixelOffset, 54);
    assert.equal(header.bitsPerPixel, 24);
    assert.equal(header.fileSize, 30054);
});
