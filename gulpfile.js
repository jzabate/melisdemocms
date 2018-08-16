// config object
// jsConcatFiles = list of javascript files  ( in order ) to concatenate
// buildFilesFoldersRemove = list of files to remove when running final build
var config = {
	jsConcatFiles: [
		//'public/js/vendor/jquery-2.2.4.min.js',
		'public/js/bootstrap.min.js',
		'public/js/owl.carousel.js',
		'public/js/jquery.countdown.min.js',
		'public/js/plugins.js',
		'public/js/main.js'
	],
	cssConcatFiles: [
		//'public/css/bootstrap.min.css',
		//'public/css/font-awesome.min.css', // start instead of core.css
		'public/css/material-design-iconic-font.min.css',
		'public/css/plugins/animate.css',
		'public/css/plugins/meanmenu.min.css',
		'public/css/plugins/custom-animation.css',
		'public/css/plugins/slick.css',
		'public/css/plugins/jquery-ui.min.css',
		'public/css/shortcode/default.css',
		'public/css/nivo-slider.css',
		'public/css/plugins/fancybox/jquery.fancybox.css',
		'public/css/shortcode/shortcode.css', // end instead of core.css
		'public/css/owl.carousel.css',
		'public/css/owl.theme.default.css',
		'public/css/owl.theme.green.min.css',
		'public/css/style.css',
		'public/css/responsive.css',
		'public/css/animate.css',
		'public/css/custom.css',
		'public/css/skin/skin-default.css'
	],
	buildFilesFoldersRemove: [
		'public/!(build)/js/!(main.min.js)',
		'public/!(build)/css/!(main.min.css)',
		'public/!(build)/!(fonts)',
		'public/!(build)/!(images)'
	]
}

// required
var gulp 			= require('gulp'),
	uglify 			= require('gulp-uglify'), // js minifier
	sourcemaps 		= require('gulp-sourcemaps'), //creates sourcemaps
	concat			= require('gulp-concat'), // concatenates files
	rename 			= require('gulp-rename'); // rename files using some transformers
	uglyfycss		= require('gulp-uglifycss'), // css minifier
	autoprefixer 	= require('gulp-autoprefixer'), // css prefixer
	stripcsscom		= require('gulp-strip-css-comments'), // strip css comments
	del 			= require('del'); // delete files and folders using globs

	// log errors
	function errorLog(error) {
		console.log(error.message);
		this.emit('end');
	}

	// script task
	gulp.task('scripts', function() {
		return gulp.src(config.jsConcatFiles)
			.pipe(sourcemaps.init())
				.pipe(concat('temp.js'))
				.pipe(uglify())
				.on('error', errorLog)
				.pipe(rename('main.min.js'))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('public/build/js'));
	});

	// style task
	gulp.task('styles', function() {
		return gulp.src(config.cssConcatFiles)
			.pipe(stripcsscom({preserve: false}))
			.pipe(sourcemaps.init())
				.pipe(concat('temp.css'))
				.pipe(uglyfycss())
				.on('error', errorLog)
				.pipe(autoprefixer({
					browsers: ['last 3 versions'],
					cascade: false
				}))
				.pipe(rename('main.min.css'))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('public/build/css'));
	});




	// build tasks
	// task to clean all files and folder inside the build folder
	gulp.task('build:cleanfolder', function(cb) {
		del([
			'public/build/**'
		], cb);
	});

	// task to create build directory for all files
	gulp.task('build:copy', ['build:cleanfolder'], function() {
		return gulp.src(['public/**/*/'])
				   .pipe(gulp.dest('public/build/'));
	});

	// task to remove unwanted files, related to buildFilesFoldersRemove
	gulp.task('build:remove', ['build:copy'], function(cb) {
		del(config.buildFilesFoldersRemove, cb);
		/*del([
			'public/build/js/!(*.min.js)',
			'public/build/css/!(*.min.css)',
			'public/build/fonts',
			'public/build/images'
		], cb);*/
	});

	// default build task
	gulp.task('build', ['build:copy', 'build:remove']);



	// watch tasks
	gulp.task('watch', function() {
		gulp.watch('public/js/**/*.js', ['scripts']);
		gulp.watch('public/css/**/*.css', ['styles']);
	});



	// default task
	gulp.task('default', ['scripts', 'styles', 'watch']);