var gulp = require('gulp');
var sass = require('gulp-sass'); // https://www.npmjs.com/package/gulp-ruby-sass
var uglify = require('gulp-uglify'); // https://www.npmjs.com/package/gulp-uglify
var autoprefixer = require('gulp-autoprefixer'); // https://www.npmjs.com/package/gulp-autoprefixer
var injectpartials = require('gulp-inject-partials'); // https://www.npmjs.com/package/gulp-inject-partials
var htmltidy = require('gulp-htmltidy'); // https://www.npmjs.com/package/gulp-htmltidy
var browserSync = require('browser-sync').create();
var bourbon = require('node-bourbon'); //https://www.npmjs.com/package/node-bourbon
var replace = require('gulp-replace'); //https://www.npmjs.com/package/gulp-replace

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }, 
        notify: false
    });

    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/**/*.sass', ['sass']);
    gulp.watch('*.html', ['index']);
    gulp.watch('p/*.html', ['index']);
});

gulp.task('scripts', function() {
    gulp.src('js/*.js')
    .pipe(uglify())
    .on('error', sass.logError)
    .pipe(gulp.dest('dest-js'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    gulp.src('scss/**/*.sass')
    .pipe(sass({
          includePaths: require('node-bourbon').includePaths,
          style: 'compressed',
          quiet: true
        })).on('error', sass.logError)
    .pipe(autoprefixer('last 2 versions'))
    //.pipe(replace('../dest-gfx/', '/filarkiv/grafikk/'))
    .pipe(gulp.dest('dest-css'))
    .pipe(browserSync.stream());
});

gulp.task('index', function () {
    gulp.src(['*.html', 'p/*.html'])
    .on('error', sass.logError)
    .pipe(injectpartials())
    //.pipe(htmltidy({hideComments: true,
    //                indent: true}))
    //.pipe(replace('../dest-gfx/', '/filarkiv/grafikk/'))
    .pipe(gulp.dest('dest-html'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/**/*.sass', ['sass']);
    gulp.watch('*.html', ['index']);
    gulp.watch('p/*.html', ['index']);
});

gulp.task('default', ['scripts', 'sass', 'index', 'watch']);
