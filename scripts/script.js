const  URL_MESSAGES = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages';
const URL_STATUS = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/status'
const URL_PARTICIPANTS = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants';

let promise;
let idInterval = 0;
let messagesBox = document.querySelector('.messages');

const userName = {
    name: prompt("Digite seu nome:")
}

const message = {
    from: "",
    to: "",
	text: "",
	type: ""
}

function sendUserName(){
    promise = axios.post(URL_PARTICIPANTS, userName);

    promise.then(handleSucces);
    promise.catch(handleError);
}

function handleSucces(){
    if(idInterval === 0){
        idInterval = setInterval(sendStatus, 5000)
        setInterval(promiseMessages, 3000);
    }
    promiseMessages();
}

function sendStatus(){
    promise = axios.post(URL_STATUS, userName);
}

function promiseMessages(){
    promise = axios.get(URL_MESSAGES);
    promise.then(getMessages);

    let lastMessage = document.querySelector('.messages').lastChild;
    lastMessage.scrollIntoView();
}

function handleError(erro){
    userName.name = prompt("Este nome já existe no chat, favor escolher outro:");

    sendUserName();
}

function getMessages(answear){
    messagesBox.innerHTML = "";

    for(let i = 0; i < answear.data.length; i++){

        if(answear.data[i].type === 'status'){
            messagesBox.innerHTML += `
                <li class="status">
                    (${answear.data[i].time})
                    <strong>${answear.data[i].from}</strong>
                    ${answear.data[i].text}
                </li>`;
        }

        else if(answear.data[i].type === 'message'){
            messagesBox.innerHTML += `
                <li class="message">
                    (${answear.data[i].time})
                    <strong>${answear.data[i].from}</strong>
                    para
                    <strong>${answear.data[i].to}</strong>:
                    ${answear.data[i].text}
                </li>`;

        } else if((answear.data[i].from === userName.name) || (answear.data[i].to === userName.name)) {
            messagesBox.innerHTML += `
                <li class="private_message">
                    (${answear.data[i].time})
                    <strong>${answear.data[i].from}</strong>
                    reservadamente para
                    <strong>${answear.data[i].to}</strong>:
                    ${answear.data[i].text}
                </li>`;
        }
    }
}

function sendMessage (){
    let textInput = document.querySelector('.input-message');
    
    message.from = userName.name;
    message.to = 'todos';
    message.text = textInput.value;
    message.type = 'message';
    textInput.value = "";

    promise = axios.post(URL_MESSAGES
    , message);
    promise.then(handleSucces);
}

sendUserName();