const assert = require('assert');
const invert = require('../lib/invert-transformer');
const grayscale = require('../lib/grayscale-transformer');
const luminosity = require('../lib/luminosity-transformer');

describe('transformers', () => {

    it('invert', () => {

        const transformed = invert({
            r: 34,
            g: 100,
            b: 205
        });

        assert.deepEqual(transformed, {
            r: 221,
            g: 155,
            b: 50
        });
    });

    it('grayscale', () => {

        const transformed = grayscale({
            r: 34,
            g: 100,
            b: 205
        });

        assert.deepEqual(transformed, {
            r: 113,
            g: 113,
            b: 113
        });
    });

    
    it('luminosity', () => {
        const transformed = luminosity({
            r: 34,
            g: 100,
            b: 205
        });

        assert.deepEqual(transformed, {
            r: 7,
            g: 72,
            b: 14
        });

    });
});