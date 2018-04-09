const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');

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

    it('test whole transform', () => {

        return testTransformer.transform(invert, './test/copy-invert.bmp')
            .then(() => {
                const result = fs.readFileSync('./test/copy-invert.bmp');
                const bufferTest = fs.readFileSync('./test/inverted-expected.bmp');
        
                assert.deepEqual(result, bufferTest);
            });
    });
});