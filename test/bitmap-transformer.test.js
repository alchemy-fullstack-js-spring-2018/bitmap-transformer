const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');

describe('bitmap file transformer', () => {
    
    let buffer = null;
    // beforeEach(() => {
    //     buffer = fs.readFileSync('./test/test-bitmap.bmp');
    // });

    it('test whole transform', () => {
        const bitmap = BitmapTransformer.create('./test/test-bitmap.bmp');

        return bitmap.transform(invert);

        // const expected = fs.readFileSync('./test/inverted-expected.bmp');
        // assert.deepEqual(bitmap.buffer, expected);
    });
});