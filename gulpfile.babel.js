import gulp from 'gulp';
import gpug from 'gulp-pug';
import del from 'del';
import ws from 'gulp-webserver';

const routes = {
  pug: {
    watch: 'src/**/*.pug', // 모든 Pug 파일을 보기 위함
    src: 'src/*.pug',
    dest: 'build', // 목적지(destination) 설정
  },
};

const pug = () =>
  gulp
    .src(routes.pug.src) // 변환하고자 하는 파일
    .pipe(gpug()) // pipe 에 gulp-pug 에서 불러온 함수를 집어넣음
    .pipe(gulp.dest(routes.pug.dest)); // 목적지(destination) 설정

const clean = () => del(['build']); // 안에 삭제할 확장자나 폴더 이름을 적어줌

const webserver = () =>
  gulp.src('build').pipe(ws({ livereload: true, open: true }));

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  // 인자 : watch할 파일들, 실행할 함수, ...
};

const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

const postDev = gulp.parallel([webserver, watch]);
// 동시에 두가지 task 실행을 원한다면, 일렬로 쓰면 안됨 -> seties -> parallel 로 변경

export const dev = gulp.series([prepare, assets, postDev]);
