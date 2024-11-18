# webpro_06
2024/11/18
## このプログラムについて
以下の３つの機能が実装されている
1. じゃんけんができるプログラム
1. 単発(1連ガチャ)または10連ガチャができるプログラム
1. 1から100までの数字を予想する数当てゲームができるプログラム
## ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
public/gatya.html | ガチャの開始画面
public/math.html | 数当てゲームの開始画面
views/janken.ejs | じゃんけんのテンプレートファイル
views/gatya.ejs | ガチャのテンプレートファイル
views/math.ejs | 数当てゲームのテンプレートファイル

## プログラムの利用方法
#### じゃんけん
1. ターミナルを起動しwebpro_06に移動する
1. 最初の一回のみ，```npm install```で必要なパッケージを入手する
1. ```node app5.js```でプログラムを起動
1. webブラウザでlocalhost:8080/public/janken.htmlにアクセス
1. グー，チョキ，パーのいずれかの手をユーザが入力して送信する
1. 勝敗の結果が表示される
#### ガチャ
1. ターミナルを起動しwebpro_06に移動する
1. 最初の一回のみ，```npm install```で必要なパッケージを入手する
1. ```node app5.js```でプログラムを起動
1. webブラウザでlocalhost:8080/public/gatya.htmlにアクセス
1. 1か10のどちらかの数字をユーザが入力して送信する
1. 1を入力した場合は単発ガチャ，10を入力した場合は10連ガチャを回した結果が表示される
#### 数当てゲーム
1. ターミナルを起動しwebpro_06に移動する
1. 最初の一回のみ，```npm install```で必要なパッケージを入手する
1. ```node app5.js```でプログラムを起動
1. webブラウザでlocalhost:8080/public/math.htmlにアクセス
1. 1から100までのいずれかの数字をユーザが入力して送信する
1. 入力した数字が答えの数字と比べて大きいか小さいかが表示される
1. 表示を基に答えの数字を推測し，答えの数字の特定を目指す

## フローチャート
#### じゃんけん
```mermaid
flowchart TD;
start["開始"]
end1["終了"]
if{"ユーザの出した手がコンピュータの出した手に勝っているか"}
win["勝ち"]
lose["負け"]
else["あいこ"]

start --> if
if --> |yes| win
win --> end1
if --> |no| lose
lose --> end1
if --> |else| else
else --> end1
```

#### ガチャ
```mermaid
flowchart TD;
start["開始"]
end1["終了"]
if{"ガチャを何回回すか"}
one["1回分の実行結果を表示"]
for{"ガチャの処理を10回実行しているか"}
yes["ガチャの処理を1回実行する"]
no["ガチャの処理を1回実行する"]
ten["10回分の実行結果を表示"]

start --> if
if --> |1回| yes
yes --> one
one --> end1
if --> |10回| for
for --> |no| no
no --> for
for --> |yes| ten
ten --> end1
```

#### 数当てゲーム
```mermaid
flowchart TD;
start["開始"]
end1["終了"]
if{"ユーザの入力した数字がコンピュータの数字と同じか"}
high["大きすぎる"]
low["小さすぎる"]
else["正解"]

start --> if
if --> |yes| else
else --> end1
if --> |high| high
high --> if
if --> |low| low
low --> if
```


