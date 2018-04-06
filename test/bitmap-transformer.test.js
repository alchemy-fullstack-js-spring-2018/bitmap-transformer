const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');
const constants = require('../lib/bitmap-constants');

describe('bitmap file transformer', () => {
    let testTransformer;
    const file = './test/test-bitmap.bmp';

    beforeEach(() => {
        return BitmapTransformer.create(file)
            .then(data =>{
                testTransformer = data;
                return testTransformer;
            });
    });

    it.only('test whole transform', () => {

        const result = testTransformer.transform(invert, './test/copy-invert.bmp');
        const bufferTest = fs.readFileSync('./test/inverted-expected.bmp');

        assert.deepEqual(result, bufferTest);

    });
});