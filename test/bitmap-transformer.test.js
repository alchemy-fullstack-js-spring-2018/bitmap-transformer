const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');

describe('bitmap file transformer', () => {
    
    let fileName = null;
    beforeEach(() => {
        fileName = './test/test-bitmap.bmp';
    });

    it.only('test whole transform', () => {
        BitmapTransformer.create(fileName)
            .then(bitmap => {
                console.log('BITMAP!', bitmap);
                bitmap.transform(invert);
                const expected = fs.readFileSync('./test/inverted-expected.bmp');
                assert.deepEqual(bitmap.buffer, expected);
            });
    });
});