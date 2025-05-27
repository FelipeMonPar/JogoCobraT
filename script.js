/* comentário com varias linhas 
let nome_variavel // 
var nome_variavel //
const nome_variavel //const = variável fixa. Ex.: Pi

// Var
if (true){
    var x =10;
}
console.log(x)

//Let
if(true){
    let y = 20;
    console.log(y)
}
*/

/*comentários com várias linhas em java script 

let nome_variavel_let = 15 //console.log dentro
var nome_variavel_var =  // console.log fora
const nome_variavel_const // const: variável fixa. Ex.: pi

// var
if (true){
    var x = 10
}
console.log(x)    // console.log é o "print" do python


//let.getElem
if (true){
    let y = 20;
    console.log(y)
}
console.log(y); */

let pontuacao = 0;

let canvas = document.getElementById("snake");          //desenho
let contexto = canvas.getContext("2d");
let bloco = 32; 
let snake = [];                            // vetores podem guardar vários valores, diferente de uma variável
let somStart = new Audio("png/barulho-corinthians.mp3");
let somComida = new Audio("png/corinthians-radio-globo.mp3")

snake[0] = {
    x: 8 * bloco, 
    y: 8 * bloco
}

let direcao = "direita";

let comida = {                   //Math.floor: floor: arrendonda pro número de "baixo"
    x: Math.floor(Math.random() * 15 + 1) * bloco,     //número aleatório entre 1 e 15, quase 36
    y: Math.floor(Math.random() * 15 + 1) * bloco
}
 
function criarFundo() {
    for (let linha = 0; linha < 16; linha++) {
        for (let coluna = 0; coluna < 16; coluna++) {
            contexto.fillStyle = (linha + coluna) % 2 == 0 ? "#000000" : "#ffffff";
            contexto.fillRect(coluna * bloco, linha * bloco, bloco, bloco);
        }
    }
}

/*function criarFundo(  ) {
    contexto.fillStyle = "darkviolet";  //preenche o estilo com tal cor
    contexto.fillRect(0, 0, 16 * bloco, 16 * bloco);

    //contexto.fillRect() = desenha um retangulo preenchido no canvas
    //contexto.fillRect(coordenada x, coordenada y, largura, altura)

}
*/

criarFundo(); 

function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        // Cabeça branca, corpo preto
        contexto.fillStyle = (i === 0) ? "#FFD700" : "#FFD700";
        contexto.fillRect(snake[i].x, snake[i].y, bloco, bloco);
    }
}

function desenharComida() {
    contexto.fillStyle = "red";
    contexto.fillRect(comida.x, comida.y, bloco, bloco);
}

document.addEventListener('keydown', atualizarDirecao); // keydown : movimentar as teclas

function atualizarDirecao(evento){
    const tecla = evento.key.toLowerCase(); // pega tecla pressionada e converte para minúscula

    if ((evento.keyCode === 37 || tecla === 'a') && direcao !== 'direita') direcao = 'esquerda';
    if ((evento.keyCode === 38 || tecla === 'w') && direcao !== 'baixo') direcao = 'cima';
    if ((evento.keyCode === 39 || tecla === 'd') && direcao !== 'esquerda') direcao = 'direita';
    if ((evento.keyCode === 40 || tecla === 's') && direcao !== 'cima') direcao = 'baixo';
}


function reiniciarJogo() {
    // Esconde a tela de fim de jogo e canvas temporariamente
    document.getElementById("game-over").style.display = "none";
    document.getElementById("snake").style.display = "none";
    document.getElementById("contagem").style.display = "block";

    // Faz a contagem regressiva igual à do início
    let tempo = 3;
    const contagemEl = document.getElementById("contagem");

    const intervalo = setInterval(() => {
        if (tempo > 0) {
            contagemEl.innerText = tempo;
            tempo--;
        } else {
            contagemEl.innerText = "Vai!";
            clearInterval(intervalo);

            setTimeout(() => {
                contagemEl.style.display = "none";
                document.getElementById("snake").style.display = "block";

                // Reinicializa o estado do jogo
                snake = [];
                snake[0] = {
                    x: 8 * bloco,
                    y: 8 * bloco
                };
                direcao = "direita";
                comida = {
                    x: Math.floor(Math.random() * 15 + 1) * bloco,
                    y: Math.floor(Math.random() * 15 + 1) * bloco
                };
                pontuacao = 0;
                atualizarPontuacao();

                somStart.play(); // toca som de reinício
                jogo = setInterval(iniciarJogo, 100);
            }, 800);
        }
    }, 1000);
}
 

function atualizarPontuacao() {
    document.getElementById("pontuacao").innerHTML = "Pontuação: " + pontuacao;
}

function iniciarJogo() {
/*teletransportar a cobra ao ultrapassar as bordas
    if (snake[0].x > 15 * bloco && direcao == 'direita') snake[0].x=0;
    if (snake[0].x < 0 * bloco && direcao == 'esquerda') snake[0].x= 16 * bloco;
    if (snake[0].y > 15 * bloco && direcao == 'baixo') snake[0].y=0;
    if (snake[0].y < 0 && direcao == 'cima') snake[0].y=16 * bloco;
*/
// verifificar a colisão da cabeça com o corpo
        for (let i = 1; i < snake.length; i++) {
        if (snake[0].x== snake[i].x && snake [0].y == snake[i].y){
            clearInterval(jogo);
            document.getElementById("game-over").style.display = "block";
        }
        
    }
    criarFundo();
    criarCobrinha();
    desenharComida();
     
    let cobraX = snake[0].x;
    let cobraY = snake[0].y;

    if (direcao == 'direita') cobraX += bloco;
    if (direcao == 'esquerda') cobraX -= bloco;
    if (direcao == 'cima') cobraY -= bloco;
    if (direcao == 'baixo') cobraY += bloco;

    if (cobraX < 0 || cobraX >= 16 * bloco || cobraY < 0 || cobraY >= 16 * bloco) {
        clearInterval(jogo);
        document.getElementById("game-over").style.display = "block";
        return;
    }

    //verificar se comeu a comida
    if (cobraX != comida.x || cobraY != comida.y) {
        snake.pop();
    } else {
        somComida.play(); // toca o som ao comer
        comida.x = Math.floor(Math.random()* 15 + 1) * bloco;
        comida.y = Math.floor(Math.random()* 15 + 1) * bloco;
        pontuacao++;                  // Aumenta 1 ponto
        atualizarPontuacao();         // Atualiza na tela
    }

    let novaCabeca = {
        x: cobraX,
        y: cobraY
    }

    snake.unshift(novaCabeca) 
}

let jogo; // variável global para controle

function comecarJogo() {
    document.getElementById("botao-iniciar").style.display = "none";
    document.getElementById("contagem").style.display = "block";
    document.getElementById("snake").style.display = "none";
    
    let tempo = 3;
    const contagemEl = document.getElementById("contagem");

    const intervalo = setInterval(() => {
        if (tempo > 0) {
            contagemEl.innerText = tempo;
            tempo--;
        } else {
            contagemEl.innerText = "Vai!";
            clearInterval(intervalo);

            setTimeout(() => {
                contagemEl.style.display = "none";
                document.getElementById("snake").style.display = "block";
                somStart.play();
                jogo = setInterval(iniciarJogo, 100);
            }, 800); // Espera mais um pouco após o "Vai!"
        }
    }, 1000);
}
