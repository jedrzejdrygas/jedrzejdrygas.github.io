const gulp = require('gulp');

const fileinclude = require('gulp-file-include');

const purgecss = require('gulp-purgecss')

const uglifycss = require('gulp-uglifycss');

const clean = require('gulp-clean');

const replace = require('gulp-string-replace');


function clean_build() {
    return gulp.src('./build', { read: false, allowEmpty: true })
        .pipe(clean());
}

function file_include() {
    return gulp.src(['./src/pages/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        // remove &zwnj; from html (used to prevent vscode breaking text in json)
        .pipe(replace('&zwnj;', ''))
        // add non breaking space in text to prevent orphans
        .pipe(replace(' i ', ' i&nbsp', 'string'))
        .pipe(replace(' a ', ' a&nbsp'))
        .pipe(replace(' o ', ' o&nbsp'))
        .pipe(replace(' u ', ' u&nbsp'))
        .pipe(replace(' w ', ' w&nbsp'))
        .pipe(replace(' z ', ' z&nbsp'))
        .pipe(replace(' I ', ' I&nbsp', 'string'))
        .pipe(replace(' A ', ' A&nbsp'))
        .pipe(replace(' O ', ' O&nbsp'))
        .pipe(replace(' U ', ' U&nbsp'))
        .pipe(replace(' W ', ' W&nbsp'))
        .pipe(replace(' Z ', ' Z&nbsp'))
        .pipe(gulp.dest('./build/'));
}

function minify_css() {
    return gulp.src('./src/dist/styles/**/*.css')
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(purgecss({
            content: ['./src/**/*.html'],
            safelist: ['sticky']
        }))
        .pipe(gulp.dest('./build/dist/styles'));
};

function move_assets() {
    return gulp.src(['./src/dist/assets/*'])
        .pipe(gulp.dest('./build/dist/assets'));
}

function move_scripts() {
    return gulp.src(['./src/dist/scripts/*'])
        .pipe(gulp.dest('./build/dist/scripts'));
}



exports.default = function () {
    gulp.watch('./src/**/*', gulp.series(clean_build, file_include, minify_css, move_scripts, move_assets));
};


