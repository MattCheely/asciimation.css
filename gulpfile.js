var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var path = require('path');
var stupidServer = require('stupid-server');
var fs = require('fs');

var compileAnimations = require('./tools/compile-animations');

const lessOptions = {};
const autoprefixOptions = {};

gulp.task('main-css', () => {
    gulp.src('src/style/main.less')
        .pipe(less(lessOptions))
        .pipe(autoprefixer(autoprefixOptions))
        .pipe(rename('asciimation.css'))
        .pipe(gulp.dest('dist/style'));
});

gulp.task('copy-demo', () => {
    gulp.src('src/demo/*')
        .pipe(gulp.dest('dist/'));
});

gulp.task('generate-animations', () => {
    if (!fs.existsSync('dist/style/')) {
        fs.mkdirSync('dist/style/');
    }
    const animationFiles = fs.readdirSync('src/animations')
        .map((name) => {
            return path.join('src/animations', name);
        });
    compileAnimations(animationFiles, 'dist/style/asciimation.css');
});

gulp.task('host-watch', () => {
    stupidServer({path: path.join(__dirname, 'dist')}, () => {
        let watcher = gulp.watch(['src/**', 'index.html'], ['default']);
        watcher.on('change', (event) => {
            console.log('Rebuilding...');
        });
    });
});


gulp.task('default', ['generate-animations', 'copy-demo']);
gulp.task('host', ['default', 'host-watch']);
