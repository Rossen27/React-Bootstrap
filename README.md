---
lang: zh-tw
---

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