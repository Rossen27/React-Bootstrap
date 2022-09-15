#  React + Node 購物網站

# Lessons
1. 介紹
2. 安裝工具
3. 創建 React 專案
4. 創建 Git Repository
5. 創建 Cards
6. 新增 Routing
  1. npm i react-router-dom
  2. create route for home screen
  3. create route for product screen
7. 創建 後端資料庫
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
8. 利用 axios 連接前後端
  1. set proxy in package.json
  2. npm i axios
  3. 使用 state hook
  4. 使用 effect hook
  5. 使用 reducer hook