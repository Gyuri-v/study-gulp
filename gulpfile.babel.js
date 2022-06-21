import gulp from 'gulp';
import gpug from 'gulp-pug';

const routes = {
  pug: {
    src: 'src/**/*.pug',
    dest: 'build', // 목적지(destination) 설정
  },
};

export const pug = () => {
  // return 해야함
  // gulp 는 다양한 object를 가짐
  gulp
    .src(routes.pug.src) // 변환하고자 하는 파일
    .pipe(gpug()) // pipe 에 gulp-pug 에서 불러온 함수를 집어넣음
    .pipe(gulp.dest(routes.pug.dest)); // 목적지(destination) 설정
};

export const dev = gulp.series([pug]); // task들의 series
