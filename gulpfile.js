// config object
// jsConcatFiles = list of javascript files  ( in order ) to concatenate
// buildFilesFoldersRemove = list of files to remove when running final build
var config = {
	jsConcatFiles: [
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/js/vendor/jquery-2.2.4.min.js',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/js/bootstrap.min.js',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/js/owl.carousel.js',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/js/jquery.countdown.min.js',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/js/plugins.js',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/js/main.js',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/vendor/melisplatform/melis-cms-slider/public/plugins/js/plugin.cmsSlider.init.js',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/js/MelisPlugins/MelisDemoCms.MelisCmsSliderShowSliderPlugin.init.js',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/js/MelisPlugins/MelisDemoCms.MelisCmsNewsLatestNewsPlugin.init.js',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/js/MelisPlugins/MelisDemoCms.MelisFrontShowListFolderPlugin.init.js'
	],
	cssConcatFiles: [
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/css/bootstrap.min.css',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/css/core.css',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/css/shortcode/shortcode.css',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/css/owl.carousel.css',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/css/owl.theme.default.css',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/css/owl.theme.green.min.css',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/css/style.css',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/css/responsive.css',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/css/animate.css',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/css/custom.css',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/css/skin/skin-default.css'
	],
	buildFilesFoldersRemove: [
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/build/js/!(main.min.js)',
		'D:/ZendServer/ZendServer/data/apps/http/melis.local/80/_docroot_/module/MelisSites/MelisDemoCms/public/build/css/!(main.min.css)'
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

	// task to create build directory for all js & css files
	gulp.task('build:copy', ['build:cleanfolder'], function() {
		return gulp.src(['public/css/**/*', 'public/js/**/*'])
				   .pipe(gulp.dest('public/build/'))
	});

	// task to remove unwanted files, related to buildFilesFoldersRemove
	gulp.task('build:remove', ['build:copy'], function(cb) {
		del(config.buildFilesFoldersRemove, cb);
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