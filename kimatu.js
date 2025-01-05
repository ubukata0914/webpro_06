"use strict";
const express = require("express");
const app = express();

let study = [];  

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.post("/check", (req, res) => {
    res.json( {number: study.length });
  }); 
  // bbsに保存されているメッセージの数(bbs配列の長さ)を返す
  
app.post("/read", (req, res) => {
   const start = Number( req.body.start );
   console.log( "read -> " + start );
   if( start==0 ) res.json( {messages: study });
   else res.json( {messages: study.slice( start )}); // slice→配列を切り取る
 });
  // 掲示板のメッセージを取得
  
app.post("/post", (req, res) => {
    const name = req.body.name;
    const sub = req.body.sub;
    const date = req.body.date;
    const message = req.body.message;
    console.log( [name, sub, date, message] );
    study.push( { name: name, sub: sub, date: date, message: message } );
    res.json( {number: study.length } );
  });
  // クライアントから送られたメッセージを掲示板に投稿

// 返信を追加するエンドポイント
app.post("/reply", (req, res) => {
    const postId = Number(req.body.postId); // 返信対象の投稿ID
    const name = req.body.name;
    const message = req.body.message;

    if (!study[postId]) {
        return res.status(400).json({ error: "Post not found" });
    }

    if (!study[postId].replies) {
        study[postId].replies = []; // 返信用プロパティを初期化
    }

    study[postId].replies.push({ name, message });
    res.json({ success: true, replies: study[postId].replies });
});

// 特定の投稿の返信を取得するエンドポイント
app.post("/getReplies", (req, res) => {
    const postId = Number(req.body.postId);

    if (!study[postId]) {
        return res.status(400).json({ error: "Post not found" });
    }

    res.json({ replies: study[postId].replies || [] });
});
  
app.listen(8080, () => console.log("Example app listening on port 8080!"));