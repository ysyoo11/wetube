import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// dotenv.config 함수로 .env 파일 안에 있는 정보를 불러올 수 있다.

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
// 여기서 우리한테 요청하는 건 string으로 된 database.
// 즉, 어디에 database가 저장되어 있는지 알려줌.

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
