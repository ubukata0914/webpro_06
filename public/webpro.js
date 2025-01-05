"use strict";

let number=0;
const study = document.querySelector('#study');
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
    console.log( params ); 
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
                response.messages.forEach((mes, index) => {
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    // 投稿内容の表示
                    cover.innerHTML = `
                        <span class="name">${mes.name}</span>
                        <span class="sub">${mes.sub}</span>
                        <span class="date">${mes.date}</span>
                        <span class="mes">${mes.message}</span>
                    `;

                    // 返信セクションの生成
                    let replySection = document.createElement('div');
                    replySection.className = 'reply-section';

                    let repliesDiv = document.createElement('div');
                    repliesDiv.className = 'replies';
                    replySection.appendChild(repliesDiv);

                    let replyName = document.createElement('input');
                    replyName.type = 'text';
                    replyName.className = 'reply-name';
                    replyName.placeholder = '名前';
                    replySection.appendChild(replyName);

                    let replyMessage = document.createElement('input');
                    replyMessage.type = 'text';
                    replyMessage.className = 'reply-message';
                    replyMessage.placeholder = '返信内容';
                    replySection.appendChild(replyMessage);

                    let replyButton = document.createElement('button');
                    replyButton.type = 'button';
                    replyButton.className = 'reply-button';
                    replyButton.innerText = '返信';
                    replySection.appendChild(replyButton);

                    cover.appendChild(replySection);

                    study.appendChild( cover );

                    replyButton.addEventListener('click', () => {
                        const name = replyName.value;
                        const message = replyMessage.value;

                        const replyParams = {
                            method: "POST",
                            body: `postId=${index}&name=${name}&message=${message}`,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        };

                        fetch("/reply", replyParams)
                            .then(response => {
                                if (!response.ok) throw new Error('Error');
                                return response.json();
                            })
                            .then(data => {
                                if (data.success) {
                                    replyMessage.value = '';
                                    fetchReplies(index, repliesDiv);
                                }
                            });
                    });
                    // 初期状態で返信を取得
                    fetchReplies(index, repliesDiv);
                });
            });
        }
    });
});

// 返信を取得して表示する処理
const fetchReplies = (postId, repliesDiv) => {
    const params = {
        method: "POST",
        body: `postId=${postId}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    fetch("/getReplies", params)
        .then(response => {
            if (!response.ok) throw new Error('Error');
            return response.json();
        })
        .then(data => {
            repliesDiv.innerHTML = ''; // 返信一覧をクリア

            data.replies.forEach(reply => {
                let replyElement = document.createElement('div');
                replyElement.className = 'reply';
                replyElement.innerText = `${reply.name}: ${reply.message}`;
                repliesDiv.appendChild(replyElement);
            });
        });
};