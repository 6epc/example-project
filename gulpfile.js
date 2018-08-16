var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    ftp = require('vinyl-ftp'),
    notify = require("gulp-notify"),
    sourcemaps = require('gulp-sourcemaps');

// Скрипты проекта
gulp.task('js', function() {
    return gulp.src([
            'app/libs/jquery/jquery-1.12.4.min.js',
            'app/libs/bootstrap/bootstrap.min.js',
            'app/libs/lightGallery-master/dist/js/lightgallery.min.js',
            'app/libs/lightGallery-master/dist/js/lg-thumbnail.js',
        ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        // tunnel: true,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
});

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src([
            'app/libs/bootstrap/bootstrap.min.css',
            'app/fontawesome/font-awesome.min.css',
            'app/libs/lightGallery-master/dist/css/lightgallery.min.css',
        ])
        .pipe(concat('libs.min.css'))
        .pipe(cleanCSS())
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['css-libs', 'js', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch(['libs/**/*.js', 'app/js/custom.js'], ['js']);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

    var buildFiles = gulp.src([
        'app/*.html',
        'app/.htaccess',
    ]).pipe(gulp.dest('dist'));

    var buildCss = gulp.src([
        'app/css/main.css',
        'app/css/libs.min.css'
    ]).pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src([
        'app/js/**/*',
    ]).pipe(gulp.dest('dist/js'));

    var buildFonts = gulp.src([
        'app/fonts/**/*',
    ]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function() { return cache.clearAll(); });

gulp.task('default', ['watch']);