function buscarquizzes(){
    console.log(`entrei aqui`)
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    console.log(promise)
    promise.then(carregarquizzes); 
}
function carregarquizzes(response){
    console.log(`entrei aquiagora`)
    quizzes = response.data;
    renderizarquizzes();
}
function hello(){
    console.log("hello Emily")
}
function renderizarquizzes(){
    console.log(`entrei aquiagoraagora`)
    const ulquizzes = document.querySelector(".quizzes");
    ulquizzes.innerHTML = "";
    for (let i = 0; i < quizzes.length; i++) {
        ulquizzes.innerHTML += 
        `
        <div class="quizz">
            <div class="titulo">
                <h2> ${quizzes[i].title}</h2>
                <img src="${quizzes[i].image}">
            </div>
        </div>
        `
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

