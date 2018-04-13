// const assert = require('assert');
// const fs = require('fs');
const bitmapTransformer = require('../lib/bitmap-transformer');
// const invert = require('../lib/invert-transformer');
// const { promisify } = require('util');
//const testFile =  require('./test/inverted-expected.bmp');

describe('bitmap file transformer', () => {
    let tester = null;
    const file = './test/test-bitmap.bmp';

    // beforeEach(() => {
    //     return (file)
    //         .catch(err => {
    //             newFunction('File Not Found');
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
    // it('test whole transform', () => {
    //     //let buffer = buffer;
    //     // const bitmap = new bitmapTransformer(tester);
    //     return tester.transform(invert, './test/inverted-expected.bmp')
    //         .then((data) => {
    //             const knownGood = fs.readFileSync('./test/inverted-expected.bmp');
    //             // const tester = fs.readFileSync('./');
    //             setTimeout(3000);
    //             assert.deepEqual(data, knownGood);
    //         });
     
    // });
});
// function newFunction(err) {
//     if(err.code !== 'ENOENT')
//         throw err;
// }

