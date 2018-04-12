const assert = require('assert');
const fs = require('fs');
const bitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');

describe('bitmap file transformer', () => {
    
    let buffer = null;
    beforeEach(() => {
        // TODONE
        buffer = fs.readFileSync('./test/test-bitmap.bmp');
        // TODONE: The functionality in this test is same as test in //bitmap-header.test.js
    });

    // "pinning" test, or "snapshot" test
    it('test whole transform', () => {
  
        const bitmap = new bitmapTransformer(buffer);
        bitmap.transform(invert);

        const expected = fs.readFileSync('./test/inverted-expected.bmp');
        assert.deepEqual(bitmap.buffer, expected);

       
    });
});