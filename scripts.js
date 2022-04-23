let quizzes;
let quantidadeQuestoes
const container = document.querySelector(".container");
document.querySelector(".container");
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
            <div class="fundo">
                <div class="titulo">
                    <h2> ${quizzes[i].title}</h2>
                </div>
                    <img src="${quizzes[i].image}"/>
            </div>
        </div>
        `
       }
}


function abrirquizz(elemento){
    let ID_DO_QUIZZ = elemento.id
    console.log(`este é o ${ID_DO_QUIZZ}`)
    document.querySelector(".tela-inicial").classList.add("escondido");
    document.querySelector(".tela-inicial-mostrar-quiz").classList.remove("escondido");
  
    URlidquizz = `https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${ID_DO_QUIZZ}`
    const promise = axios.get(URlidquizz);
     promise.then(carregarQuizzEscolhido);
}

function carregarQuizzEscolhido(response){
    console.log("entrei aquiagora")
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
    
    quantidadeQuestoes =  quizzEscolhido.questions
    console.log(quantidadeQuestoes)
    const ulRespostaquizz = document.querySelector(".respostaQuizz");
    ulRespostaquizz.innerHTML = "";
    console.log(quantidadeQuestoes.title)
    for (let i = 0; i < quantidadeQuestoes.length; i++) {
       
        ulRespostaquizz.innerHTML += 
        `<div class="pergunta1">
            <div class="questao pergunta${i}" >
                <h3 style="background-color:${quantidadeQuestoes[i].color}">${quantidadeQuestoes[i].title}</h3>
            </div>
            <div class="resposta">
                ${obterrespostas()}
            </div>
        </div>                    
 `
    }
}
function obterrespostas(){
    i =0 
    while (i < 4) {
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
let qtdNiveis;
function validacaoInicial() {
    const titulo = document.querySelector(".container .tela-inicial-criacao-quiz input.titulo").value;
    const url = document.querySelector(".container .tela-inicial-criacao-quiz input.url").value;
    const qtdPerguntas = document.querySelector(".container .tela-inicial-criacao-quiz input.perguntas").value;
    qtdNiveis = document.querySelector(".container .tela-inicial-criacao-quiz input.niveis").value;

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
        if(Number(qtdPerguntas) >= 0) {
            return true;
        } return false
    }
    function qtdNiveisCorreto() {
        if(Number(qtdNiveis) >= 2) {
            return true
        } return false
    }
    if(qtdNiveisCorreto() && qtdPerguntasCorreto() && tituloCorreto() && urlCorreto()) {
        criarPerguntas(qtdPerguntas)
    } else alert("preencha os dados corretamente");
}


function abrirBox(elemento) {
    console.log(elemento.parentNode)
    
    elemento.classList.add("escondido");
    elemento.parentNode.querySelector(".box").classList.remove("escondido");
}
let qtdPerguntasGlobal;
function criarPerguntas(qtdPerguntas) {
    document.querySelector(".tela-inicial-criacao-quiz").classList.add("escondido");
    document.querySelector(".container").innerHTML += `
    <div class="tela-criacao-quizz-perguntas">
        <h1>Crie suas perguntas</h1>
    </div>`
    let i = 0
    for(; i < qtdPerguntas; i++) {
        document.querySelector(".tela-criacao-quizz-perguntas").innerHTML += `

        <div class="question">
            <div class="frente-box" onclick="abrirBox(this)">
                <h1>Pergunta ${i + 1}</h1>  
            </div>
            <div class="box escondido">
                <h1>Pergunta ${i + 1}</h1>
                <input class="textoPergunta${i + 1}" placeholder="Texto da pergunta" />
                <input class="corPergunta${i + 1}" placeholder="Cor de fundo da pergunta"/>
                <h1>Resposta correta</h1>
                <input class="respostaCorreta${i + 1}" placeholder="Resposta correta"/>
                <input class="urlImagemCorreta${i + 1}" placeholder="URL da imagem"/>
                <h1>Respostas incorretas</h1>
                <input class="respostaIncorreta1${i + 1}" placeholder="Resposta incorreta 1"/>
                <input class="urlImagemIncorreta1${i + 1}" placeholder="URL da imagem 1"/>
                <input class="respostaIncorreta2${i + 1}" placeholder="Resposta incorreta 2"/>
                <input class="urlImagemIncorreta2${i + 1}" placeholder="URL da imagem 2"/>
                <input class="respostaIncorreta3${i + 1}" placeholder="Resposta incorreta 3"/>
                <input class="urlImagemIncorreta3${i + 1}" placeholder="URL da imagem 3"/>
            </div>
        </div>
            
    `
    }
    document.querySelector(".tela-criacao-quizz-perguntas").innerHTML += `
        <div class="button" onclick="validacaoPergunta()">
            <h2>Prosseguir pra criar perguntas</h2>
        </div>`
    
        qtdPerguntasGlobal = i;
    
}
function validacaoPergunta() {
    console.log(qtdPerguntasGlobal)
    let qtdCorreta = 0;
    for(let i = 0; i < qtdPerguntasGlobal; i ++) {
        const textoPergunta = document.querySelector(`.tela-criacao-quizz-perguntas input.textoPergunta${i + 1}`).value;
        const corPergunta = document.querySelector(`.tela-criacao-quizz-perguntas input.corPergunta${i + 1}`).value;
        const respostaCorreta = document.querySelector(`.tela-criacao-quizz-perguntas input.respostaCorreta${i + 1}`).value;
        const urlImagemCorreta = document.querySelector(`.tela-criacao-quizz-perguntas input.urlImagemCorreta${i + 1}`).value;
        const respostaIncorreta1 = document.querySelector(`.tela-criacao-quizz-perguntas input.respostaIncorreta1${i + 1}`).value;
        const urlImagemIncorreta1 = document.querySelector(`.tela-criacao-quizz-perguntas input.urlImagemIncorreta1${i + 1}`).value;
        const respostaIncorreta2 = document.querySelector(`.tela-criacao-quizz-perguntas input.respostaIncorreta2${i + 1}`).value;
        const urlImagemIncorreta2 = document.querySelector(`.tela-criacao-quizz-perguntas input.urlImagemIncorreta2${i + 1}`).value;
        const respostaIncorreta3 = document.querySelector(`.tela-criacao-quizz-perguntas input.respostaIncorreta3${i + 1}`).value;
        const urlImagemIncorreta3 = document.querySelector(`.tela-criacao-quizz-perguntas input.urlImagemIncorreta3${i + 1}`).value;
        
        function textoPerguntaPassando() {
            if(textoPergunta.length >= 20) {
                return true
            } return false;
        }
        function respostaCorretaPassando() {
            if(respostaCorreta !== ""){
                return true
            }return false
        }

        function urlImagemCorretaPassando() {
            let re = new RegExp("^((http(s?):\/\/?[a-z])|(magnet:\?xt=urn:btih:))")

            if (re.test(urlImagemCorreta)) {
                return true
            } else {
                return false
            }
        }
        function respostaIncorretasPassando() {
            if(respostaIncorreta1 !== "" || respostaIncorreta2 !== "" || respostaIncorreta3 !== ""){
                return true
            }return false
        }
        let re = new RegExp("^((http(s?):\/\/?[a-z])|(magnet:\?xt=urn:btih:))");
        function urlIncorretas1Passando() {

            if(respostaIncorreta1 !== ""){
                if (re.test(urlImagemIncorreta1)) {
                    return true
                } else {
                    return false
                }  
            }return true
        }
        function urlImagemIncorreta2Passando() {
            if(respostaIncorreta2 !== ""){
                if (re.test(urlImagemIncorreta2)) {
                    return true
                } else {
                    return false
                }  
            }return true
        }
        function urlImagemIncorreta3Passando() {
            if(respostaIncorreta3 !== ""){
                if (re.test(urlImagemIncorreta3)) {
                    return true
                } else {
                    return false
                }  
            } return true
        }
        function urlIncorretasPassando() {
            if(urlImagemIncorreta3Passando() && urlImagemIncorreta2Passando() && urlIncorretas1Passando()) {
                return true
            } return false;
        }
        function corPerguntaPassando() {
            let re = new RegExp("^((#\/\/?[a-f])|(magnet:\?xt=urn:btih:))")
            let reg =  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{6})$/i; 
            if (reg.test(corPergunta)) {
                return true
            } else {
                return false
            }  
        }

        
        if(textoPerguntaPassando() && respostaCorretaPassando() && urlImagemCorretaPassando() && respostaIncorretasPassando() && urlIncorretasPassando() && corPerguntaPassando()) {
            qtdCorreta = qtdCorreta + 1;
        } 


    }
    if(qtdCorreta === qtdPerguntasGlobal) {
        criarNiveis()
    } else {
        alert("preencha os dados corretamente!")
    }
    console.log(qtdCorreta)
}
function criarNiveis() {
    document.querySelector(".tela-criacao-quizz-perguntas").classList.add("escondido");
    container.innerHTML += `
    <div class="tela-criacao-quizz-niveis">
        <h1>Crie seus niveis</h1>
    </div>
    `
    for(let i = 0; i < qtdNiveis; i ++) {
        document.querySelector(".tela-criacao-quizz-niveis").innerHTML += `
        <div class="question">
            <div class="frente-box" onclick="abrirBox(this)">
                <h1>Nivel ${i + 1}</h1>  
            </div>
            <div class="box escondido">
                <h1>Nivel ${i + 1}</h1>
                <input class="tituloNivel${i + 1}" placeholder="Título do nível" />
                <input class="acertoMinimo${i + 1}" placeholder="% de acerto mínima"/>
                <input class="urlImagemNivel${i + 1}" placeholder="URL da imagem do nível"/>
                <input class="descricaoNivel${i + 1}" placeholder="Descrição do nível"/>
            </div>
        </div>
    `

    }
    document.querySelector(".tela-criacao-quizz-niveis").innerHTML += `
    <div class="button" onclick="validacaoNiveis()">
        <h2>Prosseguir pra criar niveis</h2>
    </div>`

}

function validacaoNiveis() {
    let qtdCorretaNiveis = 0;
    let qtdZero = 0;
    for(let i = 0; i < qtdNiveis; i ++) {
        const tituloNivel = document.querySelector(`.tela-criacao-quizz-niveis .tituloNivel${i + 1}`).value;
        const acertoMinimo = document.querySelector(`.tela-criacao-quizz-niveis .acertoMinimo${i + 1}`).value;
        const urlImagemNivel = document.querySelector(`.tela-criacao-quizz-niveis .urlImagemNivel${i + 1}`).value;
        const descricaoNivel = document.querySelector(`.tela-criacao-quizz-niveis .descricaoNivel${i + 1}`).value;
        function tituloNivelPassando () {
            if(tituloNivel.length > 10) {
                return true
            } else {
                return false
            }
        }
        function acertoMinimoPassando () {
            if(Number(acertoMinimo) >= 0 && Number(acertoMinimo) <= 100) {
                return true
            } else {
                return false
            }
        }
        function urlImagemNivelPassando() {
            let re = new RegExp("^((http(s?):\/\/?[a-z])|(magnet:\?xt=urn:btih:))")
            if (re.test(urlImagemNivel)) {
                return true
            } else {
                return false
            }
        }
        function descricaoNivelPassando() {
            if(descricaoNivel.length > 30){
                return true
            } return false
        }
        if(Number(acertoMinimo) === 0 && acertoMinimo !== "") {
            qtdZero += 1;
        } 
        
        if(tituloNivelPassando() && acertoMinimoPassando() && urlImagemNivelPassando() && descricaoNivelPassando()) {
            qtdCorretaNiveis = qtdCorretaNiveis + 1;
        }
    }
    console.log(qtdCorretaNiveis)
    if(qtdCorretaNiveis === Number(qtdNiveis) && qtdZero >= 1) {
        
    } else {
        alert("Preencha os dados corretamente!")
    }
    
}

//if(Number(acertoMinimo) === 0 && acertoMinimo !== "") {
 //   j = j + 1;
//}
//function acertoMinimo0Passando() {
    
//}
//&& acertoMinimo0Passando()

































