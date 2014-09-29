var gulp        = require( 'gulp' );

gulp.task( 'html', function() {

    gulp.src( './*.html' )
        .pipe( gulp.dest( './html' ) );

    gulp.src( './cgi-bin/**' )
        .pipe( gulp.dest( './html/cgi-bin' ) );

    gulp.src( './libs/**' )
        .pipe( gulp.dest( './html/libs' ) );

    gulp.src( './icons/**' )
        .pipe( gulp.dest( './html/icons' ) );

    gulp.src( './*.css' )
        .pipe( gulp.dest( './html' ) );

    gulp.src( './*.js' )
        .pipe( gulp.dest( './html' ) );

});

gulp.task( 'default', ['html'], function() {
    
});
