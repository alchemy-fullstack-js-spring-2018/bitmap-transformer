const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');

describe('bitmap file transformer', () => {
    
    let buffer = null;
    beforeEach(() => {
        buffer = fs.readFileSync('./test/test-bitmap.bmp');

        // We considered different approaches and talked to Marty, concluding that the current setup is acceptable.
    });

    it('test whole transform', () => {
        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(invert);

        const expected = fs.readFileSync('./test/inverted-expected.bmp');
        assert.deepEqual(bitmap.buffer, expected);

        // if you don't have a "expected" file yet, you could write it 
        // out by commenting above code, using code below, and visually inspect
        // the file for correctness.
        // return fs.writeFileSync('./test/output.bmp', bitmap.buffer);
    });
});