enum ProjectStatus{
   Active,
   Finished
}

class Project{
   constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
   ){  }
}

// PROJECT STATE MANAGEMENT 
type Listener<T> = (items: T[]) => void

class State<T> {
   protected listeners: Listener<T>[] = []
   
   addListener(listenerFn: Listener<T>){
      this.listeners.push(listenerFn)
   }
}

class ProjectState extends State<Project>{
   private projects: Project[] = []
   private static instance: ProjectState

   private constructor(){
      super()
   }

   static getInstance(){
      if(this.instance){
         return this.instance
      }
      this.instance = new ProjectState()
      return this.instance
   }

   addProject(title: string, description: string, numOfPeople: number){
      const newProject = new Project(
         Math.random().toString(),
         title,
         description,
         numOfPeople,
         ProjectStatus.Active
      )
      this.projects.push(newProject)

      for(const listenerFn of this.listeners){
         listenerFn(this.projects.slice())
      }
   }
}

const projectState = ProjectState.getInstance()

interface Validatable{
 value: string | number,
 required?: boolean,
 minLength?: number,
 maxLenght?: number,
 min?: number,
 max?: number
}

function validate(validatableInput: Validatable){
 let isValid = true
 if(validatableInput.required){
  isValid = isValid && validatableInput.value.toString().trim().length !== 0
 }
 if(validatableInput.minLength != null && typeof validatableInput.value === 'string'){
  isValid = isValid && validatableInput.value.length >= validatableInput.minLength
 }
 if(validatableInput.maxLenght != null && typeof validatableInput.value === 'string'){
  isValid = isValid && validatableInput.value.length <= validatableInput.maxLenght
 }
 if(validatableInput.min != null && typeof validatableInput.value === 'number'){
  isValid = isValid && validatableInput.value >= validatableInput.min
 }
 if(validatableInput.max != null && typeof validatableInput.value === 'number'){
  isValid = isValid && validatableInput.value <= validatableInput.max
 }
 return isValid
}

function AutoBinding(_: any, _2: string, descriptor: PropertyDescriptor){
 const originalMethod = descriptor.value
 const adjDescriptor: PropertyDescriptor ={
  configurable: true,
  get() {
     const boundFn = originalMethod.bind(this)
     return boundFn
  },
 }
 return adjDescriptor
}

//Component base class
abstract class Component<T extends HTMLElement,U extends HTMLElement>{
   templateElement: HTMLTemplateElement
   hostElement: T
   element: U

   constructor(
      templateID: string, hosteElementId: string,
      insertAtStart: boolean, newElementId?: string
   ){
      this.templateElement = document.getElementById(templateID)! as HTMLTemplateElement
      this.hostElement = document.getElementById(hosteElementId)! as T

      const importedNode = document.importNode(this.templateElement.content, true)
      this.element = importedNode.firstElementChild as U
      if(newElementId){
         this.element.id = newElementId
      }

      this.attach(insertAtStart)
   }
   private attach(insertAtBeginning: boolean){
      this.hostElement.insertAdjacentElement(
         insertAtBeginning ? 'afterbegin' : 'beforeend', this.element 
      )
   }

   abstract configure(): void
   abstract renderContent(): void
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
   private project: Project
   constructor(hostId: string, project: Project){
      super('single-project', hostId, false, project.id)
      this.project = project

      this.configure()
      this.renderContent()
   }

   configure(): void {
      
   }
   
   renderContent(): void {
      this.element.querySelector('h2')!.textContent = this.project.title
      this.element.querySelector('h3')!.textContent = this.project.people.toString()
      this.element.querySelector('p')!.textContent = this.project.description
   }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement>{
   assignedProjects: Project[] = []

   constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects` )
      this.assignedProjects = [] 

      this.configure()
      this.renderContent()
   }

   configure(): void {
      projectState.addListener((projects: Project[]) =>{
         const relevantProjects = projects.filter(prj => {
            if(this.type === 'active'){
               return prj.status === ProjectStatus.Active
            }
            return prj.status === ProjectStatus.Finished
         })
   
         this.assignedProjects = relevantProjects
         this.renderProjects()
      })
   }

   renderContent(){
      const listId = `${this.type}-projects-list`
      this.element.querySelector('ul')!.id = listId
      this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
   }

   private renderProjects(){
      const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
      listEl.innerHTML = ''
      for(const projItem of this.assignedProjects){
         new ProjectItem(this.element.querySelector('ul')!.id, projItem)
      }
   }
}


class ProjectInput extends Component<HTMLTemplateElement, HTMLFormElement>{
   titleInputElement: HTMLInputElement
   descriptionInputElement: HTMLInputElement
   peopleInputElement: HTMLInputElement

   constructor(){
      super('project-input', 'app', true, 'user-input')
      this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
      this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
      this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

      this.configure()
   }

   configure(){
      // this.element.addEventListener('submit', this.submitHandler.bind(this)) // there are two ways to solve this one is binding direct in the eventListener and the other is using Decorators
      this.element.addEventListener('submit', this.submitHandler)
   }

   renderContent(): void {}

   private clearInputs(){
      this.titleInputElement.value = ''
      this.descriptionInputElement.value = ''
      this.peopleInputElement.value = ''
   }

   private gatherUserInput(): [string, string, number] | void{
      const enteredTitle = this.titleInputElement.value
      const enteredDescriptor = this.descriptionInputElement.value
      const enteredPeople = this.peopleInputElement.value

      const titleValidatable: Validatable = {
         value: enteredTitle,
         required: true
      }
      const descriptorValidatable: Validatable = {
         value: enteredDescriptor,
         required: true,
         minLength: 5
      }
      const peopleValidatable: Validatable = {
         value: +enteredPeople,
         required: true,
         min: 1,
         max: 5
      }

      if(!validate(titleValidatable) ||
         !validate(descriptorValidatable) ||
         !validate(peopleValidatable)){
         alert('Invalid input, please try again')
         return
      }
      else{
         return [enteredTitle, enteredDescriptor, +enteredPeople]
      }
   }

   @AutoBinding
   private submitHandler(event: Event){
      event.preventDefault()
      const userInput = this.gatherUserInput()
      if(Array.isArray(userInput)){
         const [title, desc, people] = userInput
         console.log(title, desc, people)
         projectState.addProject(title, desc, people)
         this.clearInputs()
      }
   }
}

const prjInput = new ProjectInput()
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')
