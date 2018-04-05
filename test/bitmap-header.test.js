const assert = require('assert');
const constants = require('../lib/bitmap-constants');
const BitmapHeader = require('../lib/bitmap-header');
const BitmapTransform = require('../lib/bitmap-transformer');
const Invert = require('../lib/invert-transformer');
const fs = require('fs');


describe('bitmap header', () => {
    

    let buffer = null;

    beforeEach(() => {
        // TODO(Done): read './test/test-bitmap.bmp' into buffer variable
        // Go ahead and use the "sync" version of the fs methods
        const buffer = fs.readFileSync('EDITME.md');
    });

    it('has correct specs', () => {
        // TODO(Done): read the wiki spec docs to figure out what these values should be
        
    
        assert.ok(constants.PIXEL_OFFSET, 10); //10 bits
        assert.ok(constants.BITS_PER_PIXEL_OFFSET, 32);//32 bits
        assert.ok(constants.FILE_SIZE_OFFSET, 32); //32 bits
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
