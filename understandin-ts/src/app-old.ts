type Admin = {
 name: string,
 privilege: string[]
}

type Employee = {
 name: string,
 startDate: Date
}

type ElevatedEmployee = Admin & Employee

const e1: ElevatedEmployee ={
 name: 'Felipe',
 privilege: ['create-server'],
 startDate: new Date()
}

type Combinable = string | number
type Numeric = number | boolean

type Universal = Combinable & Numeric

function add (a: number, b: number):number;
function add (a: string, b: string):string;
function add (a: number, b: string):string;
function add (a: string, b: number):string;
function add (a: Combinable, b: Combinable)/*: number | string */{
 if(typeof a === 'string' || typeof b === 'string'){
  return a.toString() + b.toString()
 }
 return a + b
}

const added = add('felipe', ' schefer')
added.split(' ')


type UnknownEmployee = Employee | Admin

function printEmployeeInformation(emp: UnknownEmployee): void {
 console.log('Name ' + emp.name)
 if('privilege' in emp){
  console.log('Privilege ' + emp.privilege)
 }
 if('startDate' in emp){
  console.log('Start Date' + emp.startDate)
 }
 console.log('--------------------------------------------------------')
}

printEmployeeInformation(e1)
printEmployeeInformation({name: 'Max', startDate: new Date })

class Car {
 drive(){
  console.log('Driving...')
 }
}

class Truck {
 drive(){
  console.log('Driving a Truck...')
 }
 loadCargo(amount: number){
  console.log('Loading Cargo ' + amount)
 }
}

type Vehicle = Truck | Car

const car = new Car()
const truck = new Truck()

function useVehicle( vehicle: Vehicle){
 vehicle.drive()
 if(vehicle instanceof Truck  /*'loadCargo' in vehicle*/){ // you can access both ways either with 'instanceof' or 'in'
  vehicle.loadCargo(10000)
 }
 console.log('----------------------------------------')
}

useVehicle(car)
useVehicle(truck)

interface Bird{
 type: 'bird',
 flyingSpeed: number
}

interface Horse{
 type: 'horse'
 runningSpeed: number
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal){
 let name: string = ''
 let speed: number = 0

 switch (animal.type) {
  case 'bird':
   name = animal.type
   speed = animal.flyingSpeed
   break;
  case "horse":
   name = animal.type
   speed = animal.runningSpeed
  default:
   break;
 }
 console.log('The ' + name + ' is moving at speed ' + speed)
}

moveAnimal({type: 'bird', flyingSpeed: 10})
moveAnimal({type: 'horse', runningSpeed: 20})

// const userInputElement = <HTMLInputElement> document.getElementById('user-input')! // you can use these two syntax the one in this line and the other after
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement
// userInputElement.value = 'hi there'

const userInputElement = document.getElementById('user-input') // this is one alternative to the code commented above
if(userInputElement){
 (userInputElement as HTMLInputElement).value = 'Hi there'
}

interface ErrorContainer{
 [props: string]: string // this special syntax ([props: string]: string) is used when you want to have some flexibility when it comes to names that are implemented
}

const errorBag: ErrorContainer ={
 email: 'Not a valid email', // in here because of the interface you can choose whatever name key you wish since it is a string
 username: 'Must start with a Capital latter'
}