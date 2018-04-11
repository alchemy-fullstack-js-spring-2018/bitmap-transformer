const assert = require('assert');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');
const fs = require('fs');

describe('bitmap file transformer', () => {
    
    let actual = null;

    beforeEach(() => {
        const filename = ('./test/test-bitmap.bmp');
        return BitmapTransformer.create(filename) 
            .then (bitmap => {
                actual = bitmap;
            });
    });

    it('TRANSFORM - invert bmp', () => {
        const filename = './test/output-bitmap.bmp';
        const expected = fs.readFileSync('./test/inverted-expected.bmp');
        return actual.transform(invert, filename)
            .then(() => {
                const bitmap = fs.readFileSync('./test/output-bitmap.bmp');                
                assert.deepEqual(bitmap, expected);
            });
    });

});