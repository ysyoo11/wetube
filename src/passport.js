import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import routes from "./routes";
import {
  githubLoginCallback,
  facebookLoginCallback,
  kakaoLoginCallback,
} from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `https://fathomless-depths-83549.herokuapp.com${routes.gitHubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://fathomless-depths-83549.herokuapp.com${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    facebookLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KT_ID,
      callbackURL: `https://fathomless-depths-83549.herokuapp.com${routes.kakaotalkCallback}`,
    },
    kakaoLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
// serialization: 어떤 field가 쿠키에 포함될 것인지 알려주는 역할
// 여기서는 "이봐 passport, 쿠키에는 오로지 user.id만 담아서 보내도록 해" 라고 지시하는 것.
passport.deserializeUser(User.deserializeUser());
// 어느 사용자인지 어떻게 찾는가?
// 그 쿠키의 정보를 어떻게 사용자로 전환하는가?
