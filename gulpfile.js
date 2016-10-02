var gulp = require('gulp');
var gutil = require('gutil');
var del = require('del');
var webpack = require('webpack');

// config
var config = require('./gulp.config');

gulp.task('copy-static', function(){
    return gulp.src(config.devFolder + '/**/*.{html,htm}')
        .pipe(gulp.dest(config.templateProdFolder));
});

gulp.task('copy-css', function(){
    return gulp.src(config.devFolder + '/**/*.css')
        .pipe(gulp.dest(config.cssProdFolder));
});

gulp.task('ts-bundle', function(callback){
    return webpack(require('./webpack.config.js'), function(err, stats){
        if(err) throw new gutil.PluginError("webpack", err);
        // gutil.log("[webpack]", stats.toString({
        //     // output options
        // }));
        callback();
    });
});

gulp.task('clean', function(){
    del(config.templateProdFolder + '/**');
    del(config.cssProdFolder + '/**');
    return del(config.jsProdFolder + '/**');
});

gulp.task('watch', function(){
    gulp.watch(config.devFolder + '/**/*.ts', ['ts-bundle']);
    gulp.watch(config.devFolder + '/**/*.{html,html}', ['copy-static']);
    gulp.watch(config.devFolder + '/**/*.css', ['copy-css']);
});

gulp.task('default', ['watch', 'copy-static', 'copy-css', 'ts-bundle']);