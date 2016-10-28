var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var path = {js: './dist/build.js', all: './dist/**/*', dest: './dist/'}

gulp.task('build', function(){
	return gulp.src('./src/Main.jsx')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest(path.dest))
})

gulp.task('minify', ['build'], function(cb) {
	return gulp.src(path.js)
		.pipe(uglify())
		.pipe(gulp.dest(path.dest))
});

gulp.task('deploy', ['minify'], function(){
	return gulp.src(path.all)
		.pipe(ghPages());
});