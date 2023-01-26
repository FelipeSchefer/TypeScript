function Logger(logString: string){
 console.log('LOGGER')
 return function(constructor: Function){
  console.log(logString)
  console.log(constructor)
 }
}

function withTemplate(template: string, hookId: string){
 console.log('TEMPLATE FACTORY')
 // return function(_: Function){ // the underscore used as an argument inside of the anonymous function which is of the type Function means that typescript knows that it needs an argument but it isn't needed
 return function<T extends {new(...arg: any[]):{name: string}}>(originalConstructor: T){
  return class extends originalConstructor{
   constructor(..._: any[]){
    super()
    console.log('template')
    const hookEl = document.getElementById(hookId)
    if(hookEl){
     hookEl.innerHTML = template
     hookEl.querySelector('h1')!.textContent = this.name
    }
   }
  }
 }
}
/*
 * There is an order of executing of the templates that you must know they first 
 * execute the function up to button but not the inner function later it comes
 * from button to top it similar to an boomerang effect
 */
@Logger('LOGGING - PERSON')
@withTemplate('<h1>My person object</h1>', 'app')
class Person{
 name = 'Felipe'

 constructor(){
  console.log('Creating a person object')
 }
}

const person = new Person()

//-----------------------------------------------------

function Log(target: any, propertyName: string | Symbol ){
 console.log('Property decorator...')
 console.log(target, propertyName)
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor){
 console.log("accessor decorator!")
 console.log(target)
 console.log(name)
 console.log(descriptor)
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
 console.log("method decorator!")
 console.log(target)
 console.log(name)
 console.log(descriptor)
}

function Log4(target: any, name: string | Symbol, position: number){
 console.log("parameter decorator!")
 console.log(target)
 console.log(name)
 console.log(position)
}

class Product {
 @Log
 title: string
 protected _price: number

 @Log2
 set price(val: number){
  if(val > 0){
   this._price = val
  }
  else{
   throw new Error('Error the value of price should be positive')
  }
 }

 constructor(title: string, price:number){
  this.title = title
  this._price = price
 }

 @Log3
 getPriceWithTax(@Log4 tax: number){
  return this._price = ( 1 + tax)
 }
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor){
 const originalMethod = descriptor.value
 const adjDescriptor: PropertyDescriptor = {
  configurable: true,
  enumerable: false,
  get() {
   const boundFn = originalMethod.bind(this)
   return boundFn
  }
 }
 return adjDescriptor
}

class Printer{
 message = 'this works!'

 @AutoBind
 showMessage(){
  console.log(this.message)
 }
}

const p = new Printer()
p.showMessage()

const button = document.querySelector('button')!
button.addEventListener('click', p.showMessage.bind(p))

//------------------------------------------------------------------------------
interface ValidatorConf{
 [proprety: string]:{
  [validatableProp: string]: string[] // ['require', 'positive']
 }
}

const registeredValidators: ValidatorConf ={}  

function Required(target: any, propName: string){
 registeredValidators[target.constructor.name] = {
  ...registeredValidators[target.constructor.name],
  [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
 }
}

function PositiveNumber(target: any, propName: string){
 registeredValidators[target.constructor.name] = {
  ...registeredValidators[target.constructor.name],
  [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
 }
}
function validate(obj: any){
 const objValidatorConfig = registeredValidators[obj.constructor.name]
 if(!objValidatorConfig){
  return true
 }
 let isValid = true
 for(const prop in objValidatorConfig){
  for(const validator of objValidatorConfig[prop]){
   switch (validator) {
    case 'required':
     isValid = isValid && !!obj[prop]
    break
    case 'positive':
     isValid = isValid && obj[prop] > 0
    break
   }
  }
 }
 return isValid
}

class Course {
 @Required
 title: string
 @PositiveNumber
 price: number

 constructor(t: string, p: number){
  this.title = t
  this.price = p
 }
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', event =>{
 event.preventDefault()
 const titleEl = document.getElementById('title') as HTMLInputElement
 const priceEl = document.getElementById('price') as HTMLInputElement

 const title = titleEl.value
 const price = +priceEl.value

 const createdCourse = new Course(title , price)

 if(!validate(createdCourse)){
  alert('Invalid input, please try again')
  return
 }
 console.log(createdCourse)
})