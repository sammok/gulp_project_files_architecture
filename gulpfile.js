var gulp = require('gulp'),
    rename = require('gulp-rename'),
    del = require('del'),
    inject = require('gulp-inject'),
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),

    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),

    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concatJs = require('gulp-concat'),
    notify = require('gulp-notify');

// --------------------------------------------------------------------------------------------------- //

/**  configuration */
var filePath = {
    distRoot: 'dist/',
    maps: 'maps/',

    html: './',
    htmlDist: 'dist/',

    css: 'assets/stylesheets/',
    cssCompiled: 'assets/stylesheets/',
    cssDist: 'dist/assets/stylesheets/',

    js: 'assets/scripts/',
    jsCompiled: 'assets/scripts/',
    jsDist: 'dist/assets/scripts/',

    img: 'assets/images',
    imgDist: 'dist/assets/images'
};

//  put css files in order, used for concat process
var concatOrder = {
    css: [
        filePath.cssCompiled + 'base.css',
        filePath.cssCompiled + 'swiper.min.css',
        filePath.cssCompiled + 'main.css'
    ],

    js: [
        filePath.js + 'base.js',
        filePath.js + 'flexible.js',
        filePath.js + 'jquery-2.1.3.min.js',
        filePath.js + 'swiper.js',
        filePath.js + 'main.js'
    ]
};

// --------------------------------------------------------------------------------------------------- //
//  #desc: task command
gulp.task('help',function () {
    console.log('\t$ gulp develop\t\tWatch files and init browsersync.');
    console.log('\t$ gulp deploy\t\tDeploy projects to directory /dist.');
});

//  #desc: default
gulp.task('default',function () {
    gulp.start('help');
});

/**  develop tasks */
//  #desc: Watch
gulp.task('develop', function() {
    runSequence('sass', 'watch');
});

//  #desc: Watch css, js
gulp.task('watch', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch(['assets/stylesheets/**/*.scss'], ['sass']);
    gulp.watch(['assets/stylesheets/**/*.css', 'assets/stylesheets/images/', '*.html', '**/*.html'])
        .on('change', browserSync.reload);
});

// --------------------------------------------------------------------------------------------------- //

/**  deploy tasks */
//  #desc: Deploy project
gulp.task('deploy', function () {
    runSequence('cleanDist', 'sass', 'concatCss', 'scripts', 'copyHtml', 'copyCss', 'copyScripts', 'copyImages', 'injector');
});

//  #desc: CleanDist
gulp.task('cleanDist', function(cb) {
    return del(filePath.distRoot, cb);
});

//  #desc: Html -> Dist
gulp.task('copyHtml', function () {
    return gulp.src(filePath.html + '*.html')
        .pipe(gulp.dest(filePath.htmlDist));
});

//  #desc: Css -> Dist
gulp.task('copyCss', function () {
    return gulp.src([filePath.cssCompiled + '*.css', filePath.cssCompiled + filePath.maps + '*'], { base: filePath.cssCompiled })
        .pipe(gulp.dest(filePath.cssDist));
});

//  #desc: Js -> Dist
gulp.task('copyScripts', function () {
    return gulp.src([filePath.jsCompiled + 'app.js', filePath.jsCompiled + 'app.min.js', filePath.jsCompiled + filePath.maps + '*'], { base: filePath.jsCompiled })
        .pipe(gulp.dest(filePath.jsDist));
});

//  #desc: Img -> Dist
gulp.task('copyImages', function() {
    return gulp.src(filePath.img + '/**/*')
        .pipe(gulp.dest(filePath.imgDist))
        .pipe(notify({ message: 'Dist images task complete' }));
});

//  #desc: Inject css, js
gulp.task('injector', function () {
    var cssSource = gulp.src(filePath.cssDist + 'app.min.css');
    var jsSource = gulp.src(filePath.jsDist + 'app.min.js');

    return gulp.src(filePath.htmlDist + '*.html')
        .pipe(inject(cssSource, {relative: true}))
        .pipe(inject(jsSource, {relative: true}))
        .pipe(gulp.dest(filePath.distRoot));
});

// --------------------------------------------------------------------------------------------------- //
//  #desc: run Sass, ConcatCss
gulp.task('styles', function () {
    runSequence('sass', 'concatCss');
});

//  #desc: Sass -> Css (/cssCompiled)
gulp.task('sass', function () {
    return sass(filePath.css + '**/*.scss', { style: 'expanded' })
        .pipe(autoprefixer())
        .pipe(gulp.dest(filePath.cssCompiled))
        .pipe(notify({ message: 'Sass compile task complete' }));
});

//  #desc: Concat(to app.css) -> Minify (to app.min.css)
gulp.task('concatCss', function () {
    return gulp.src(concatOrder.css, { base: filePath.cssCompiled })
        .pipe(concatCss('app.css'))
        .pipe(gulp.dest(filePath.cssCompiled))
        .pipe(sourcemaps.init())
        .pipe(minifycss())
        .pipe(rename('app.min.css'))
        .pipe(sourcemaps.write(filePath.maps))
        .pipe(gulp.dest(filePath.cssCompiled))
        .pipe(notify({ message: 'Css concatenation task complete' }));
});

// --------------------------------------------------------------------------------------------------- //

//  #desc: Concat -> (/compiled/app.js) -> Minify -> (/compiled/app.min.js)
gulp.task('scripts', function() {
    return gulp.src(concatOrder.js, { base: filePath.js })
        .pipe(concatJs('app.js'))
        .pipe(gulp.dest(filePath.jsCompiled))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init())
        .pipe(uglify('app.min.js'))
        .pipe(sourcemaps.write(filePath.maps))
        .pipe(gulp.dest(filePath.jsCompiled))
        .pipe(notify({ message: 'Scripts task complete' }));
});

//  #desc: Jshint -> Report on terminal
gulp.task('jshint', function () {
    gulp.src([
        'main.js'
    ], { base: filePath.js })
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
});
