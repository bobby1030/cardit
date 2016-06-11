var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var uglify = require('gulp-uglify');
var pump = require('pump')
var path = {js: './dist/build.js', all: './dist/**/*', dest: './dist/'}

gulp.task('minify', function(cb) {
	pump([
		gulp.src(path.js),
		uglify(),
		gulp.dest(path.dest)
	], cb)
});

gulp.task('deploy', ['minify'], function(){
	return gulp.src(path.all)
		.pipe(ghPages());
});