let quizzes;
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
    const quantidadeQuestoes =  quizzEscolhido.questions
    console.log(quantidadeQuestoes)
    const ulRespostaquizz = document.querySelector(".respostaQuizz");
    ulRespostaquizz.innerHTML = "";
    console.log(quantidadeQuestoes.title)
    for (let i = 0; i < quantidadeQuestoes.length; i++) {
       
        ulRespostaquizz.innerHTML += 
        `<div class="pergunta1">
            <div class="questao" >
                <h3 style="background-color:${quantidadeQuestoes[i].color}">${quantidadeQuestoes[i].title}</h3>
            </div>
          
        </div>                    
 `
      
    }
    
}
