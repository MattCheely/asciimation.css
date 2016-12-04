#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var punycode = require('punycode');
var less = require('less');
var os = require('os');

function writeAnimationLess(dir) {
    fs.writeFileSync(
        path.join(dir, 'animation.less'),
        fs.readFileSync('src/style/animation.less'));
}

function buildLessFile(name, width, duration, frameCount, content) {
    return `@import 'animation'; .animation(${name}, ${width}, ${duration}, ${frameCount}, "${content}");`
}

function convert(fileName) {
    const name = path.parse(fileName).name;
    const lines = fs.readFileSync(fileName).toString().split("\n");
    const format = JSON.parse(lines[0]);;
    let frameWidth = format.width;
    const frameHeight = format.height;
    const duration = format.duration;

    let frameLines = _(lines)
        .splice(2)
        .filter((text, line) => {
            return ((line + 1) % (frameHeight + 1)) !== 0;
        }).value();

    const frameCount = (frameLines.length / frameHeight);

    if (!frameWidth) {
        frameWidth = _(frameLines)
            .map(punycode.ucs2.decode)
            .map(_.property('length'))
            .max();
    }

    let content = _(frameLines)
        .reduce((frames, text, line) => {
            let outLine = (line % frameHeight);
            frames[outLine] = (frames[outLine] || '') + text;
            return frames;
        }, [])
        .join('\n');

    return {
        outName: `${name}.less`,
        content: buildLessFile(name, frameWidth, duration, frameCount, content)
    };
}

function compileLess(lessFiles, callback) {
    const tempPath = fs.mkdtempSync(path.join(os.tmpdir(), 'asciimation'));
    var allAnimations = '';
    writeAnimationLess(tempPath);
    lessFiles.forEach((fileSpec) => {
        fs.writeFileSync(path.join(tempPath, fileSpec.outName), fileSpec.content);
        allAnimations = allAnimations + `\n@import "${fileSpec.outName}";`;
    });
    fs.writeFileSync(path.join(tempPath, 'asciimation.less'), allAnimations);
    less.render(allAnimations, {filename: path.join(tempPath, 'asciimation.less')})
    .then((result) => {
        callback(result.css);
    });
}

module.exports = function (animationFiles, outputFile) {
    compileLess(animationFiles.map(convert), (css) => {
        fs.writeFileSync(outputFile, css);
    });
}

