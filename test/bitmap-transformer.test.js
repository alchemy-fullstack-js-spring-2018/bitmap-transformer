const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');
const { promisify } = require('util');
const unlink = promisify(require('fs').unlink);

describe('bitmap file transformer', () => {
    
    let fileName = null;
    const output = './test/inverted-output.bmp';

    beforeEach(() => {
        fileName = './test/test-bitmap.bmp';
        return unlink(output)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            });
    });

    it.only('test whole transform', () => {
        BitmapTransformer.create(fileName)
            .then(bitmap => {
                const bit = bitmap.transform(invert, './test/inverted-output.bmp');
                console.log('BIT: ', bit);
                const expected = fs.readFileSync('./test/inverted-expected.bmp');
                assert.deepEqual(bit.buffer, expected);
            }).catch(err => {
                console.log('error: ', err);
            });
    });
});