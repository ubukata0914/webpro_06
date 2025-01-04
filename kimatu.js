"use strict";
const express = require("express");
const app = express();

let bbs = [];  

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.post("/check", (req, res) => {
    res.json( {number: bbs.length });
  }); 
  // bbsに保存されているメッセージの数(bbs配列の長さ)を返す
  
app.post("/read", (req, res) => {
   const start = Number( req.body.start );
   console.log( "read -> " + start );
   if( start==0 ) res.json( {messages: bbs });
   else res.json( {messages: bbs.slice( start )}); // slice→配列を切り取る
 });
  // 掲示板のメッセージを取得
  
app.post("/post", (req, res) => {
    const name = req.body.name;
    const sub = req.body.sub;
    const date = req.body.date;
    const message = req.body.message;
    const parentID = req.body.parentID || null;
    console.log( [name, sub, date, message, parentID] );
    const id = bbs.length;
    bbs.push( { id: id, name: name, sub: sub, date: date, message: message, parentID: parentID, reply: [] } );
    if (parentID !== null) {
        const parentMessage = bbs.find(msg => msg.id === palseInt(parentID, 10));
        if (parentID) parentMessage.reply.push(id);
    }
    res.json( {number: bbs.length } );
  });
  // クライアントから送られたメッセージを掲示板に投稿
  
app.listen(8080, () => console.log("Example app listening on port 8080!"));