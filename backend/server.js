import express from "express";
import data from "./data.js";

const app = express();
// 取得資料
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

// 設定端口
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
