import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { localsMiddleware } from "./middlewares";
import passport from "passport";
import path from "path";
import flash from "express-flash";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    // secret: 무작위 문자열. 쿠키에 들어있는 session ID를 암호화 하기 위한 것.
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
    // CookieStore를 우리의 데이터베이스에 연결하기 위해 이 연결을 사용하겠다는 뜻
  })
);
app.use(flash());

app.use(passport.initialize());
// 위에 cookieParser에서 실행된 cookie가 쭉 내려와서 passport는 초기화(initialize)되고,
app.use(passport.session());
// 그 다음엔 passport가 제 스스로 쿠키를 들여다 봐서 그 쿠키 정보에 해당하는 유저를 찾아 줄 것이다.

app.use(localsMiddleware);
// 위에서 이어 받아 passport는 자기가 찾은 사용자를 요청(request)의 object, 즉 req.user로 만들어주게 된다.
// 그러면 그 user object를 템플릿에 추가시켜 줄 수 있다. 예를 들면 header.pug 에 있는 !loggeduser 처럼.

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
