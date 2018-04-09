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
                bitmap.transform(invert, './test/inverted-output.bmp');
                const expected = fs.readFileSync('./test/inverted-expected.bmp');
                const test = fs.readFileSync('./test/inverted-output.bmp');
                assert.deepEqual(test, expected);
            }).catch(err => {
                console.log('error: ', err);
            });
    });
});