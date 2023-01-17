// type addFn = (a: number, b: number) => number
interface addFn{ // custom types frequently are equivalent to interfaces in this case we give a type to a function and force it to has those parameters
 (a: number, b: number): number
}

let add: addFn

add = (a: number, b: number) =>{
 return a + b
}
console.log(add(10, 5))
// type Person = { // type and interface sometimes can be used interchangeably
// interface Person { // type and interface sometimes can be used interchangeably
interface Name {
 readonly name?: string // this is optional but used in the code below
 outputName?: string // this is also optional, and it isn't used in the code below
}
interface Greetable extends Name{
 greet(phrase: string): void
}

class Person implements Greetable{
 name?: string
 age?: number

 constructor(name?: string, age?: number){
  if(name && age){
   this.name = name
   this.age = age
  }
 }

 greet(phrase: string): void {
  if(this.name){
   console.log(phrase + ' ' + this.name + " and I'm " + this.age)
  }
  else{
   console.log('hi')
  }
 }
 
}

let user1: Greetable
user1 = new Person('Felipe', 29) 
// user1.name = 'Maria' // because it is readonly in the interface it assumes that I can't change the variable name
user1.greet('Hi user1 your name is')
console.log(user1)

let user2: Greetable
user2 = new Person()
user2.greet('Hi user2 your name is')
console.log(user2)
