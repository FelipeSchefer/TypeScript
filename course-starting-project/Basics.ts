function add(num1: number, num2: number, showResult: boolean, phrase: string): number{
 // if(typeof num1 !== 'number' || typeof num2 !== 'number'){
 //  throw new Error('Input is not a number');
 // } 
 const result = + num1 + num2;
 if(showResult){
  console.log(phrase + result)
 }

 return num1 + num2;
}

const num1 = 5;
const num2 = 10;
const printResult = true;
const resultPrase = 'Result is ';
add(num1 , num2, printResult, resultPrase);

