import express from "express";
import data from "./data.js";

const app = express();
// 首頁資料頁面
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
// 商品詳細資料頁面
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if(product) {
    res.send(product);
  } else {
    res.status(404).send({message:'商品已下架'})
  }
});

// 設定端口
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
