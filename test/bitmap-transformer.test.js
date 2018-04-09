const assert = require('assert');
const fs = require('fs');
const bitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');
const { promisify } = require('util');
const unlink = promisify(require('fs').unlink);


describe('bitmap file transformer', () => {
    
    let test = null;
    const file = './test/test-bitmap.bmp';
    const testFile = './test/inverted-expected.bmp';

    beforeEach(() => {
        return unlink(testFile
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            }));
        
    });
    beforeEach(() => {
        return bitmapTransformer.create(file)
            .then(data => {
                test = data;
                return test;
            });
    });

    //"snapshot" test
    it('test whole transform', () => {
        return test.transform(invert, testFile)
            .then(() => {
                const expected = fs.readFileSync('./test/inverted-expected/');
                const result = fs.readFileSync(testFile);

                assert.deepEqual(expected, result);
            });
    });
});