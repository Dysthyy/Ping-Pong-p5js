// variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

// velocidade da bolota
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;


// sons do jogo
let raquetada;
let ponto;
let trilha;

let colidiu = false;

function setup() {
  createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaqueteOponente(xRaqueteOponente, yRaqueteOponente);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    incluiPlacar() 
    marcaPonto();
}
function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}
  // arrumando o bug da bolinha que vara tudo
function verificaColisaoRaquete() {
  // verifica se a bolinha está colidindo com a raquete do jogador
  if (
    xBolinha - raio < xRaquete + raqueteComprimento && // Verifica o lado direito da raquete
    xBolinha + raio > xRaquete &&                     // Verifica o lado esquerdo da raquete
    yBolinha + raio > yRaquete &&                     // Verifica o topo da raquete
    yBolinha - raio < yRaquete + raqueteAltura        // Verifica a base da raquete
  ) {
    // aqui ajusta a posição da bolinha para fora da raquete
    xBolinha = xRaquete + raqueteComprimento + raio; // Coloca a bolinha fora da raquete

    // inverte a direção da bolinha
    velocidadeXBolinha *= -1;

    // toca o som de raquetada
    raquetada.play();
  }
}

function verificaColisaoRaqueteOponente() {
  // verifica a colisão da bolinha com a raquete do oponente
  colidiu = collideRectCircle(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    // ajusta a posição da bolinha para nn ultrapassar a raquete
    xBolinha = xRaqueteOponente - raio; // ajusta a posição para fora da raquete

    // inverte a direção da bolinha
    velocidadeXBolinha *= -1;

    // toca o som de raquetada
    raquetada.play();
  }
}



function movimentaRaqueteOponente(){
    if (keyIsDown(87)){
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)){
        yRaqueteOponente += 10;
    }
}


function incluiPlacar(){
  stroke(255)
    textAlign(CENTER);
    textSize(16);
    fill(color(255,140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255,140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);



}


function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}

// sons do joguin
function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}
