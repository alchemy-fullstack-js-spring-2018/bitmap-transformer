const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');
const constants = require('../lib/bitmap-constants');

describe('bitmap file transformer', () => {
    
    let buffer = null;
    beforeEach(() => {
        buffer = constants.buffer;
    });

    it('test whole transform', () => {

        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(invert);

        const bufferTest = fs.readFileSync('./test/inverted-expected.bmp');
        assert.deepEqual(bitmap.buffer, bufferTest);

    });
});