import gulp from 'gulp';
import gpug from 'gulp-pug';
import del from 'del';
import ws from 'gulp-webserver';
import image from 'gulp-image';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

// import sass from 'gulp-sass';

// sass.compiler = require("node-sass");
// const sass = require("gulp-sass")(require("node-sass"));

// const sass = require('gulp-sass')(require('sass'));

const routes = {
    pug: {
        watch: 'src/**/*.pug', // 모든 Pug 파일을 보기 위함
        src: 'src/*.pug', 
        dest: 'build',         // 목적지(destination) 설정
    },
    img: {
        // 이미지들이 최적화되어 들어감 / 큰 파일은 시간이 오래 걸림
        src: 'src/img/*',
        dest: 'build/img', // 목적지
    },
    scss: {
        watch: "src/scss/**/*.scss",
        src: "src/scss/style.scss",
        dest: "build/css",
    }
};

const pug = () =>
    gulp
        .src(routes.pug.src)               // 변환하고자 하는 파일
        .pipe(gpug())                      // pipe 에 gulp-pug 에서 불러온 함수를 집어넣음
        .pipe(gulp.dest(routes.pug.dest)); // 목적지(destination) 설정
const clean = () => del(['build']);        // 안에 삭제할 확장자나 폴더 이름을 적어줌
const webserver = () => gulp.src('build').pipe(ws({ livereload: true, open: true }));
const img = () => gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));
const styles = () => gulp.src(routes.scss.src).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(routes.scss.dest));

const watch = () => {
    // 변경될때마다 실시간 반영
    // 인자 : watch할 파일들, 실행할 함수, ...
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.img.src, img);
    gulp.watch(routes.scss.watch, styles);
};

const prepare = gulp.series([clean, img]);
const assets = gulp.series([pug, styles]);
const postDev = gulp.parallel([webserver, watch]);
// 동시에 두가지 task 실행을 원한다면, 일렬로 쓰면 안됨 -> seties -> parallel 로 변경

export const dev = gulp.series([prepare, assets, postDev]);
