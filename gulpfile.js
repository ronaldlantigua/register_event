var gulp = require('gulp');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var pump = require('pump');

var appJsDir = 'js/app/';
gulp.task('default', ['styles', 'lint', 'compress'], function() {
	browserSync.init({
		server: './',
		stream: true
	});

	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('*.html').on('change', reload);
	gulp.watch(appJsDir + '/**/*.js', ['compress']);
	gulp.watch('build/**/scripts.min.js').on('change', reload);
	gulp.watch('build/**/styles.min.css').on('change', reload);
});

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(concat('styles.min.css'))
		.pipe(gulp.dest('build/styles'))
});

gulp.task('lint', function() {
	gulp.src(appJsDir + '/**/*.js')
		.pipe(eslint())
		.pipe(eslint.formatEach())
		.pipe(eslint.failOnError());
});

gulp.task('compress', ['lint'], function (cb) {
  pump([
        gulp.src(appJsDir + '/**/*.js'),
        uglify(),
        concat('scripts.min.js'),
        gulp.dest('build/js')
    ],
    cb
  );
});
