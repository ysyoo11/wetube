import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// Join

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    req.flash("error", "Please make sure your passwords match.");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
    // eslint-disable-next-line no-empty
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

// Log In with Email

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  // 여기서 passport.authenticate 는 username(여기서는 email)과 password로 인증하도록 설정되어 있다.
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "Welcome!",
  failureFlash: "Cannot log in. Please check your email and/or password.",
});

// Github Log In

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome!",
  failureFlash: "Cannot log in. Please check your Github account.",
});

// 사용자가 깃헙에서 돌아왔을 때 사용되는 함수
export const githubLoginCallback = async (_, __, profile, cb) => {
  // 사용하지 않는 변수가 있을 경우에는 위와 같이 밑줄 표시. 그냥 삭제하면 안 된다. 순서대로 변수를 인식하기 때문.
  const {
    // eslint-disable-next-line camelcase
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    // 사용자의 email과 깃헙에서 온 email이 동일한지 확인해서 user를 찾는 식 (same as {email: email})
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
    // eslint-disable-next-line no-undef
    return cb(user);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// Facebook Log In

export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "Welcome!",
  failureFlash: "Cannot log in. Please check your Facebook account.",
});

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    // 사용자의 email과 FB에서 온 email이 동일한지 확인해서 user를 찾는 식 (same as {email: email})
    console.log(user);
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `http://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `http://graph.facebook.com/${id}/picture?type=large`,
    });
    return cb(null, newUser);
  } catch (error) {
    // eslint-disable-next-line no-undef
    return cb(user);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

// Kakao Log In

export const kakaoLogin = passport.authenticate("kakao", {
  successFlash: "Welcome!",
  failureFlash: "Cannot log in. Please check your KakaoTalk account.",
});

export const kakaoLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {
      id,
      // eslint-disable-next-line camelcase
      properties: { nickname, profile_image },
      kakao_account: { email },
    },
  } = profile;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      user.kakaoId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name: nickname,
      kakaoId: id,
      avatarUrl: profile_image,
    });
    return cb(null, newUser);
  } catch (error) {
    console.log(error);
    return cb(error);
  }
};

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

// Line Log In

export const lineLogin = passport.authenticate("line", {
  successFlash: "Welcome!",
  failureFlash: "Cannot log in. Please check your LINE account.",
});

export const lineLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {
      id,
      name,
      picture,
      openid: { email },
    },
  } = profile;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      user.lineId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      lineId: id,
      avatarUrl: picture,
    });
    return cb(null, newUser);
  } catch (error) {
    console.log(error);
    return cb(error);
  }
};

export const postLineLogin = (req, res) => {
  res.redirect(routes.home);
};

// Log Out

export const logout = (req, res) => {
  req.flash("info", "Logged out. See you later.");
  req.logout();
  res.redirect(routes.home);
};

// Me

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
    // req:user 은 현재 로그인 되어 있는 사용자.
  } catch (error) {
    res.redirect(routes.home);
  }
};

// User Detail

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    req.flash("error", "User not found");
    res.redirect(routes.home);
  }
};

// Edit Profile

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
      // 해석: file이 있으면 file.path를 줄 것이다. file이 없으면 req.user.avatarUrl 해서 기존의 것을 줄 것이다.
      // 즉, 만약 유저가 파일을 추가하지 않으면 avatarUrl을 중복해서 쓰길 원하지 않기 때문에 현재 있는 것을 준다.
      // 항상 request 객체 안에는 user가 있다는 것을 명심할 것. (내가 인증하면)
    });
    req.flash("success", "User information is updated.");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't update your information.");
    res.redirect(routes.editProfile);
  }
};

// Change Password

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  try {
    if (newPassword !== newPassword2) {
      req.flash("error", "Please make sure your passwords match.");
      res.status(400);
      res.redirect(routes.changePassword);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    // changePassword 는 passport-local-mongoose가 갖고 있는 함수
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't change the password.");
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
// res.status(400) 을 넣는 이유: password 관련이면 구글은 자동적으로 status 200을 리턴하는데
// 구글은 매번 "헤이! 패스워드 바꿔" 라고 말할 것이다. 왜냐면, 이걸 성공적이라고 생각하기 때문에.
