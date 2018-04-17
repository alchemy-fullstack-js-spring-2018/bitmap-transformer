const assert = require('assert');
const invert = require('../lib/invert-transformer');
const grayscale = require('../lib/grayscale-transformer');

describe('transformers', () => {

    it('invert', () => {
        // HINT: invert subtracts each value from 255
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
        // HINT: grayscale assigns the average of all three colors
        // as the new value for each color
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

    // TODO: add a third transformer
});