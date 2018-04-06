const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');

describe('bitmap file transformer', () => {
    
    // let buffer = null;
    
    // beforeEach(() => {
    //     buffer = fs.readFileSync('./test/test-bitmap.bmp');
    // });

    // it('create header', () => {
    //     const bitmap = new BitmapTransformer(buffer);
    //     bitmap.create(buffer);
    // });

    it('test whole transform', () => {
        return BitmapTransformer.create('./test/test-bitmap.bmp')
            .then ((header, filename) => {
                header.transform(invert);
                const expected = fs.readFileSync('./test/inverted-expected.bmp');
                assert.deepEqual(header, expected);
            });


    });
});