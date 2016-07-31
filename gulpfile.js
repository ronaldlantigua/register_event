var gulp = require('gulp');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['styles'], function() {
	browserSync.init({
		server: './',
		stream: true
	});

	gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('styles'))
		.pipe(reload({stream: true}));
});

gulp.task('lint', function() {
	gulp.src('js/**/*.js', ['!node_modules'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe();
});