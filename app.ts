interface IFighter{
  readonly name: string; 
  power: number; 
  health: number;

    getInfo() : string;
    getHealth() : number;
    getName() : string;
}

class Fighter implements IFighter{
  name: string; 
  power: number; 
  health: number;

  constructor(name = "Default_Name_1", power = 5, health = 10){
    this.name = name;
    this.power = power;
    this.health = health;
  }

  protected setDamage(damage: number): void{
    this.health = this.health - damage;
  }

  hit(enemy: any, point: number): void{
    let damage: number = point*this.power;
    enemy.setDamage(damage)
  }

  getInfo(): string{
    let info = "Name: " + this.name + ", power: " + this.power + ", health: " + this.health;
    return info; 
  }

  getHealth(): number{
    return this.health;
  }

  getName(): string{
    return this.name;
  }
}

class ImprovedFighter extends Fighter{

  constructor(name = "Default_Name_2", power = 10, health = 20){
    super(name, power, health);
  }

  doubleHit(enemy: any, point: number): void{
    super.hit(enemy, 2*point);
  }
}

class Fight{

  fight(fighter: Fighter, improvedFighter: ImprovedFighter, ...point: (number | string) [] ){
    var count = 0;
    var winner = fighter;
    var gameLog = document.body;
    var pointLength = point.length;
    while ((fighter.getHealth()>0) && (improvedFighter.getHealth()>0)){
      var fightInfo =  document.createElement("h3");
      fightInfo.innerHTML = `Fight ${count+1}`;
      gameLog.appendChild(fightInfo);

      var firstPlayer = document.createElement("p");
      var secondPlayer = document.createElement("p");

      if (count%2 == 0){
        firstPlayer.innerHTML = fighter.getInfo() + " - Attacking player ";
        secondPlayer.innerHTML = improvedFighter.getInfo();

        fighter.hit(improvedFighter, <number>point[count % pointLength]);
        winner = fighter;
      }
      else {
        firstPlayer.innerHTML = fighter.getInfo();
        secondPlayer.innerHTML = improvedFighter.getInfo() + " - Attacking player ";
        
        improvedFighter.hit(fighter, <number>point[count % pointLength]);
        winner = improvedFighter;
      }
      gameLog.appendChild(firstPlayer);
      gameLog.appendChild(secondPlayer);

      count++;
    }
    var winnerInfo = document.createElement("h2");
    winnerInfo.innerHTML = ("The winner is " + winner.getName() +"!");
    gameLog.appendChild(winnerInfo);
  }
}

let fighter1: Fighter = new Fighter("Vasya", 2, 20);
let fighter2: ImprovedFighter = new ImprovedFighter("Petya", 3, 20);



let newFight: Fight = new Fight();
newFight.fight(fighter1, fighter2, 2, "3", 4);
