// 이 파일은 여기저기에 URL들을 만들기 보다는 한 곳에 모아놓기 위해 있는 파일이다.

// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
// 위 코드는 각 유저에게 부여된 고유의 id를 뒤에 붙이는 URL이다. ex) /users/ysyoo11
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";
// Express는 똑똑해서 :id 라고 입력된 부분은 변하는 값이라는 것을 알아차린다

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Facebook
const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";

// Kakaotalk
const KT = "/auth/kakao";
const KT_CALLBACK = "/oauth";

// Object 만들기
const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  me: ME,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: (id) => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
  gitHub: GITHUB,
  gitHubCallback: GITHUB_CALLBACK,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  kakaotalk: KT,
  kakaotalkCallback: KT_CALLBACK,
};

export default routes;
