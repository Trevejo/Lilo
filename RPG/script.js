var warriorLife = 50;
var warriorDamage = 10;
var archerLife = 30;
var archerDamage = 20;
var mageLife = 20;
var mageDamage = 30;

var warriorImage = "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FGuerreiro.png?1557149637440";
var archerImage = "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FArqueiro.png?1557149637421";
var mageImage = "https://i.pinimg.com/236x/04/bc/cc/04bcccfe6e8f388b0f8698086622aed1--wizard-wizard-hama-art.jpg";


function Character(class1, life, damage, image){
  this.class1 = class1;
  this.life = life;
  this.damage = damage;
  this.image = image;
}

var warriorCharacter;
var archerCharacter;
var mageCharacter;
var characters;

function createCharacters(){
  warriorCharacter = new Character("Warrior", warriorLife, warriorDamage, warriorImage);
  archerCharacter = new Character("Archer", archerLife, archerDamage, archerImage);
  mageCharacter = new Character("Mage", mageLife, mageDamage, mageImage);
  characters = [warriorCharacter, archerCharacter, mageCharacter];
}

createCharacters();

// evolution system

var evolutionPoints = 1;
var evolutionAttributes = 5;

function updateEvolutionPoints(){
  $("#evolutionPointsId").html(evolutionPoints);
  updateButtonDisabled();
}

function updateButtonDisabled(){
  if (evolutionPoints <= 0){
    $(".updateButton").attr("disabled", true);
  } else{
    $(".updateButton").attr("disabled", false);
  }
}

function evolveDamage(class1){
  evolutionPoints -= 1;

  switch(class1){
    case "warrior":
      warriorDamage += evolutionAttributes;
      $("#WarriorDamageId").html(warriorDamage);
      break;
    case "arqueiro":
      archerDamage += evolutionAttributes;
      $("#ArcherDamageId").html(archerDamage);
      break;
    case "mago":
      mageDamage += evolutionAttributes;
      $("#MageDamageId").html(mageDamage);
      break;
  }
  updateEvolutionPoints();
}

function evolveLife(class1){
  evolutionPoints -= 1;

  
  switch(class1){
    case "warrior":
      warriorLife += evolutionAttributes;
      $("#WarriorLifeId").html(warriorLife);
      break;
    case "arqueiro":
      archerLife += evolutionAttributes;
      $("#ArcherLifeId").html(archerLife);
      break;
    case "mago":
      mageLife += evolutionAttributes;
      $("#MageLifeId").html(mageLife);
      break;
  }
  updateEvolutionPoints();
}

// ---------------------- ENEMIES -----------------------------------

function Enemy(name, life, damage, image){
  this.name = name;
  this.life = life;
  this.damage = damage;
  this.image = image;
}

var enemies = [];

function createEnemies(){
  // orcs...
  var orc = new Enemy("Orc", 20, 10, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FOrc.png?1557149638207");
  var orcShaman = new Enemy("Orc Shaman", 20, 30, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FOrc%20Shaman.png?1557149638044");
  var orcBoss = new Enemy("Orc Boss", 50, 10, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FOrc%20Chefe.png?1557149637813");

  var orcs = [orc, orcShaman, orcBoss];

  //mortos-vivos...
  var skeleton = new Enemy("Skeleton", 10, 20, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FEsqueleto.png?1557149637666");
  var zombie = new Enemy("Zombie", 20, 30, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FZumbi.png?1557149638547");
  var zombieBoss = new Enemy("Zombie Boss", 30, 50, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FZumbi%20Chefe.png?1557149638348");

  var undeads = [skeleton, zombie, zombieBoss];

  //demonios
  var imp = new Enemy("Imp", 20, 20, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FImp.png?1557149637585");
  var demon = new Enemy("Demon", 30, 30, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FDemonio.png?1557149637503");
  var demonBoss = new Enemy("Demon Boss", 50, 40, "https://cdn.glitch.com/565b2bc1-af66-43f9-9e31-538d2571e56c%2FDemonio%20Chefe.png?1557149637623");

  var demons = [imp, demon, demonBoss];

  enemies = [orcs, undeads, demons];
}

var characterIndex = 1;
var enemiesGroupIndex;
var enemyTargetIndex;

function selectEnemies(){
  enemiesGroupIndex = $("#selectEnemiesId").val();

  var htmlOptions = "";

  for(var i = 0; i < 3; i++){
    htmlOptions += "<option value=" + i + ">" + enemies[enemiesGroupIndex][i].name + "</options>";
  }

  $("#chosenEnemyId").html(htmlOptions);

  updateTargetData();
}

function updateTargetData(){
  enemyTargetIndex = parseInt($("#chosenEnemyId").val());
  $("#enemyLifeId").html(enemies[enemiesGroupIndex][enemyTargetIndex].life);
  $("#enemyDamageId").html(enemies[enemiesGroupIndex][enemyTargetIndex].damage);
  $("#enemyImageId").attr("src", enemies[enemiesGroupIndex][enemyTargetIndex].image);
}

function startBattle(){
  createCharacters();
  createEnemies();
  selectEnemies();
  updateCharacterData();
}

function selectCharacter(){
  characterIndex = $("#chosenCharacterId").val();
  updateCharacterData();
}

function updateCharacterData(){
  $("#characterLifeId").html(characters[characterIndex].life);
  $("#characterDamageId").html(characters[characterIndex].damage);
  $("#characterImageId").attr("src", characters[characterIndex].image);
}

//attack

var enemyPercentage = 50;

function attack(){
  var htmlFinal = "";

  //Is the chosen character dead?
  if (characters[characterIndex].life <= 0){
    htmlFinal = characters[characterIndex].class1 + " is dead, please attack with other character! ";
  }

  //Is the enemy dead?
  else if(enemies[enemiesGroupIndex][enemyTargetIndex].life <= 0){
    htmlFinal = enemies[enemiesGroupIndex][enemyTargetIndex].name + " is already dead, attack other enemy! ";
  }

  //Now I can attack again
  else{
    //character attack = 100% precise
    enemies[enemiesGroupIndex][enemyTargetIndex].life -= characters[characterIndex].damage;

    htmlFinal = enemies[enemiesGroupIndex][enemyTargetIndex].name + " received " + characters[characterIndex].damage + " of damage. ";
 
    //checking if the character is dead
    if(enemies[enemiesGroupIndex][enemyTargetIndex].life <= 0){
      htmlFinal = enemies[enemiesGroupIndex][enemyTargetIndex].name + " died. ";

      enemies[enemiesGroupIndex][enemyTargetIndex].life = 0;
    }

    //enemy attack = 50% precise
    if(Math.floor(Math.random() * 100) <= enemyPercentage){
      characters[characterIndex].life -= enemies[enemiesGroupIndex][enemyTargetIndex].damage;

      //message
      htmlFinal += characters[characterIndex].class1 + " received " + enemies[enemiesGroupIndex][enemyTargetIndex].damage + " of damage. ";

      //check if its dead
      if(characters[characterIndex].life <= 0){
        characters[characterIndex].life = 0;
        htmlFinal += characters[characterIndex].class1 + " died. ";
      }
    }
    //checking if all the enemies are dead
    var allEnemiesDead = chackAllEnemiesDead();

    if(allEnemiesDead){
      htmlFinal += "All enemies are dead, you  can withdraw your evolution points!";

      $("#withdrawButtonId").attr("disabled", false);
    }
  }

  updateCharacterData();
  updateTargetData();

  $("#resultId").html(htmlFinal);
}

function chackAllEnemiesDead(){
  for(var i = 0; i < enemies[enemiesGroupIndex].length; i++){
    if(enemies[enemiesGroupIndex][i].life > 0){
      return false;
    }
  }
  return true;
}

function withdraw(){
  evolutionPoints += 1;
  updateEvolutionPoints();
  $("#botaoSaquearId").attr("disabled", true);
}