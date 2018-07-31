// required
var gulp 			= require('gulp'),
	uglify 			= require('gulp-uglify'), // js minifier
	plumber 		= require('gulp-plumber'), // error management
	//jshint 			= require('gulp-jshint'), //javascript hint
	//tinyimg 		= require('gulp-tinifier'), // image compressor with the use of https://tinypng.com service
	//concat			= require('gulp-concat'), // concatenates files
	rename 			= require('gulp-rename'); // rename files using some transformers
	//uglyfycss		= require('gulp-uglifycss'), // css minifier
	//autoprefixer 	= require('gulp-autoprefixer'), // css prefixer
	//del 			= require('del'); // delete files and folders using globs
	//browserSync		= require('browser-sync'), // browser sync on any other devices
	//reload 			= browserSync.reload;

	// script task
	gulp.task('scripts', function() {
		gulp.src(['public/js/**/*.js', '!public/js/**/*.min.js'])
			.pipe(plumber())
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
		.pipe(gulp.dest('public/js/build'));
	});

	// default task
	gulp.task('default', ['scripts']);