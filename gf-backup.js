,
	buildFilesFoldersRemove: [
		'public/build/js/!(*.min.js)',
		'public/build/css/!(*.min.css)',
		'public/build/!(fonts)',
		'public/build/!(images)',
		'public/build/!(miniTemplatesTinyMce)'
	]

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
});

// default build task
gulp.task('build', ['build:copy', 'build:remove']);