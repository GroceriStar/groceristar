var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');

gulp.task('bower_build', function() {
    return gulp.src(mainBowerFiles(), { base: './bower_components'} )
    // return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./build'));
});

gulp.task('move', function(){
	return gulp.src([
		'client/public/javascripts/*.js',
		// 'public/stylesheets/*css'
	]).pipe(gulp.dest('./build/js'));
})


gulp.task('move-css', function(){
	return gulp.src([
		'client/public/stylesheets/*.css',
		// 'public/stylesheets/*css'
	]).pipe(gulp.dest('./build/css'));

})