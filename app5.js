const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let judgement = '';
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  if((hand == 'グー' && cpu == 'チョキ') || (hand == 'チョキ' && cpu == 'パー') || (hand == 'パー' && cpu == 'グー')) {
    judgement = '勝ち';
    win += 1;
    total += 1;
  } else if ((hand == 'グー' && cpu == 'グー') || (hand == 'チョキ' && cpu == 'チョキ') || (hand == 'パー' && cpu == 'パー')) {
    judgement = 'あいこ';
    total += 1;
  } else if ((hand == 'グー' && cpu == 'パー') || (hand == 'チョキ' && cpu == 'グー') || (hand == 'パー' && cpu == 'チョキ')) {
    judgement = '負け';
    total += 1;
  }
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/gatya", (req, res) => {
  const number = req.query.number;
  let cpu = [];
  let total = Number( req.query.total );
  console.log( {number, total});

  if(number == 1) {
    const num = Math.floor( Math.random() * 20 + 1 );
    if(num===1) cpu.push('SSR');
    else if(num<=4) cpu.push('SR');
    else cpu.push('R');
    total += 1;
  } else if(number == 10) {
    for (i=0; i<9; i++) {
      const num = Math.floor( Math.random() * 20 + 1 );
      if(num===1) cpu.push('SSR');
      else if(num<=4) cpu.push('SR');
      else cpu.push('R');
      total += 1;
    }
    const num = Math.floor( Math.random() * 20 + 1 );
    if(num===1) cpu.push('SSR');
    else cpu.push('SR');
    total += 1;
  }
  var result = cpu.join(',');
  const display = {
    your: number,
    cpu: result,
    total: total
  }
  res.render( 'gatya', display );
});

app.get("/math", (req, res) => {
  const number = req.query.number;
  let num = Number( req.query.num );
  let message = '';
  let total = Number( req.query.total ) || 0;
  console.log( {number, total});

  if (!num) {
    num = Math.floor(Math.random() * 100 + 1); 
  }

  if( number > num ) {
    message = 'あなたの予想した数は大きすぎます．';
    total += 1;
  } else if( number < num ) {
    message = 'あなたの予想した数は小さすぎます．';
    total += 1;
  } else {
    message = '正解です!';
    num = Math.floor(Math.random() * 100 + 1);
    total = 0;
  }

  const display = {
    your: number,
    cpu: message,
    total: total,
    num: num
  }
  res.render( 'math', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

