const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages');

promise.then(getMessages);

function getMessages(resposta){
    let messagesBox = document.querySelector('.messages');

    for(let i = 0; i < resposta.data.length; i++){

        if(resposta.data[i].type === 'status'){
            messagesBox.innerHTML += `<li class="status">
                                        (${resposta.data[i].time})
                                        <strong>${resposta.data[i].from}</strong>
                                        ${resposta.data[i].text}
                                    </li>`;
        }

        else {if(resposta.data[i].type === 'message'){
            messagesBox.innerHTML += `<li class="message">
                                        (${resposta.data[i].time})
                                        <strong>${resposta.data[i].from}</strong>
                                        para
                                        <strong>${resposta.data[i].to}</strong>
                                        :
                                        ${resposta.data[i].text}
                                    </li>`;
            } else {
                
            }
        }
    }
}