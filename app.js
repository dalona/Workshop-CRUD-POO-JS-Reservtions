

class Person{
        static users = []
        static reservations = []
        constructor(name, age,email, address){
            this.name = name
            this.email = email
            this.address = address
            this.age = age
        }

        static createUser(newUser){ /*No tuve que instanciar a Person (new Person para acceder al metodo createUser) */
            Person.users.push(newUser)
        }

        static logIn(email,password){ /*No tuve que instanciar a Person (new Person para acceder al metodo createUser) */
            const user = Person.users.find(user => user.email === email && user.password === password);
            return user
        }

        static booking(user,date,destination){
           const booking = {
            user : user,
            date : date,
            destination : destination
           }
           Person.reservations.push(booking);
           return booking
        }
}

class RegularUser extends Person{
        constructor(name,age,email,address,password,role){
            super(name,age,address)
            this.email= email
            this.password= password
            this.role = role
    }
}

class Admin extends Person{
    static #adminKey = 12345
    constructor(name,age, address,email,password,adminKey,role){
        super(name,age,address)
        this.email= email
        this.password= password
        this.role = role
        this.adminKey= password
    }
   
}




const user1 = new Person("Nicolas", age = 40 )/*Instanciar= Crear un objeto con esa plantilla */
// console.log(Person.users)
// Person.createUser(user1)


const $loginbutton = document.createElement('button')
$loginbutton.textContent = `Register`
document.body.appendChild($loginbutton)
$loginbutton.setAttribute('id','loginButton')

$loginbutton.addEventListener('click', (e)=> {
    Person.createUser(user1);
    console.log(Person.users)
})

