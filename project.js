//Steps to done a project
//deposit some money
//collect a bet amount
//spin the slot machine
//check if the user won
//give the user their winnings
//play again
const prompt = require("prompt-sync")(); //this package will take input from user i.e depositAmount  and function is deposit here

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOL_VALUES= {
    A:5,
    B:4,
    C:3,
    D:2
}

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter your amount: "); // you'll get this as string
    const convertedValue = parseFloat(depositAmount); //Now you'll get this value as floating like "17.2" as 17.2 and "Hello" give us NaN

    if (isNaN(convertedValue) || convertedValue <= 0) {
      console.log("Invalid Number");
    } else {
      return convertedValue;
    }
  }
};

const lines = () =>{
    while (true){
        const NumberOfLines = prompt("Enter your lines (1-3): ")
        const intLine = parseFloat(NumberOfLines);
        if(isNaN(intLine) || intLine <= 0 || intLine > 3){
            console.log("You entered wrong input, try again")
        }
        else{
            return intLine;
        }
    }
};

const numberofBet = (balance, lines)=>{
    while (true){
        const betOnLines = prompt("Enter of bet per lines: ");
        const FloatBet = parseFloat(betOnLines);
        if(isNaN(FloatBet) || FloatBet <= 0 || FloatBet > balance / lines ){
console.log("Invalid Value");
        }
        else{
            return FloatBet;
        }
        }
}

const spin = () =>{
    const symbols = [];//Empty array
    for (const [symbol, count ] of Object.entries(SYMBOLS_COUNT)){
        /*
        we are taking objects from symbol count variable as symbol, count and storin
        into symbols array.
        */ 
for ( let i = 0; i < count; i++){
    symbols.push(symbol);
    /*
    here after taking counts from symbol variables
    we are injecting the symbol into symbols variable 
    */ 
}
    }
    const reels = [];
    for ( let i = 0; i < COLS; i++){//this is iterating no of cols 
        reels.push([]);/*
        it'll push brackets into reels 
        this is pushing empty bracket into reels according to
        number of cols
        */
        const reelSymbols  = [...symbols];// copy of symbols array.
        for (let j = 0; j < ROWS; j++){
const randomIndex = Math.floor(Math.random() * reelSymbols.length);
const selectedSymbol = reelSymbols[randomIndex];
reels[i].push(selectedSymbol);
reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) =>{
    const rows = [];
    
    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}
 const printRows = (rows)=>{

     for (const row of rows){
         let rowString = "";
         for(const [i, symbol] of row.entries()){
             rowString += symbol  
             if(i != rows.length - 1){
                 rowString += " | ";
                }
            }
            console.log(rowString);
        }
}

const getWinnings = (rows, bet, lines)=>{
    let winnings = 0;
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
           if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
if(allSame){
    winnings += bet * SYMBOL_VALUES[symbols[0]]
}
    }

    return winnings;
}

const game = () =>{
    let balance =  deposit();
while(true){
    
    console.log("You have a balace of $" + balance);
    const depositLines =  lines();
    const bet = numberofBet(balance, depositLines); 
    balance -= bet * depositLines;
    const printReels = spin();
    const rows = transpose(printReels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, depositLines);
    balance += winnings;
    console.log("you won, $" + winnings.toString()); 

if(balance <= 0){
    console.log("you ran out of money");
    break;
}
const playAain = prompt ("Do you want to play again? (y/n)");
if(playAain!= "y") break;

}
};
 game();



