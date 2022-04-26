let quantidadeQuestoes;
const container = document.querySelector(".container");
document.querySelector(".container");
let respostasquestão;
let acertos = 0;
let respondidas = 0;
let resultado = 0 ;
let quizzes = [];
let id_quiz_criado

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
    const ulRespostaquizz = document.querySelector(".respostaQuizz");
    ulRespostaquizz.innerHTML = "";
    
    for (let i = 0; i < quantidadeQuestoes.length; i++) {
        respostasquestão = quantidadeQuestoes[i].answers
        ulRespostaquizz.innerHTML += 
        `<div class="pergunta1">
            <div class="questao" >
                <h3 style="background-color:${quantidadeQuestoes[i].color}">${quantidadeQuestoes[i].title}</h3>
            </div>
            <div class="respostas">
                ${renderizarrespostas()}
            </div>
            
        </div> 
 `
    }
}
function renderizarrespostas(){
    const answers = respostasquestão.sort(() => Math.random() - 0.5);
    let quizAnswers = "";
    answers.forEach(answer => {
        quizAnswers += `
        <div onclick="escolheResposta(this)" class="answer ${answer.isCorrectAnswer}" data-identifier="answer">
            <img src="${answer.image}">
            <h4>${answer.text}</h4>
        </div>
        `;
    });
    return quizAnswers;
}

function escolheResposta(elemento){
    respondidas += 1
    elemento.classList.add("selecionado")
    let elementoparente = elemento.parentNode
    let selecionaResposta = elementoparente.querySelectorAll(".answer")
    selecionaResposta.forEach(response => {
        let elementSelect = response.classList.contains("selecionado")
        if (elementSelect === false) {
            response.classList.add("branca");
            response.setAttribute("onclick", "");
            
        } else {
            response.setAttribute("onclick", "");
            
        }
    });

    rigthanswers(elemento)
    if (elemento.classList.contains("true")) {
        acertos += 1
    }
    contabilizarResultados();
}

function rigthanswers(elemento){
    let elementoparente = elemento.parentNode
    const correta = elementoparente.querySelector(".true")
    correta.classList.add("certa")
    let selecionaRespostaerrada = elementoparente.querySelectorAll(".false")
    selecionaRespostaerrada.forEach(response => {
        response.classList.add("errada");
    });
 
}
function contabilizarResultados(){
    if (respondidas == quantidadeQuestoes.length) {
        resultado = (acertos/quantidadeQuestoes.length)*100
        resultado = Math.round(resultado)
        console.log(`aquiiii e aquiiii ${resultado}`)
        const selecionaNivel = quizzEscolhido.levels

        const nivelAtingido = selecionaNivel.filter(nivel => { if (nivel.minValue <= resultado) return true });
        let higherLevel = nivelAtingido[0];
        for (let i = 1; i < nivelAtingido.length; i++) {
            if (higherLevel.minValue < nivelAtingido[i].minValue) higherLevel = nivelAtingido[i];
        }
        renderizarResultado(higherLevel)
    }
}
function renderizarResultado(response){
    console.log(`aquiiii e aquiiii`)
    document.querySelector(".resultadoFinal").classList.remove("escondido");
    document.querySelector(".resultadoFinal").innerHTML +=
    `                   <div class="porcentagem" >
                            <h3>${resultado}% de acerto: ${response.title} </h3>
                        </div>
                        <div class="imagemResultado">
                            <img src="${response.image}" alt="">
                        </div>
                        <div class="textoResultado">
                            <h4>${response.text}</h4>
                        </div>
                        <div class="refazer" onclick="reiniciarQuizz()">
                            <span>Reiniciar Quizz</span> 
                        </div>
                        <div class="voltaTelaInicial" onclick="voltarPaginaInicial()"> 
                            <span>Voltar pra home</span> 
                        </div>`
}
function voltarPaginaInicial(){
    window.location.reload();
}
function reiniciarQuizz(){
    renderizarRespostaQuizzEscolhido()
    document.querySelector(".resultadoFinal").classList.add("escondido");
    acertos = 0;
    respondidas = 0;
    resultado = 0 ;
    document.querySelector(".resultadoFinal").innerHTML = ""
    window.scrollTo(0,0)
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
let qtdNiveis, titulo, url;
function validacaoInicial() {
    titulo = document.querySelector(".container .tela-inicial-criacao-quiz input.titulo").value;
    url = document.querySelector(".container .tela-inicial-criacao-quiz input.url").value;
    qtdPerguntas = document.querySelector(".container .tela-inicial-criacao-quiz input.perguntas").value;
    qtdNiveis = document.querySelector(".container .tela-inicial-criacao-quiz input.niveis").value;

    function tituloCorreto() {
        if(titulo.length >= 20 && titulo.length <= 65){
            return true;
        } return false;
    }
    function urlCorreto() {
        let re = new RegExp("^((http(s?):\/\/?[a-z])|(magnet:\?xt=urn:btih:))")

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
let questions = [];
let answers = [];
function validacaoPergunta() {
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

        questions[i] =
        {
            title: `${textoPergunta}`,
            color: `${corPergunta}`,
            answers: [
                {
                    text: `${respostaCorreta}`,
                    image: `${urlImagemCorreta}`,
                    isCorrectAnswer: true
                },
                {
                    text: `${respostaIncorreta1}`,
                    image: `${urlImagemIncorreta1}`,
                    isCorrectAnswer: false
                }
            ]
        } 
            
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
    console.log(questions)
    document.querySelector(".tela-criacao-quizz-perguntas").classList.add("escondido");
    container.innerHTML += `
    <div class="tela-criacao-quizz-niveis">
        <h1>Agora, decida os níveis</h1>
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
                <input class="acertoMinimo${i + 1}" type="number"  placeholder="% de acerto mínima"/>
                <input class="urlImagemNivel${i + 1}" placeholder="URL da imagem do nível"/>
                <input class="descricaoNivel${i + 1}" placeholder="Descrição do nível"/>
            </div>
        </div>
    `

    }
    document.querySelector(".tela-criacao-quizz-niveis").innerHTML += `
    <div class="button" onclick="validacaoNiveis()">
        <h2>Finalizar quizz</h2>
    </div>`

}
let levels = [];
function validacaoNiveis() {
    let qtdCorretaNiveis = 0;
    let qtdZero = 0;
    for(let i = 0; i < qtdNiveis; i ++) {
        const tituloNivel = document.querySelector(`.tela-criacao-quizz-niveis .tituloNivel${i + 1}`).value;
        const acertoMinimo = document.querySelector(`.tela-criacao-quizz-niveis .acertoMinimo${i + 1}`).value;
        const urlImagemNivel = document.querySelector(`.tela-criacao-quizz-niveis .urlImagemNivel${i + 1}`).value;
        const descricaoNivel = document.querySelector(`.tela-criacao-quizz-niveis .descricaoNivel${i + 1}`).value;
        const acertoMinimoNumero = Number(acertoMinimo);
        levels[i] = 
            {
                title: `${tituloNivel}`,
                image: `${urlImagemNivel}`,
                text: `${descricaoNivel}`,
                minValue: acertoMinimoNumero
            }
        
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
        mandarQuizzServidor()
    } else {
        alert("Preencha os dados corretamente!")
    }
    
}
let mandarQuizz = [];
function mandarQuizzServidor(){
    
    mandarQuizz = {
        title: `${titulo}`,
        image: `${url}`,
        questions: questions,
        levels: levels
    }
    const certoQuizz = {
        title: "Título do quizz",
        image: "https://http.cat/411.jpg",
        questions: [
            {
                title: "Título da pergunta 1",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 2",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 3",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Título do nível 1",
                image: "https://http.cat/411.jpg",
                text: "Descrição do nível 1",
                minValue: 0
            },
            {
                title: "Título do nível 2",
                image: "https://http.cat/412.jpg",
                text: "Descrição do nível 2",
                minValue: 50
            }
        ]
    }
    console.log(certoQuizz)
    console.log(mandarQuizz)
    
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", mandarQuizz)
    promise.then(sucessoQuizz);
}
let quizzTeste = [];
function sucessoQuizz (response) {
    console.log(`aqui é o ${response}`)
    id_quiz_criado = response.data.id
    console.log(`este é o id criado ${id_quiz_criado}`)
    document.querySelector(".tela-criacao-quizz-niveis").classList.add("escondido");
    container.innerHTML += `
    <div class="tela-sucesso-quizz">
            <h1>Seu Quizz está pronto!</h1>
    
            <div class="quizz" onclick="abrirquizz(this)"}">
                <div class="fundo">
                    <div class="titulo">
                        <h2> ${mandarQuizz.title}</h2>
                    </div>
                    <img src="${mandarQuizz.image}"/>
                </div>
    
            </div>
            <div class="button" onclick="abrirquizz(this)">
                <h2>Acesar quizz</h2>
            </div>

            <h3 onclick="voltarHome()">voltar para home</h3>
  
       </div>
    `

    AtualizarQuizzes()
    buscarquizzes()
}
function AtualizarQuizzes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promise.then(atualizacaoCarregarquizzes); 
}
function atualizacaoCarregarquizzes(response){
    quizzes = response.data;
    pegarseusquizzes()
    
}
let arraycomSeusQuizzes = [];
function pegarseusquizzes() {
    arraycomSeusQuizzes.push = id_quiz_criado
    console.log(`este é o array ${arraycomSeusQuizzes}`)
    const dados = arraycomSeusQuizzes;
    const dadosSerializados = JSON.stringify(dados);
    localStorage.setItem("lista", dadosSerializados);
    const listaSerializada = localStorage.getItem("lista");
    const lista = JSON.parse(listaSerializada);
    console.log(`esta é a lista ${lista}`)

        renderizarSeusQuizzes()
}

function voltarHome() {
    document.querySelector(".tela-sucesso-quizz").classList.add("escondido");
    document.querySelector(".tela-inicial").classList.remove("escondido");
    document.querySelector(".tela-inicial .criar-quizz").classList.add("escondido");
    document.querySelector(".tela-inicial .seus-quizzes").classList.remove("escondido");
    

}
function renderizarSeusQuizzes(){
    const ulquizzes = document.querySelector(".seus-quizzes");
    for(let j = 0; j < arraycomSeusQuizzes.length; j ++) {
        ulquizzes.innerHTML += 
        `
        <div class="seusquizzes">
        <div class="quizz" onclick="abrirquizz(this)" id="${arraycomSeusQuizzes[j].id}">
            <div class="fundo">
                <div class="titulo">
                    <h2> ${arraycomSeusQuizzes[j].title}</h2>
                </div>
                    <img src="${arraycomSeusQuizzes[j].image}"/>
            </div>
        </div>
        </div>
        `
    }
    
    
}