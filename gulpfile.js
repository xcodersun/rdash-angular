var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-cssnano'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-htmlmin');
    del = require('del');

var app = './src/app/'

var config = {
    bower_fonts: 'src/components/**/*.{ttf,woff,eof,svg,woff2}',
    custom_fonts: 'src/fonts/**/*.{ttf,woff,eot,svg}',
    images: 'src/img/**/*.*',
    js: [
        app + '*.js',
        app + '**/*.js',
    ],
    styles: [
        app + '**/*.less',
        'src/styles/common.less',
        'src/styles/main.less',
    ],
    templates: app + '**/*.html',
    views: 'src/views/**/*.html',
    index: 'src/index.html',
};

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(config.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts', 'copy-custom_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(config.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('copy-custom_fonts', function() {
    return gulp.src(config.custom_fonts)
        .pipe(gulp.dest('dist/fonts'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates', 'custom-views']);

gulp.task('custom-images', function() {
    return gulp.src(config.images)
        .pipe(gulp.dest('dist/img'));
});

gulp.task('custom-js', function() {
    return gulp.src(config.js)
        .pipe(minifyJs())
        .pipe(concat('vivodash.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('custom-less', function() {
    return gulp.src(config.styles)
        .pipe(less())
        .pipe(concat('custom.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('custom-templates', function() {
    return gulp.src(config.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('custom-views', function() {
    return gulp.src(config.views)
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/views'));
});

/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([config.images], ['custom-images']);
    gulp.watch([config.styles], ['custom-less']);
    gulp.watch([config.js], ['custom-js']);
    gulp.watch([config.templates], ['custom-templates']);
    gulp.watch([config.views], ['custom-views']);
    gulp.watch([config.index], ['usemin']);
});

/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', function() {
    gulp.src(['dist/**/*.*'])
        .pipe(watch(['dist/**/*.*']))
        .pipe(connect.reload());
});

gulp.task('clean', function() {
    del('./dist');

});
/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom']);
gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);