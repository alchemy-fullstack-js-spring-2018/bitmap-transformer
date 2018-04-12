const assert = require('assert');
const fs = require('fs');
const bitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');
//const { promisify } = require('util');
//const unlink = promisify(require('fs').unlink);


describe('bitmap file transformer', () => {
    
    let buffer = null;
    const file = './test/test-bitmap.bmp';
    const testFile = './test/inverted-expected.bmp';

    beforeEach(() => {
        return fs.unlink(testFile
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            }));
        
    });
    beforeEach(() => {
        return bitmapTransformer.create(file)
            .then(data => {
                buffer = data;
                return buffer;
            });
    });

    //"snapshot" test
    it('test whole transform', () => {

  
        const bitmap = new bitmapTransformer(buffer);
        bitmap.transform(invert);

        const expected = fs.readFileSync('./test/inverted-expected.bmp');
        assert.deepEqual(bitmap.buffer, expected);

       

    });
});