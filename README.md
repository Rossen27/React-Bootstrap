React + Node 購物網站
===

Lessons
===
## 1. 介紹
## 2. 安裝工具
## 3. 創建 React 專案
## 4. 創建 Git Repository
## 5. 創建 Cards
## 6. 新增 Routing
1. npm i react-router-dom
2. create route for home screen
3. create route for product screen
## 7. 創建 後端資料庫
1. 建立 backend 資料夾
2. npm init
3. 在 package.json 的 name 下一行加入 "type": "module",
4. npm i express
5. 建立 server.js 檔案
6. 設定 server.js 內容
7. 至 frontend/src 將 data.js 複製到 backend 內
8. npm install nodemon --save-dev
9. 在 package.json 的 scripts 內加入 "start": "nodemon server.js",
10. 以後要執行後端程式只需要下 npm start 即可，當伺服器運作時內容更改也會更著重新整理。
## 8. 利用 axios 連接前後端
1. set proxy in package.json
2. npm i axios
3. 使用 state hook
4. 使用 effect hook
5. 使用 reducer hook
## 9. Manage State By Reducer Hook
1. define reducer
2. update fetch data
3. get state from usReducer
## 10. 加入 Bootstrap UI
1. npm install react-bootstrap bootstrap --legacy-peer-deps
2. npm i react-router-bootstrap --legacy-peer-deps
3. Update App.js
## 11. 使用 Bootstrap 的 Card 功能以及增加星星評分功能
1. 創建 Rating component
2. 創建 Product component
3. 使用 Rating component 在 Product component
## 12. 創建商品詳細資料
1. npm install react-helmet-async --legacy-peer-deps
2. 從後端抓取商品資料至商品詳細資料頁面
3. create 3 columns for image, info and action
## 13. 讀取訊息以及錯誤訊息設定
1. 設定讀取訊息組件
2. 使用 spinner 組件
3. 創建各類訊息組件
4. 創建 utils.js 來設定接取 Error 錯誤訊息
## 14. 購物車前端導覽效果列設定
1. 創建 React Context
2. define reducer
3. 建立購物車效果
4. 導入購物車效果
## 15. 前後後端購物車資料串接
1. check exist item in the cart
2. check count in stock in backend
## 16. 建立購物車頁面
1. 建立 2 columns
2. display items list
3. create action column
## 17. 連結購物車
1. 購物車頁面增加與減少
2. 購物車頁面刪除功能
3. 購物車頁面結帳功能
## 18. 創建會員登入系統頁面
1. 創建登入頁面
2. 新增 email & password 
3. 新增登入按鈕
## 19.建立 MongoDB 並串接 Node 後端
1. 建立 MongoDB 雲端資料庫 - 方法 1 npm install mongoose & npm install dotenv
2. 安裝 MongoDB 本地端資料庫 - 方法 2
3. 安裝 MongoDB
4. 串接 MongoDB
## 20.將 Node.js 資料轉入 MongoDB 雲端資料庫
1. 建立一個雲端資料庫
2. create seed route
3. use route in server.js
4. seed sample product
## 21.建立 Admin 帳戶以及 Customer 帳戶
1. 建立 User 資料 npm i bcryptjs
2. 送出 User 範本
3. 建立 User 路徑
## 22.建立後臺登入系統
1. 建立登入 api
2. npm install jsonwebtoken
3. npm install express-async-handler
4. define generateToken
## 23.串聯前端登入系統並設定錯誤訊息
1. handle submit action - 讓Error視窗變好看的套件npm i react-toastify --legacy-peer-deps
2. save token in store and local storage
3. show user name in header
## 24.建立收貨資料頁面
1. 建立收貨表格
2. 儲存收貨資料
3. 增加確認頁面
## 25.建立註冊頁面
1. 建立註冊表單
2. 設定送出資料
3. 建立後端 api
## 26.建立付款頁面
1. 建立付款表單
2. 設定送出資料
## 27.建立訂單頁面
1. 顯示購物車物品、付款和地址資料
2. 處理下訂單動作
3. 創建訂單 api
## 28.完成下訂單作業
1. 處理下訂單動作
2. 創建訂單 api
## 29.創建訂單總攬
1. 為 order/:id 創建後端 api
2. 在前端獲取訂單 api
3. 顯示訂單信息
## 30.透過 Paypal 支付訂單
1. generate paypal client id
2. create api to return client id
3. npm install @paypal/react-paypal-js --force
4. use PayPalScriptProvider in index.js
5. use usePayPalScriptReducer in Order Screen
6. implement loadPaypalScript function
7. render paypal button
8. implement onApprove payment function
9. create pay order api in backend
## 31.顯示歷史訂單
1. 創建歷史訂單頁面
2. 連接歷史訂單 API
3. 在前端串聯 API