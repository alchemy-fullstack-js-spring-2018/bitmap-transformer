const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');
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
        return BitmapTransformer.create(file)
            .then(data => {
                tester = data;
                return tester;
            });
    });
    
    it.skip('test whole transform', () => {
        return tester.transform(invert, testFile)
            .then(() => {
                const expected = fs.readFileSync('./test/inverted-expected.bmp');
                const result = fs.readFileSync(testFile);
        
                assert.deepEqual(expected, result);
            });
    });
});