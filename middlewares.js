import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "YooTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  // req.user:　passport가 유저를 로그인 시킬 때 쿠키, serialize, deserialize 등의 기능 전부 지원해주고,
  // user가 담긴 object를 요청(request)에 올려줄 것이다.
  // 먼저 이렇게 작성해야 우리 template들이 이 user에 접근 가능해진다.
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
