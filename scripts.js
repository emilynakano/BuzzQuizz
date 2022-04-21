let quizzes;
let qtdNiveis, qtdPerguntas;
const container = document.querySelector(".container");

function buscarquizzes(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promise.then(carregarquizzes); 
}
function carregarquizzes(response){
    quizzes = response.data;
    renderizarquizzes();
}

function renderizarquizzes(){
    const ulquizzes = document.querySelector(".quizzestodos");
    ulquizzes.innerHTML = "";
    for (let i = 0; i < quizzes.length; i++) {
        ulquizzes.innerHTML += 
        `
        <div class="quizz" onclick="abrirquizz(this)" id="${quizzes[i].id}">
    
            <div class="titulo">
                <h2> ${quizzes[i].title}</h2>
            </div class="imagemQuizz">
                <img src="${quizzes[i].image}"/>
            </div>
        </div>
        `
       }
}

function abrirquizz(elemento){
    ID_DO_QUIZZ = elemento.id
    document.querySelector(".tela-inicial").classList.add("escondido");
    document.querySelector(".tela-inicial-mostrar-quiz").classList.remove("escondido");
    URlidquizz = `https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${ID_DO_QUIZZ}`
    console.log(URlidquizz)
    const promise = axios.get(URlidquizz);
    promise.then(carregarQuizzEscolhido);
}
function carregarQuizzEscolhido(response){
    quizzEscolhido = response.data;
    renderizarPerguntaQuizzEscolhido();
    renderizarRespostaQuizzEscolhido();
}

function renderizarPerguntaQuizzEscolhido(){
    const quizz = document.querySelector(".tituloQuizz");
    quizz.innerHTML = "";
    quizz.innerHTML += 
        `
        <h1>${quizzEscolhido.title}</h1>
        <img src="${quizzEscolhido.image}" alt="" class="imagemTitulo">
        `
}
function renderizarRespostaQuizzEscolhido(){
    const quantidadeQuestoes =  quizzEscolhido.questions
    console.log(quantidadeQuestoes)
    const objeto = quantidadeQuestoes.data
    console.log(`eu sou o objeto ${objeto}`)
    const ulRespostaquizz = document.querySelector(".respostaQuizz");
    ulRespostaquizz.innerHTML = "";
    console.log(quantidadeQuestoes.title)
    for (let i = 0; i < quantidadeQuestoes.length; i++) {
        console.log(quantidadeQuestoes[i])
    }
}
function criarQuizz() {
    document.querySelector(".tela-inicial").classList.add("escondido");
    container.innerHTML += `
        <div class="tela-inicial-criacao-quiz">
            <h1>Comece pelo começo</h1>
            <div class="box">
                <input class="titulo" placeholder="Título do seu quizz" />
                <input class="url" placeholder="URL da imagem do seu quizz"/>
                <input class="perguntas" placeholder="Quantidade de perguntas do quizz"/>
                <input class="niveis" placeholder="Quantidade de níveis do quizz"/>
            </div>
            <div class="button" onclick="validacaoInicial()">
                <h2>Prosseguir pra criar perguntas</h2>
            </div>
        </div>
    `
}
function validacaoInicial() {
    const titulo = document.querySelector(".container .tela-inicial-criacao-quiz input.titulo").value;
    const url = document.querySelector(".container .tela-inicial-criacao-quiz input.url").value;
    const qtdPerguntas = document.querySelector(".container .tela-inicial-criacao-quiz input.perguntas").value;
    const qtdNiveis = document.querySelector(".container .tela-inicial-criacao-quiz input.niveis").value;

    function tituloCorreto() {
        if(titulo.length >= 20 && titulo.length <= 65){
            return true;
        } return false;
    }
    function urlCorreto() {
        let re = new RegExp("^((http(s?):\/\/?[a-z])|(magnet:\?xt=urn:btih:))")

        const url = document.querySelector(".tela-inicial-criacao-quiz input.url").value;

        if (re.test(url)) {
            return true
        } else {
            return false
        }
    }
    function qtdPerguntasCorreto() {
        if(Number(qtdPerguntas) >= 3) {
            return true;
        } return false
    }
    function qtdNiveisCorreto() {
        if(Number(qtdNiveis) >= 2) {
            return true
        } return false
    }
    if(qtdNiveisCorreto() && qtdPerguntasCorreto() && tituloCorreto() && urlCorreto()) {
        criarPerguntas()
    } else alert("preencha os dados corretamente");
}



function criarPerguntas() {
    document.querySelector(".tela-inicial-criacao-quiz").classList.add("escondido");
    container.innerHTML += `
    <div class="tela-criacao-quizz-perguntas">
            <h1>Crie suas perguntas</h1>
            <div class="box">
                <h1>Pergunta 1</h1>
                <input class="textoPergunta" placeholder="Texto da pergunta" />
                <input class="corPergunta" placeholder="Cor de fundo da pergunta"/>
                <h1>Resposta correta</h1>
                <input class="respostaCorreta" placeholder="Resposta correta"/>
                <input class="urlImagemCorreta" placeholder="URL da imagem"/>
                <h1>Respostas incorretas</h1>
                <input class="respostaIncorreta1" placeholder="Resposta incorreta 1"/>
                <input class="urlImagemIncorreta1" placeholder="URL da imagem 1"/>
                <input class="respostaIncorreta2" placeholder="Resposta incorreta 2"/>
                <input class="urlImagemIncorreta2" placeholder="URL da imagem 2"/>
                <input class="respostaIncorreta3" placeholder="Resposta incorreta 3"/>
                <input class="urlImagemIncorreta3" placeholder="URL da imagem 3"/>
            </div>
            <div class="button" onclick="validacaoPergunta()">
                <h2>Prosseguir pra criar perguntas</h2>
            </div>
        </div>
    `
}
function validacaoPergunta() {
    const textoPergunta = document.querySelector(".tela-criacao-quizz-perguntas input.textoPergunta").value;
    const corPergunta = document.querySelector(".tela-criacao-quizz-perguntas input.corPergunta").value;
    const respostaCorreta = document.querySelector(".tela-criacao-quizz-perguntas input.respostaCorreta").value;
    const urlImagemCorreta = document.querySelector(".tela-criacao-quizz-perguntas input.urlImagemCorreta").value;
    const respostaIncorreta1 = document.querySelector(".tela-criacao-quizz-perguntas input.respostaIncorreta1").value;
    const urlImagemIncorreta1 = document.querySelector(".tela-criacao-quizz-perguntas input.urlImagemIncorreta1").value;
    const respostaIncorreta2 = document.querySelector(".tela-criacao-quizz-perguntas input.respostaIncorreta2").value;
    const urlImagemIncorreta2 = document.querySelector(".tela-criacao-quizz-perguntas input.urlImagemIncorreta2").value;
    const respostaIncorreta3 = document.querySelector(".tela-criacao-quizz-perguntas input.respostaIncorreta3").value;
    const urlImagemIncorreta3 = document.querySelector(".tela-criacao-quizz-perguntas input.urlImagemIncorreta3").value;

    function textoPerguntaPassando() {
        if(textoPergunta.length >= 20) {
            return true
        } return false;
    }
    function corPerguntaPassando() {
        if(corPergunta[0] === "#" && corPergunta.length === 7) {
            let j = 0;
            for(let i = 1; i < corPergunta.length; i ++) {
                if(corPergunta[i] === "A" || corPergunta[i] === "a" || !(isNaN(corPergunta[i]))) {
                    return j = j + 1;
                }
                if(corPergunta[i] === "B" || corPergunta[i] === "b" || !(isNaN(corPergunta[i])) ) {
                    return j = j + 1;
                   }
                if(corPergunta[i] === "C" || corPergunta[i] === "c" || !(isNaN(corPergunta[i]))) {
                    return j = j + 1;
                   }
                if(corPergunta[i] === "D" || corPergunta[i] === "d" || !(isNaN(corPergunta[i]))) {
                    return j = j + 1;
                   }
                if(corPergunta[i] === "E" || corPergunta[i] === "e" || !(isNaN(corPergunta[i]))) {
                    return j = j + 1;
                   }
                if(corPergunta[i] === "F" || corPergunta[i] === "f") {
                    return j = j + 1;
                   }
            }
            
          if(j === 6) {
              return true
          } 
        } else {
            return false
        }
    }
    function textoNaoVazio() {
        if(respostaCorreta )
        respostaCorreta  
        respostaIncorreta1
        respostaIncorreta2
        respostaIncorreta3
    }

    
    if(textoPerguntaPassando() ) {
        return console.log(Number(qtdPerguntas))
    } else {
        return alert("deu tudo errado")
    }

}