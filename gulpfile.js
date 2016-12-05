var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var stupidServer = require('stupid-server');
var fs = require('fs');
var os = require('os');
var mustache = require('gulp-mustache');

var compileAnimations = require('./tools/compile-animations');

var tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'csstmp'));
var tmpcss = path.join(tmpdir, 'asciimation.css');

gulp.task('copy-demo', () => {
    const demos = fs.readdirSync('src/animations')
        .map((filePath) => {
            return path.parse(filePath).name;
        });

    gulp.src('src/demo/*.html')
        .pipe(mustache({demos: demos}))
        .pipe(gulp.dest('dist/'));

    gulp.src('src/demo/*.js')
        .pipe(gulp.dest('dist/'));
});

gulp.task('generate-animations', () => {
    const animationFiles = fs.readdirSync('src/animations')
        .map((name) => {
            return path.join('src/animations', name);
        });
    compileAnimations(animationFiles, tmpcss, () => {
        gulp.src(tmpcss)
            .pipe(autoprefixer({}))
            .pipe(gulp.dest('dist/style'));
    });
});

gulp.task('host-watch', () => {
    stupidServer({path: path.join(__dirname, 'dist')}, () => {
        let watcher = gulp.watch(['src/**'], ['default']);
        watcher.on('change', (event) => {
            console.log('Rebuilding...');
        });
    });
});


gulp.task('default', ['copy-demo', 'generate-animations']);
gulp.task('host', ['default', 'host-watch']);
