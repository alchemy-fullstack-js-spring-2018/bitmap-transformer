const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');
const negative = require('../lib/negative-transformer');
const grayscale = require('../lib/grayscale-transformer');

describe('bitmap file transformer', () => {
    
    let buffer = null;
    beforeEach(() => {
        buffer = fs.readFileSync('./test/test-bitmap.bmp');

        // TODO: If the functionality in this before test is same as 
        // other test, can you remove (extract) the duplication?
    });

    it('test whole transform', () => {
        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(invert);

        const expected = fs.readFileSync('./test/inverted-expected.bmp');
        assert.deepEqual(bitmap.buffer, expected);

        // return fs.writeFileSync('./test/output.bmp', bitmap.buffer);
    });
});