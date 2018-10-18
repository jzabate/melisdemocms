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












.pipe(
	replace(/ulr\(\'/g, function(match) {
		if ( this.file.relative === "jquery.fancybox.css" ) {
			return 'url\(\'../images/fancybox/';
		} else { return match; }
	})
)
.pipe(replace('../../images', '../images'))
.pipe(replace('../../fonts', '../fonts'))
//.pipe(notify("Processed file: <%= file.relative %>!"))
//.pipe(replace(['../../images', '../images'], ['../../fonts', '../fonts'])) // added for replacement ug background: url css






//https://www.npmjs.com/package/gulp-css-rebase-urls
//https://www.npmjs.com/package/gulp-css-url-adjuster







var gulp = require('gulp');

// takes in a callback so the engine knows when it'll be done
gulp.task('one', function(cb) {
  // do stuff -- async or otherwise
  cb(err); // if err is not null and not undefined, the orchestration will stop, and 'two' will not run
});

// identifies a dependent task must be complete before this one begins
gulp.task('two', ['one'], function() {
  // task 'one' is done now
});

gulp.task('default', ['one', 'two']);
// alternatively: gulp.task('default', ['two']);