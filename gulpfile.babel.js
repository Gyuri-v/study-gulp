import gulp from 'gulp';
import gpug from 'gulp-pug';
import del from 'del';

const routes = {
  pug: {
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

const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

// export 는 Packge.json 에서 쓸 command 만 해주면 됨
export const dev = gulp.series([prepare, assets]); // task들의 series
// post complete 를 넣음 - dev 이기 때문에. 또 다른 build 나 publish 같은 과정에 있는 어떤 것이든 이 pug 라는 task 를 사용할 거임 == 이걸 두번 써야하거나 이런식으로 assets을 만들어 사용해야 한다는 것을 의미  -- 뭐라는거야..

// 여기까지는 html 에서 동작하지만 js나 img 는 동작하지 않음 --> 다음 강의로
