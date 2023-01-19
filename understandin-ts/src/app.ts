
const fetchUserData = {
 id: 'u1',
 name: 'Max',
 job: {title: 'CEO', description: 'My own company'}
}

console.log(fetchUserData?.job?.title)

const userInput = undefined // if the value were an empty string it would set an empty value
const storedData = userInput ?? 'DEFAULT'

console.log(storedData)
