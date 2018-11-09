/* config object
 * jsConcatFiles = list of javascript files  ( in order ) to concatenate
 * buildFilesFoldersRemove = list of files to remove when running final build
 */
var config = {
	jsConcatFiles: [
		'public/js/vendor/jquery-2.2.4.min.js',
		'public/js/bootstrap.min.js',
		'public/js/owl.carousel.js',
		'public/js/jquery.countdown.min.js',
		'public/js/plugins.js',
		'public/js/main.js'
	],
	cssConcatFiles: [
		'public/css/bootstrap.min.css',

		//'public/css/core.css',

		'public/css/font-awesome.min.css', // start instead of core.css
		'public/css/material-design-iconic-font.min.css',
		'public/css/plugins/animate.css',
		'public/css/plugins/meanmenu.min.css',
		'public/css/plugins/custom-animation.css',
		'public/css/plugins/slick.css',
		'public/css/plugins/jquery-ui.min.css',
		'public/css/shortcode/default.css', // bg url in this css needs to be changed

		'public/css/nivo-slider.css',
		'public/css/plugins/fancybox/jquery.fancybox.css', // end instead of core.css, bg url in this css needs to be changed

		//'public/css/shortcode/shortcode.css', // bg url in this css needs to be changed
		'public/css/shortcode/header.css',
		'public/css/shortcode/slider.css',
		'public/css/shortcode/footer.css',

		'public/css/owl.carousel.css',
		'public/css/owl.theme.default.css',
		'public/css/owl.theme.green.min.css',
		'public/css/style.css',
		'public/css/responsive.css',
		'public/css/animate.css',
		'public/css/custom.css',
		'public/css/skin/skin-default.css'
	],
	buildCopyFiles: [
		'public/*fonts/**/',
		'public/*images/**/',
		'public/*miniTemplatesTinyMce/**/',
		'public/*css/build.min.css',
		'public/*js/build.min.js',
		'public/*js/build.min.js.map'
	],
	buildFilesFoldersRemove: [
		'public/build/!js/build.min.js',
		'public/build/!js/build.min.js.map',
		'public/build/!css/build.min.css'
	]
};

var gulp 			= require('gulp'),
	jshint 			= require('gulp-jshint'), // javascript error hint
	runTaskSeq      = require('gulp-sequence'),
	notify 			= require('gulp-notify'), // utility for notification
	uglify 			= require('gulp-uglify'), // js minifier
	sourcemaps 		= require('gulp-sourcemaps'), //creates sourcemaps
	concatjs		= require('gulp-concat'), // concatenates js files
	concatcss		= require('gulp-concat-css'), // concatenates css files
	rename 			= require('gulp-rename'), // rename files using some transformers
	uglyfycss		= require('gulp-uglifycss'), // css minifier
	autoprefixer 	= require('gulp-autoprefixer'), // css prefixer
	stripcsscom		= require('gulp-strip-css-comments'), // strip css comments
	replace 		= require('gulp-replace'), // string replace, like css url
	concatc 		= require('gulp-concat-callback'), // concatenates files with callback to alter file contents before concatenation
	del 			= require('del'), // delete files and folders using globs
	fs 				= require('fs');

	// log errors
	function errorLog(error) {
		console.log(error.message);
		this.emit('end');
	}

	// test fancy box
	gulp.task('fancybox', function() {
		return gulp.src(['public/css/plugins/fancybox/jquery.fancybox.css', 'public/css/plugins/fancybox/fancy-to-concat.css'])
			.pipe(replace(/url\(\'/g, function(match) {
				if (this.file.relative === "jquery.fancybox.css") {
					return 'url\(\'../images/fancybox/';
				} else return match;
			}))
			.pipe(concatcss('temp.css'))
			.pipe(rename('fancy.css'))
			.on('error', errorLog)
			.pipe(gulp.dest('public/css/plugins/fancybox'));
	});

	// script task
	gulp.task('scripts', function() {
		return gulp.src(config.jsConcatFiles)
			.pipe(sourcemaps.init())
				.pipe(concatjs('temp.js'))
				.pipe(uglify())
				.on('error', errorLog)
				.pipe(rename('build.min.js'))
				//.pipe(jshint())
				//.pipe(jshint.reporter('default'))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('public/js'));
	});

	// style task
	gulp.task('styles', function() {
		return gulp.src(config.cssConcatFiles)
			.pipe(sourcemaps.init())
				.pipe(stripcsscom({preserve: false}))
				.pipe(concatcss('temp.css'))
				.pipe(uglyfycss())
				.on('error', errorLog)
				.pipe(autoprefixer({
					browsers: ['last 3 versions'],
					cascade: false
				}))
				.pipe(rename('build.min.css'))
			.pipe(sourcemaps.write('./'))
			.on('error', errorLog)
			.pipe(gulp.dest('public/css'));
	});

	// phtml task
	gulp.task('phtml', function() {
		return gulp.src('view/**/*.phtml')
	});

	// watch tasks
	gulp.task('watch', function() {
		gulp.watch('public/js/**/*.js', ['scripts']);
		gulp.watch('public/css/**/*.css', ['styles']);
		gulp.watch('view/**/*.phtml', ['phtml']);
	});

	// gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'watch']);
	// default task
	gulp.task('default', ['scripts', 'styles', 'phtml', 'watch']);



	// build tasks
	// clean out all files and folders from build folder
	gulp.task('build:cleanfolder', function () {
		del([
			'public/build/**'
		]);
	});

	// task to create build directory of all files
	gulp.task('build:copy', function() {
		if ( !fs.existsSync('public/build') ) {
	    	return gulp.src(config.buildCopyFiles)
		    		   .on('error', errorLog)
		    		   .pipe(gulp.dest('public/build/'));
	   	}
	});

	// list all files and directories here that you don't want to be removed
	gulp.task('build:remove', function () {
		del(config.buildFilesFoldersRemove);
	});

	gulp.task('build', runTaskSeq('build:cleanfolder', 'build:copy', 'build:remove'));

	/* Developer Notes
	 * FO - Front Office / BO - Back Office
	 * Run the default task on changes made on FO and clicking of a button in the BO
	 * to run the build task that will generate build.js and build.css
	 */