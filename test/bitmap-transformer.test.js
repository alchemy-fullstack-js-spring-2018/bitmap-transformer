const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');

describe('bitmap file transformer', () => {
    const actualFile = './test/test-bitmap.bmp';
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
            .then ((header) => {
                header.transform(invert, actualFile);
                const expected = fs.readFileSync('./test/inverted-expected.bmp');
                assert.deepEqual(header, expected);
            });


    });
});