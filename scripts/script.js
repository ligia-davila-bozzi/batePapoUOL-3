const  URL_MENSAGENS = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages';
const URL_STATUS = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/status'
const URL_PARTICIPANTES = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants';

let promise;
let idInterval = 0;
let messagesBox = document.querySelector('.messages');

const nomeUsusario = {
    name: prompt("Digite seu nome:")
}

const mensagem = {
    from: "",
    to: "",
	text: "",
	type: ""
}

function enviarNomeUsuário(){
    promise = axios.post(URL_PARTICIPANTES, nomeUsusario);

    promise.then(tratarSucesso);
    promise.catch(tratarErro);
}

function tratarSucesso(){
    if(idInterval === 0){
        idInterval = setInterval(enviarStatus, 5000)
    }

    promise = axios.get(URL_MENSAGENS);
    promise.then(getMessages);
}

function tratarErro(erro){
    nomeUsusario.name = prompt("Este nome já existe no chat, favor escolher outro:");

    enviarNomeUsuário();
}

function getMessages(resposta){
    for(let i = 0; i < resposta.data.length; i++){

        if(resposta.data[i].type === 'status'){
            messagesBox.innerHTML += `
                <li class="status">
                    (${resposta.data[i].time})
                    <strong>${resposta.data[i].from}</strong>
                    ${resposta.data[i].text}
                </li>`;
        }

        else if(resposta.data[i].type === 'message'){
            messagesBox.innerHTML += `
                <li class="message">
                    (${resposta.data[i].time})
                    <strong>${resposta.data[i].from}</strong>
                    para
                    <strong>${resposta.data[i].to}</strong>:
                    ${resposta.data[i].text}
                </li>`;

        } else if(resposta.data[i].type === nomeUsusario) {
            messagesBox.innerHTML += `
                <li class="private_message">
                    (${resposta.data[i].time})
                    <strong>${resposta.data[i].from}</strong>
                    reservadamente para
                    <strong>${resposta.data[i].to}:
                    ${resposta.data[i].text}
                </li>`;
        }
    }
}

function enviarStatus(){
    promise = axios.post(URL_STATUS, nomeUsusario);
}

function enviarMensagem (){
    messagesBox.innerHTML = "";

    mensagem.from = nomeUsusario.name;
    mensagem.to = 'todos';
	mensagem.text = document.querySelector('.input-message').value;
	mensagem.type = 'message';

    promise = axios.post(URL_MENSAGENS, mensagem);

    promise.then(tratarSucesso);
}

enviarNomeUsuário();