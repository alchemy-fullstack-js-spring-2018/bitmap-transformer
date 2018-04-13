const assert = require('assert');
const fs = require('fs');
const bitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');
// const { promisify } = require('util');
//const picture = promisify(require('fs').unlink);
//const testFile =  require('./test/inverted-expected.bmp');

describe('bitmap file transformer', () => {
    let tester = null;
    const file = './test/test-bitmap.bmp';
    const pixelOffset = '../lib/bitmap-constants';

    // beforeEach(() => {
    //     return (file)
    //         .catch(err => {
    //             // if(err.code !== 'ENOENT') throw err;
    //         });
    // });
        
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
        return tester.transform(invert, './test/inverted-expected.bmp')
            .then(() => {
                const testFile = fs.readFileSync('./test/inverted-expected.bmp');
                const tester = fs.readFileSync('./');
                assert.deepEqual(bitmap.tester, tester);
            });
    });
});
