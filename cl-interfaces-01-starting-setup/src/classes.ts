
abstract class Department{
 static fiscalYear = 2023
 // private readonly id: string = ''
 // private name: string = ''
 protected employees: string[] = []

 constructor(protected readonly id:string, public name: string){
  // this.id = id
  // this.name = name
  // console.log(Department.fiscalYear) // static methods can't be instantiate that's why you can't use the This Keyword but instead you have to use the class' name
 }

 abstract describe(this: Department): void;

 static createEmployee(name: string){
  return { name: name }
 }

 addEmployee(employee: string){
  this.employees.push(employee)
 }

 printEmployeeInformation(){
  console.log("Quantity of employees " + this.employees.length)
  for(const employee of this.employees){
   console.log("Name of the employee " + employee)
  }
  console.log("--------------------------------------")
 }
}

class ITDepartment extends Department{
 constructor(id: string, public admins: string[]){
  super(id, 'IT')
 }
 
 describe(): void {
  console.log("IT Department id: " + this.id)
 }
}

class AccountingDepartment extends Department{
 private lastReport: string
 private static instance: AccountingDepartment

 private constructor(id: string, public report: string[]){
  super(id, 'Accounting')
  this.lastReport = report[0]
 }

 // Singletons method
 static getInstance(){
  if(this.instance){
   return this.instance
  }
  this.instance = new AccountingDepartment('d2', [])
  return this.instance
 }

 addEmployee(employee: string): void {
  if(employee === 'Felipe'){ return; }
  else{ this.employees.push(employee)}  
 }

 addReport(report: string){
  this.report.push(report)
  this.lastReport = report
 }

 printReport(){
  for(let r of this.report){
   console.log("Report: " + r)
  }
 }

 describe(): void {
   console.log('Accounting department id: ' + this.id)
 }
 
 get mostRecentReport(){
  if(this.lastReport){
   return this.lastReport
  }
  throw new Error("No report found.");  
 }
 
 set mostRecentReport(value: string){
  if(!value){
   throw new Error("Please pass in a valid value");
  }
  this.addReport(value)
 }
}

const it = new ITDepartment( 'd1', ['Felipe'] )
it.addEmployee("Felipe")
it.addEmployee("Max")
it.describe()
it.printEmployeeInformation()
console.log(it)

// const accounting = new AccountingDepartment('d2', []/*['Felipe is awesome', 'He is amazing']*/) // this stopped being used because of the Singletons Method
const accounting = AccountingDepartment.getInstance() // Singletons Method
accounting.describe()
accounting.addReport('He is so funny!')
accounting.addReport('He is hot!')
accounting.printReport()
accounting.addEmployee('Joseph')
accounting.addEmployee('Felipe') // as there is it in the list it is not re-added
console.log("The last report => " + accounting.mostRecentReport) // this is a getter
accounting.mostRecentReport = 'starting the new year well, welcome 2023' // this is a setter
console.log(accounting)
accounting.printEmployeeInformation()

const employee1 = Department.createEmployee('Max')
console.log(employee1, Department.fiscalYear)