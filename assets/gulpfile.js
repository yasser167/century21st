var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function(){

	// console.log("Hello Yeezy");
	// gulp.start('styles')
	// gulp.start('watch')
});


// gulp.task('styles', function(){
//   return gulp.src('assets/src/sass/**/*.scss')
// 	      	 .pipe(sass().on('error', sass.logError))
// 	      	 .pipe(autoprefixer({
// 	      	 	browsers: ['last 2 versions']
// 	      	 }))
// 	      	 .pipe(gulp.dest('./assets/src/css'));
// });


// gulp.task('watch', function(){

// 	return gulp.watch('assets/src/sass/**/*/.scss', 
// 		function() {
// 			gulp.start('styles');
// 		});
// });