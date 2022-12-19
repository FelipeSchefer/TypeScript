function add(n1: number, n2: number): number{
 return n1 + n2
}

function printResult(number: number): void{
 console.log("Result " + number)
}

function addAndHandle(n1: number, n2: number, cb: (num: number)=> void){
 const result = n1 + n2
 cb(result)
}

let addResult = add(10, 5) 
printResult(addResult)

let combineValues: (a: number, b: number) => number
combineValues = add
// combineValues = printResult

console.log(combineValues(8,8))

addAndHandle(10, 20, (result)=>{
 console.log(result)
})
