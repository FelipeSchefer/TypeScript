
enum Role {ADMIN, READ_ONLY, AUTHOR}

// const person: {name: string; age : number; hobbies: string[]; role: [number, string]} = {
const person = {
 name:  'Felipe',
 age: 29,
 hobbies: ['sports', 'cooking'],
 role: Role.ADMIN
}

// person.role.push('admin')
// person.role[1] = 'aham'

// let favoriteActivity: string[];
// favoriteActivity = ['sports']

for(const hobby of person.hobbies){
 console.log(hobby.toUpperCase())
}

console.log(person.name + ' is ' + person.age)

if (person.role === Role.ADMIN) {
 console.log('is author')
}