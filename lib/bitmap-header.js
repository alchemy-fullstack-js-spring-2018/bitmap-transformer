const fs = require('fs');
const { promisify } = require('util');
const open = promisify(fs.open);
const read = promisify(fs.read);


// TODO:
// Change BitmapHeader to be a function that:
// * takes a filename as input,
// * returns a promise,
// * that resolves to an object (literal) with the header properties.
// (HINT: Use readFrom function we created in class)


module.exports = function BitmapHeader(file) {
    const headerSpecs = {};
    const buffer = Buffer.alloc(10);
    const pixelOffset = () => {open(file, 'r').then(fd => read(fd, buffer, 0, 4, 10).then(contents => headerSpecs.pixelOffset = contents)); };
    const bitsPerPixel = () => { open(file, 'r').then(fd => read(fd, buffer, 4, 2, 28).then(contents => headerSpecs.bitsPerPixel = contents)); };
    const fileSize = () => { open(file, 'r').then(fd => read(fd, buffer, 6, 4, 2).then(contents => headerSpecs.fileSize = contents)); };
    Promise.all([pixelOffset(), bitsPerPixel(), fileSize()])
        .then( () => {
            console.log(headerSpecs);
        })
        .catch((err) => console.error(err));
    return headerSpecs;
};
