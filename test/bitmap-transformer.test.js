const assert = require('assert');
const fs = require('fs');
const bitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/inverted-transformer');
const { promisify } = require('util');
const unlink = promisify(require('fs').unlink);

describe('bitmap file transformer', () => {
    let tester = null;
    const file = './test/test-bitmap.bmp';
    //const testFile = './test/inverted-expected.bmp';

    beforeEach(() => {
        return unlink(file)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            });
    });

    beforeEach(() => {
        return bitmapTransformer.create(file)
            .then(data => {
                tester = data;
                return tester;
            });
    });

    //"snapshot" test
    it('test whole transform', () => {
        //let buffer = buffer;
        const bitmap = new bitmapTransformer(tester);
        return tester.transform(invert, './test/invert-transformer-test.bmp')
            .then( () => {
                const expected = fs.readFileSync('./test/inverted-expected.bmp');
                const tester = fs.readFileSync('./')
                assert.deepEqual(bitmap.tester, expected);

            }

    });
});