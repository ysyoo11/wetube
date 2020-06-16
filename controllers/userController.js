import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
  }
  try {
    const user = await User({
      name,
      email,
    });
    await User.register(user, password);
    next();
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

// 사용자가 깃헙에서 돌아왔을 때 사용되는 함수
export const githubLoginCallback = async (_, __, profile, cb) => {
  // 사용하지 않는 변수가 있을 경우에는 위와 같이 밑줄 표시. 그냥 삭제하면 안 된다. 순서대로 변수를 인식하기 때문.
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  console.log(avatar_url);
  try {
    const user = await User.findOne({ email });
    // 사용자의 email과 깃헙에서 온 email이 동일한지 확인해서 user를 찾는 식 (same as {email: email})
    console.log(user);
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(user);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
  // req:user 은 현재 로그인 되어 있는 사용자.
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
