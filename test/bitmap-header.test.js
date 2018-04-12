const assert = require('assert');
const constants = require('../lib/bitmap-constants');
const bitmapHeader = require('../lib/bitmap-header');


describe('bitmap header', () => {

    it('has correct specs', () => {
        // TODONE: read the wiki spec docs to figure out what these values should be
        assert.ok(constants.PIXEL_OFFSET); 
        assert.ok(constants.BITS_PER_PIXEL_OFFSET);
        assert.ok(constants.FILE_SIZE_OFFSET); 
    });



    it('parses header data', () => {
    // TODONE: use the constants to populate the following properties
    // on the BitmapHeader in its constructor.
    // These test values are correct for the supplied test-bitmap.bmp
        return bitmapHeader('./test-bitmap-header.bmp')
            .then(header => {
                assert.equal(header.pixelOffset, 54);
                assert.equal(header.bitsPerPixel, 24);
                assert.equal(header.fileSize, 30054);
            });
    });
});