import express from "express";

export const userRouter = express.Router();
// userRouter을 다른 파일에서도 사용할 수 있도록 export를 하는데 여기서는 default로 export 하지 않는 방식을 택했다.

userRouter.get("/", (req, res) => res.send("user index"));
userRouter.get("/edit", (req, res) => res.send("user edit"));
userRouter.get("/password", (req, res) => res.send("user password"));

// 이 방법은 app.js 파일에서처럼 함수를 이름 지어 새로 만드는 것이 아니라, 익명의 함수를 바로 안에 만들어 버리는 방식이다.
