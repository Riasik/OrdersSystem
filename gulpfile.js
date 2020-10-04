const gulp = require("gulp"),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
     autoprefixer = require('gulp-autoprefixer');
    fileinclude = require('gulp-file-include'),
    minifyCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    hash = require('gulp-hash-filename'),
    replace = require('gulp-replace'),
    fs = require('fs');


gulp.task('sass', function () {
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/assets/css'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function () {
    return gulp.src('src/assets/scripts/**/*.js')
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('assembleCss', function () {
    gulp.src('src/assets/css/**/*', '!src/assets/css/*.min.css')
        .pipe(hash())
        .pipe(minifyCSS())
        .pipe(rename(function (path) {
            path.basename += "-min";
        }))
        .pipe(gulp.dest('dist/assets/css'));
    gulp.src('src/assets/css/*.min.css')
        .pipe(hash())
        .pipe(gulp.dest('dist/assets/css'))
});
gulp.task('browser-sync', function () {
    browserSync({
        serveStatic: ['./dist/'],
        notify: false
    });
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('img', function () {
    return gulp.src('src/assets/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function (done) {
    browserSync.init({
        server: "src/"
    });
    gulp.series('sass');
    gulp.watch('src/**/*.html', gulp.series('html'));
    gulp.watch('src/assets/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/assets/img/**/*', browserSync.reload);
    gulp.watch('src/assets/scripts/**/*', browserSync.reload);
    done();
});

gulp.task('build', function (done) {

    let buildHtml = gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
    let buildImg = gulp.src('src/assets/img/**/*')
        .pipe(gulp.dest('dist/assets/img'));
    let buildCss = gulp.src('src/assets/css/**/*')
        .pipe(gulp.dest('dist/assets/css'))
    let buildJs = gulp.src('src/assets/scripts/**/*')
        .pipe(gulp.dest('dist/assets/scripts'))
    done();

});

// gulp.task('build', function (done) {
//
//     let buildHtml = gulp.src('src/**/*.html')
//         .pipe(gulp.dest('dist'));
//     let buildImg = gulp.src('src/assets/img/**/*')
//         .pipe(gulp.dest('dist/assets/img'));
//     let buildCss = gulp.src('src/assets/css/**/*')
//         .pipe(gulp.dest('dist/assets/css'))
//     done();
//
// });

//
// gulp.task('clear', function () {
//     return cache.clearAll();
// });
//
// gulp.task('default', ['watch']);

// let gulp = require('gulp'),
//     browserSync = require('browser-sync').create(),
//     sass = require('gulp-sass'),
//     autoprefixer = require('gulp-autoprefixer');
//
// gulp.task('watch', function(done) {
//     gulp.series('sass')
//     browserSync.init({
//         server: "src/"
//     });
//
//     gulp.watch("scr/assets/scss/*.sass", gulp.series('sass'));
//     gulp.watch("scr/*.html").on('change', () => {
//         browserSync.reload();
//         done();
//     });
//
//
//     done();
// });
//
// gulp.task('build', function (done) {
//
//     let buildHtml = gulp.src('src/**/*.html')
//         .pipe(gulp.dest('dist'));
//     let buildImg = gulp.src('src/assets/img/**/*')
//         .pipe(gulp.dest('dist/assets/img'));
//     let buildCss = gulp.src('src/assets/css/**/*')
//         .pipe(gulp.dest('dist/assets/css'))
//     done();
//
// });
//
// gulp.task('sass', function (done) {
//     return gulp.src('src/assets/scss/**/*.scss')
//         .pipe(sass())
//         .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
//         .pipe(gulp.dest('dist/assets/css'))
//         .pipe(browserSync.reload({stream: true}));
//     done();
// });
//
// gulp.task('default', gulp.series('sass', 'watch'));
