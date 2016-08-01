var gulp = require('gulp');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var pump = require('pump');


gulp.task('default', ['styles', 'lint'], function() {
	browserSync.init({
		server: './',
		stream: true
	});

	gulp.watch('sass/**/*.scss', ['styles']).on('change', browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
	gulp.watch('js/**/*.js', ['lint']);
});

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(concat('styles.min.css'))
		.pipe(gulp.dest('styles'));
});

gulp.task('lint', function() {
	gulp.src('js/**/*.js')
		.pipe(eslint())
		.pipe(eslint.formatEach())
		.pipe(eslint.failOnError());
});



gulp.task('compress', function (cb) {
  pump([
        gulp.src('js/**/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});
