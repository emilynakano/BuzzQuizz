let quizzes;
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
        <div class="quizz" onclick="abrirquizz(this)">
    
            <div class="titulo">
                <h2> ${quizzes[i].title}</h2>
            </div>
                <img src="${quizzes[i].image}"/>
            </div>
        </div>
        `
        console.log(`Eu sou o ID ${quizzes[i].id}`)
    }
    
}

function criarquizz(){
    const criaquizz = {
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
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", criaquizz)
    
    
}
function criarQuizz() {
    document.querySelector(".tela-inicial").classList.add("escondido");
    document.querySelector(".tela-inicial-criacao-quiz").classList.remove("escondido");
}

function abrirquizz(elemento){
    console.log(elemento)
    document.querySelector(".tela-inicial").classList.add("escondido");
    document.querySelector(".tela-inicial-mostrar-quiz").classList.remove("escondido");
    
    const ID_DO_QUIZZ = quizzes[i].id
    console.log(`Eu sou o numero ${ID_DO_QUIZZ}`)
    console.log(ID_DO_QUIZZ)
    URlidquizz = `https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${ID_DO_QUIZZ}`
    const promise = axios.get(URlidquizz);
    console.log(promise)
    promise.then(carregarquizzes);

    
}
function validacao() {
    const titulo = document.querySelector("input.titulo").value;
    const url = document.querySelector("input.url").value;
    const qtdPerguntas = document.querySelector("input.perguntas").value;
    const qtdNiveis = document.querySelector("input.niveis").value;

    function tituloCorreto() {
        if(titulo.length >= 20 && titulo.length <= 65){
            return true;
        } return false;
    }
    function urlCorreto() {
        let re = new RegExp("^((http(s?):\/\/?[a-z])|(magnet:\?xt=urn:btih:))")

        const url = document.querySelector("input.url").value;

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
        return console.log("deu certo")
    } else alert("preencha os dados corretamente")
}
