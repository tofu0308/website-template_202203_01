// plugins
const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// コンパイル対象
const scssTarget = 'src/scss/**/*.scss';
const jsTarget = 'src/js/**/*.js';

// scss compile task
const compileSass = (done) => {
  src(scssTarget)
    .pipe(
      sass({
        outputStyle: 'expanded',
      })
    )
    .pipe(rename({ extname: '.min.css' }))
    .pipe(autoprefixer())
    .pipe(dest('public_html/css'));
  done();
};

// jsのトランスパイル
const compileJs = (done) => {
  src(jsTarget)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('public_html/js'));
  done();
};

// watch tasks
const taskWatch = (done) => {
  watch(scssTarget, compileSass);
  watch(jsTarget, compileJs);
  done();
};

exports.default = taskWatch;
