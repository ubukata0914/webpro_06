"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const sub = document.querySelector('#sub').value;
    const date = document.querySelector('#date').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&sub='+sub+'&date='+date+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params ); // 何かおかしかったらここ確認
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#sub').value = "";
        document.querySelector('#date').value = "";
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let sub_area = document.createElement('span');
                    sub_area.className = 'sub';
                    sub_area.innerText = mes.sub;
                    let date_area = document.createElement('span');
                    date_area.className = 'date';
                    date_area.innerText = mes.date;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;

                    let reply_but = document.createElement('button');
                    reply_but.innnerText = '返信';
                    reply_but.addEventListener('click', () => {
                        const replyMessage = prompt("返信内容を入力してください：");
                        if (replyMessage) postMessage(msg.id, replyMessage);
                    });

                    cover.appendChild( name_area );
                    cover.appendChild( sub_area );
                    cover.appendChild( date_area );
                    cover.appendChild( mes_area );

                    bbs.appendChild( cover );
                }
            })
        }
    });
});

// メッセージ送信関数（通常・返信共通）
function postMessage(parentID = null, replyMessage = null) {
    const name = document.querySelector('#name').value;
    const sub = document.querySelector('#sub').value;
    const date = document.querySelector('#date').value;
    const message = replyMessage || document.querySelector('#message').value;

    const params = {
        method: "POST",
        body: 'name='+name+'&sub='+sub+'&date='+date+'&message='+message+'&parentID='+parentID,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    fetch("/post", params)
        .then(response => {
            if (!response.ok) throw new Error('Error');
            return response.json();
        })
        .then(response => {
            console.log(response);
            if (!replyMessage) {
                document.querySelector('#sub').value = "";
                document.querySelector('#date').value = "";
                document.querySelector('#message').value = "";
            }
        });
}