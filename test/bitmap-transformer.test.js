const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
// const invert = require('../lib/invert-transformer');
const sepia = require('../lib/sepia-transformer');


describe('bitmap file transformer', () => {
    
    let buffer = null;
    beforeEach(() => {
        buffer = fs.readFileSync('./test/test-bitmap.bmp');
    });

    it('test whole transform', () => {

        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(sepia);

        const expected = fs.readFileSync('./test/inverted-expected.bmp');
        assert.deepEqual(bitmap.buffer, expected);

        // return fs.writeFileSync('./test/output-sepia.bmp', bitmap.buffer);
    });
});