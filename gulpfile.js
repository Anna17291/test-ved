var gulp = require('gulp');
ghPages = require('gulp-gh-pages');
browserSync = require('browser-sync');
scss = require('gulp-sass')(require('sass'));
uglify = require('gulp-uglifyjs');
cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean')
cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),

  gulp.task('deploy', function () {
    return gulp.src('./build/**/*')
      .pipe(ghPages());
  });


gulp.task('scss', function () {
  return gulp.src('src/scss/styles.scss')
    .pipe(scss())
    .pipe(gulp.dest('src/scss'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});


gulp.task('scripts', function () {
  return gulp.src([
    'src/libs/jquery/dist/jquery.min.js',
    'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'));
});

gulp.task('code', function () {
  return gulp.src('src/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css-libs', function () {
  return gulp.src('src/scss/styles.css')
    .pipe(scss())
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/scss'));
});

gulp.task('clean', function () {
  return gulp.src('build', { allowEmpty: true }).pipe(clean());
});

gulp.task('img', function () {

  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('build/img'));
});

gulp.task('prebuild', async function () {

  var buildCss = gulp.src([
    'src/scss/styles.css',
  ])
    .pipe(gulp.dest('build/scss'))

  var buildFonts = gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/fonts'))

  var buildJs = gulp.src('src/js/**/*')
    .pipe(gulp.dest('build/js'))

  var buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('build'));

});

gulp.task('clear', function (callback) {
  return cache.clearAll();
})

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', 'src/scss.styles.scss', gulp.parallel('scss'));
  gulp.watch('src/*.html', gulp.parallel('code'));
  gulp.watch(['src/js/main.js', 'src/js/modules/**/*.js'], gulp.parallel('scripts'));
});
gulp.task('default', gulp.parallel('css-libs', 'scss', 'scripts', 'browser-sync', 'watch'));
gulp.task('build', gulp.series('clean', 'prebuild', 'img', 'scss', 'scripts'));