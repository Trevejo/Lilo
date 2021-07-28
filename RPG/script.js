var vidaGuerreiro = 50;
var danoGuerreiro = 10;
var vidaArqueiro = 30;
var danoArqueiro = 20;
var vidaMago = 20;
var danoMago = 30;

var imagemGuerreiro = "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FGuerreiro.png?1557149637440";
var imagemArqueiro = "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FArqueiro.png?1557149637421";
var imagemMago = "https://i.pinimg.com/236x/04/bc/cc/04bcccfe6e8f388b0f8698086622aed1--wizard-wizard-hama-art.jpg";


function Personagem(classe, vida, dano, imagem){
  this.classe = classe;
  this.vida = vida;
  this.dano = dano;
  this.imagem = imagem;
}

var personagemGuerreiro;
var personagemArqueiro;
var personagemMago;
var personagens;

function criarPersonagens(){
  personagemGuerreiro = new Personagem("Guerreiro", vidaGuerreiro, danoGuerreiro, imagemGuerreiro);
  personagemArqueiro = new Personagem("Arqueiro", vidaArqueiro, danoArqueiro, imagemArqueiro);
  personagemMago = new Personagem("Mago", vidaMago, danoMago, imagemMago);
  personagens = [personagemGuerreiro, personagemArqueiro, personagemMago];
}

criarPersonagens();

// sistema de evolução

var pontosParaEvolucao = 1;
var pontosAoEvoluir = 5;

function atualizarPontosEvolucao(){
  $("#pontosEvolucaoId").html(pontosParaEvolucao);
  atualizarButtonDisabled();
}

function atualizarButtonDisabled(){
  if (pontosParaEvolucao <= 0){
    $(".botaoUpdate").attr("disabled", true);
  } else{
    $(".botaoUpdate").attr("disabled", false);
  }
}

function evoluirDano(classe){
  pontosParaEvolucao -= 1;

  switch(classe){
    case "guerreiro":
      danoGuerreiro += pontosAoEvoluir;
      $("#GuerreiroDanoId").html(danoGuerreiro);
      break;
    case "arqueiro":
      danoArqueiro += pontosAoEvoluir;
      $("#ArqueiroDanoId").html(danoArqueiro);
      break;
    case "mago":
      danoMago += pontosAoEvoluir;
      $("#MagoDanoId").html(danoMago);
      break;
  }
  atualizarPontosEvolucao();
}

function evoluirVida(classe){
  pontosParaEvolucao -= 1;

  
  switch(classe){
    case "guerreiro":
      vidaGuerreiro += pontosAoEvoluir;
      $("#GuerreiroVidaId").html(vidaGuerreiro);
      break;
    case "arqueiro":
      vidaArqueiro += pontosAoEvoluir;
      $("#ArqueiroVidaId").html(vidaArqueiro);
      break;
    case "mago":
      vidaMago += pontosAoEvoluir;
      $("#MagoVidaId").html(vidaMago);
      break;
  }
  atualizarPontosEvolucao();
}

// ---------------------- INIMIGOS -----------------------------------

function Inimigo(nome, vida, dano, imagem){
  this.nome = nome;
  this.vida = vida;
  this.dano = dano;
  this.imagem = imagem;
}

var inimigos = [];

function criarInimigos(){
  // orcs...
  var orc = new Inimigo("Orc", 20, 10, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FOrc.png?1557149638207");
  var orcShaman = new Inimigo("Orc Shaman", 20, 30, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FOrc%20Shaman.png?1557149638044");
  var orcChefe = new Inimigo("Orc Chefe", 50, 10, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FOrc%20Chefe.png?1557149637813");

  var orcs = [orc, orcShaman, orcChefe];

  //mortos-vivos...
  var esqueleto = new Inimigo("Esqueleto", 10, 20, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FEsqueleto.png?1557149637666");
  var zumbi = new Inimigo("Zumbi", 20, 30, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FZumbi.png?1557149638547");
  var zumbiChefe = new Inimigo("Zumbi Chefe", 30, 50, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FZumbi%20Chefe.png?1557149638348");

  var mortosVivos = [esqueleto, zumbi, zumbiChefe];

  //demonios
  var imp = new Inimigo("Imp", 20, 20, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FImp.png?1557149637585");
  var demonio = new Inimigo("Demônio", 30, 30, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FDemonio.png?1557149637503");
  var demonioChefe = new Inimigo("Demônio Chefe", 50, 40, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FDemonio%20Chefe.png?1557149637623");

  var demonios = [imp, demonio, demonioChefe];

  inimigos = [orcs, mortosVivos, demonios];
}

var indexPersonagem = 1;
var indexGrupoInimigos;
var indexInimigoAlvo;

function selecionarInimigos(){
  indexGrupoInimigos = $("#selecaoInimigosId").val();

  var htmlOptions = "";

  for(var i = 0; i < 3; i++){
    htmlOptions += "<option value=" + i + ">" + inimigos[indexGrupoInimigos][i].nome + "</options>";
  }

  $("#inimigosEscolhidosId").html(htmlOptions);

  atualizarDadosAlvo();
}

function atualizarDadosAlvo(){
  indexInimigoAlvo = parseInt($("#inimigosEscolhidosId").val());
  $("#vidaInimigoId").html(inimigos[indexGrupoInimigos][indexInimigoAlvo].vida);
  $("#danoInimigoId").html(inimigos[indexGrupoInimigos][indexInimigoAlvo].dano);
  $("#imagemInimigoId").attr("src", inimigos[indexGrupoInimigos][indexInimigoAlvo].imagem);
}

function iniciarBatalha(){
  criarPersonagens();
  criarInimigos();
  selecionarInimigos();
  atualizarDadosPersonagem();
}

function selecionarPersonagem(){
  indexPersonagem = $("#personagemEscolhidoId").val();
  atualizarDadosPersonagem();
}

function atualizarDadosPersonagem(){
  $("#vidaPersonagemId").html(personagens[indexPersonagem].vida);
  $("#danoPersonagemId").html(personagens[indexPersonagem].dano);
  $("#imagemPersonagemId").attr("src", personagens[indexPersonagem].imagem);
}

//atacar

var porcentagemInimigo = 50;

function Atacar(){
  var htmlFinal = "";

  //o personagem escolhido esta morto??
  if (personagens[indexPersonagem].vida <= 0){
    htmlFinal = personagens[indexPersonagem].classe + " está morto, por favor ataque com outro personagem! ";
  }

  //0 inimigo esta morto?
  else if(inimigos[indexGrupoInimigos][indexInimigoAlvo].vida <= 0){
    htmlFinal = inimigos[indexGrupoInimigos][indexInimigoAlvo].nome + " já morreu, ataque outro inimigo! ";
  }

  // agora eu posso atacar novamente...
  else{
    //ataque personagem = 100% de precisao
    inimigos[indexGrupoInimigos][indexInimigoAlvo].vida -= personagens[indexPersonagem].dano;

    htmlFinal = inimigos[indexGrupoInimigos][indexInimigoAlvo].nome + " recebeu " + personagens[indexPersonagem].dano + " de dano. ";
 
    //verficando se o personagem morreu...
    if(inimigos[indexGrupoInimigos][indexInimigoAlvo].vida <= 0){
      htmlFinal = inimigos[indexGrupoInimigos][indexInimigoAlvo].nome + " morreu. ";

      inimigos[indexGrupoInimigos][indexInimigoAlvo].vida = 0;
    }

    // ataque inimigo = 50% de precisao
    if(Math.floor(Math.random() * 100) <= porcentagemInimigo){
      personagens[indexPersonagem].vida -= inimigos[indexGrupoInimigos][indexInimigoAlvo].dano;

      //mensagem
      htmlFinal += personagens[indexPersonagem].classe + " recebeu " + inimigos[indexGrupoInimigos][indexInimigoAlvo].dano + " de dano. ";

      //verifica a morte
      if(personagens[indexPersonagem].vida <= 0){
        personagens[indexPersonagem].vida = 0;
        htmlFinal += personagens[indexPersonagem].classe + " morreu. ";
      }
    }
    //verificando se todos os meus inimigos estao mortos
    var todosInimigosEstaoMortos = verificaTodosInimigosMortos();

    if(todosInimigosEstaoMortos){
      htmlFinal += "Todos os inimigos estão mortos, você pode saquear os seus pontos de evolução!";

      $("#botaoSaquearId").attr("disabled", false);
    }
  }

  atualizarDadosPersonagem();
  atualizarDadosAlvo();

  $("#resultadoId").html(htmlFinal);
}

function verificaTodosInimigosMortos(){
  for(var i = 0; i < inimigos[indexGrupoInimigos].length; i++){
    if(inimigos[indexGrupoInimigos][i].vida > 0){
      return false;
    }
  }
  return true;
}

function saquear(){
  pontosParaEvolucao += 1;
  atualizarPontosEvolucao();
  $("#botaoSaquearId").attr("disabled", true);
}