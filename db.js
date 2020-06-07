import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/yootube", {
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
