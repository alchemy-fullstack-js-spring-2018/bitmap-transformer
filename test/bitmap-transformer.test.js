const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');
// const sepia = require('../lib/sepia-transformer');
const { promisify } = require('util');
const unlink = promisify(require('fs').unlink);

describe('bitmap file transformer', () => {
    
    let tester = null;
    const file = './test/test-bitmap.bmp';
    const testFile = './test/tested-invert.bmp';

    beforeEach(() => {
        return unlink(testFile)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            });
    });

    beforeEach(() => {
        tester = BitmapTransformer.create(file);
    });

    it('test whole transform', () => {

        const expected = fs.readFileSync('./test/inverted-expected.bmp');
        const result = tester.transform(invert, testFile);

        assert.deepEqual(expected, result);
    });
});