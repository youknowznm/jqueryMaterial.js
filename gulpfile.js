const gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    cleanCSS = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload');

gulp.task('css', () => {
    return sass('src/scss/**/*.scss')
        .on('error', sass.logError)
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/style/'))
        .pipe(livereload());
});

gulp.task('js', () => {
    return gulp.src('src/js_es6/**/*.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script/'))
        .pipe(livereload());
});

gulp.task('static', () => {
    return gulp.src('src/static/**/*.*')
        .pipe(gulp.dest('dist/static/'))
        .pipe(livereload());
})

gulp.task('default', ['css', 'js', 'static'], () => {
    livereload.listen();
    gulp
        .watch('src/scss/**/*.scss', ['css'])
        .on('change', livereload.changed);
    gulp
        .watch('src/js_es6/**/*.js', ['js'])
        .on('change', livereload.changed);
    gulp
        .watch('src/static/**/*', ['static'])
        .on('change', livereload.changed);
})
