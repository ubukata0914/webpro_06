
```mermaid
sequenceDiagram
  autonumber
  Webブラウザ ->> Webサーバ: Webページの取得
  Webサーバ ->> Webブラウザ:html,js,css
  Webブラウザ ->> webproクライアント:アプリケーションの起動
  webproクライアント ->> webproサーバ:post(送信書き込み)
  webproサーバ ->> webproクライアント:全送信書き込み数
  webproクライアント ->> webproサーバ:read(送信読み込み)
  webproサーバ ->> webproクライアント:送信掲示データ
  webproクライアント ->> webproサーバ:check(新規チェック)
  webproサーバ ->> webproクライアント:全送信書き込み数
  webproクライアント ->> webproサーバ:reply(返信書き込み)
  webproサーバ ->> webproクライアント:全返信書き込み数
  webproクライアント ->> webproサーバ:getReplies(返信読み込み)
  webproサーバ ->> webproクライアント:返信掲示データ
```
