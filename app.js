import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";
// router.js에서 export 한 userRouter을 import하는 방식이다. default로 export되지 않았기 때문에 이러한 코드로 표기한다.

const app = express();

const handleHome = (req, res) => res.send("Hello from home!");

const handleProfile = (req, res) => res.send("You are on my profile.");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter);
// get이 아니라 use는 누군가가 /user 경로에 접속하면 이 router 전체를 사용하겠다는 의미이다.
// 즉, /user 로 들어가면 router.js 에 적힌 대로 "/"가 실행이 되고, /user/edit 에 접속하면 "/edit"이 실행될 것이다.

export default app;
