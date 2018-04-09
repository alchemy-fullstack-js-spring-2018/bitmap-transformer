const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');

describe('bitmap file transformer', () => {
    const actualFile = './test/actual-invert-bitmap.bmp';
    it('test whole transform', () => {
        return BitmapTransformer.create('./test/test-bitmap.bmp')
            .then ((header) => {
                return header.transform(invert, actualFile)
                    .then(() => {
                        const actual = fs.readFileSync(actualFile);
                        const expected = fs.readFileSync('./test/inverted-expected.bmp');
                        assert.deepEqual(actual, expected);
                    });
            });


    });
});