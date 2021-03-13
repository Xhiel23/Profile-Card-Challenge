const { src, dest, watch, series } = require("gulp");
const browsersync = require("browser-sync").create();
const sass = require("gulp-sass");

// SASS Tasks

function scssTask() {
  return src("scss/styles.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(dest("css", { sourcemaps: "." }));
}

// Live Server
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("*.html", browsersyncReload);
  watch(["scss/**/*.scss"], series(scssTask,browsersyncReload));
}

// Default Gulp task
exports.default = series(scssTask, browsersyncServe, watchTask);