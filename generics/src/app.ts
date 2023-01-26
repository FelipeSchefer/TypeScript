const names: Array<string> = []
// names[0].split(' ')

// const promise: Promise<number> = new Promise((resolve, reject)=>{
//  setTimeout(()=>{
//   resolve(10)
//  },2000)
//  reject(0)
// })

// promise.then(data =>{
//  data.toString()
// })

/**
 * it seems an error ocorre when you don't use an exclamation point in the objA it would be easily fixed by adding it to the and of the object like "objA!"
 * another solution would be in the generics inside of the diamond in the T generic extends an object like this "merge<T extends object, U>" 
 * @param objA 
 * @param objB 
 * @returns it returns a merged object
 */
function merge<T extends object, U extends object>(objA: T, objB: U){
 return Object.assign(objA, objB)
}
const mergedObj = merge({name: 'Felipe', hobbies:['Sports']},{age: 29})
console.log(mergedObj.hobbies[0])

interface Lengthy {
 length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string]{
 let describeText = 'Got no value'
 if(element.length === 1){
  describeText = 'Got 1 element'
 }
 else if(element.length > 1){
  describeText = 'Got ' + element.length + ' elements'
 }
 else{
  describeText
 }
 return [element, describeText]
}
console.log(countAndDescribe(""))
console.log(countAndDescribe("A"))
console.log(countAndDescribe("hi there!"))
console.log(countAndDescribe(['Sports', 'Cooking']))


function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
 return 'The value of the key is ' + obj[key] 
}
const extractedName = extractAndConvert({name: 'Felipe', age: 29}, 'name')
const extractedAge = extractAndConvert({name: 'Felipe', age: 29}, 'age')
console.log(extractedName)
console.log(extractedAge)

class DataStorage<T extends  string | number | boolean> {
 private data: T[] = []

 addItem(item: T){
  this.data.push(item)
 }
 removeItem(item: T){
  if(this.data.indexOf(item)=== -1){
   return
  }

  this.data.splice(this.data.indexOf(item),1) //-1
 }
 getItems(){
  return [ ...this.data]
 }
}

const textStorage = new DataStorage<string>()
textStorage.addItem("Felipe")
textStorage.addItem("Teixeira")
textStorage.addItem("Schefer")
textStorage.removeItem("Teixeira")
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>()
numberStorage.addItem(5)
numberStorage.addItem(4)
numberStorage.addItem(6)
numberStorage.removeItem(5)
console.log(numberStorage.getItems())

// const objStorage = new DataStorage<object>()
// const maxObj = {name: 'Max'}
// objStorage.addItem(maxObj)
// objStorage.addItem({name: 'Menu'})
// objStorage.removeItem(maxObj)
// console.log(objStorage.getItems())

interface CourseGoal{
 title: string,
 description: string,
 completeUntil: Date
}
function createCourseGoal(title: string, description: string, date: Date): CourseGoal{
 let courseGoal: Partial<CourseGoal> = {}
 courseGoal.title = title
 courseGoal.description = description
 courseGoal.completeUntil = date
 return courseGoal as CourseGoal
}

const namesList: Readonly<string[]> = [ 'Max', 'Fin' ]
// namesList.push('Anne')
// namesList.pop()