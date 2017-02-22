const gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload');

gulp.task('css', () => {
    return sass('src/scss/**/*.scss')
        .on('error', sass.logError)
        // .pipe(
        //     uglify()
        // )
        .pipe(
            gulp.dest('dist/style/')
        );
});

gulp.task('js', () => {
    return gulp
        .src('/src/js_es6/*.js')
        .pipe(
            babel({
                presets: ['es2015']
            })
        )
        // .pipe(
        //     uglify()
        // )
        .pipe(
            gulp.dest('/dist/')
        );
})

gulp.task('default', () =>
    gulp.src('src/js_es6/index.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', ['css']);
    gulp.watch('src/js_es6/**/*.js', ['js']);
    livereload.listen();
    gulp
        .watch(['dist/style/', 'dist/script/'])
        .on('change', livereload.changed);
})
