class Persona {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
  
    static createUser(username, password) {
        return new Persona(username, password);
    }
  
    register() {
        localStorage.setItem(this.username, JSON.stringify(this));
    }
  }
  
  class RegularUser extends Persona {
    constructor(username, password) {
        super(username, password);
    }
  
    register() {
        super.register();
    }
  
    createReservation(details) {
        let reservations = JSON.parse(localStorage.getItem(`${this.username}_reservations`)) || [];
        reservations.push(details);
        localStorage.setItem(`${this.username}_reservations`, JSON.stringify(reservations));
    }
  
    getReservations() {
        return JSON.parse(localStorage.getItem(`${this.username}_reservations`)) || [];
    }
  }
  
  class Administrador extends Persona {
    constructor(username, password) {
        super(username, password);
    }
  
    createReservationForUser(username, details) {
        let reservations = JSON.parse(localStorage.getItem(`${username}_reservations`)) || [];
        reservations.push(details);
        localStorage.setItem(`${username}_reservations`, JSON.stringify(reservations));
    }
  
    deleteReservation(username, index) {
        let reservations = JSON.parse(localStorage.getItem(`${username}_reservations`)) || [];
        reservations.splice(index, 1);
        localStorage.setItem(`${username}_reservations`, JSON.stringify(reservations));
    }
  
    updateReservation(username, index, details) {
         let reservations = JSON.parse(localStorage.getItem(`${username}_reservations`)) || [];
        reservations[index] = details;
        localStorage.setItem(`${username}_reservations`, JSON.stringify(reservations));
    }
  }
  
  class Auth {
    static login(username, password) {
        const userData = JSON.parse(localStorage.getItem(username));
        if (userData && userData.password === password) {
            localStorage.setItem('token', username);
            return userData;
        } else {
            throw new Error('User or password');
        }
    }
  
    static logout() {
        localStorage.removeItem('token');
    }
  
    static getCurrentUser() {
        const username = localStorage.getItem('token');
        return JSON.parse(localStorage.getItem(username));
    }
  
    static isAdmin() {
        const currentUser = this.getCurrentUser();
        return currentUser && currentUser instanceof Administrador;
    }
  }

  
  document.addEventListener("DOMContentLoaded", () =>{
  document.getElementById('login').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
        Auth.login(username, password);
        showActions();
    } catch (error) {
        alert(error.message);
    }
  });
  
  document.getElementById('register').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const user = new RegularUser(username, password);
    user.register();
    alert('Usuario registrado con éxito');
  });
  
  document.getElementById('create-reservation').addEventListener('click', () => {
    document.getElementById('reservation-form').style.display = 'block';
  });
  
  document.getElementById('save-reservation').addEventListener('click', () => {
    const details = document.getElementById('booking-details').value;
    const currentUser = Auth.getCurrentUser();
  
    if (currentUser instanceof RegularUser) {
        currentUser.createReservation(details);
    } else if (currentUser instanceof Administrador) {
        const username = prompt('Ingrese el nombre de usuario del pasajero:');
        currentUser.createReservationForUser(username, details);
    }
  
    alert('Reserva creada con éxito');
    document.getElementById('reservation-form').style.display = 'none';
  });
  
  document.getElementById('view-reservations').addEventListener('click', () => {
    const currentUser = Auth.getCurrentUser();
    let reservations = [];
  
    if (currentUser instanceof RegularUser) {
        reservations = currentUser.getReservations();
    } else if (currentUser instanceof Administrador) {
        const username = prompt('Ingrese el nombre de usuario del pasajero:');
        reservations = JSON.parse(localStorage.getItem(`${username}_reservations`)) || [];
    }
  
    const reservationList = document.getElementById('reservation-list');
    reservationList.innerHTML = '';
    reservations.forEach((reservation, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = reservation;
  
        if (Auth.isAdmin()) {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => {
                currentUser.deleteReservation(username, index);
                alert('Reserva eliminada con éxito');
                viewReservations();
            });
  
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Actualizar';
            updateButton.addEventListener('click', () => {
                const newDetails = prompt('Ingrese los nuevos detalles de la reserva:');
                currentUser.updateReservation(username, index, newDetails);
                alert('Reserva actualizada con éxito');
                viewReservations();
            });
  
            listItem.appendChild(deleteButton);
            listItem.appendChild(updateButton);
        }
  
        reservationList.appendChild(listItem);
    });
  
    document.getElementById('reservations').style.display = 'block';
  });
  
  document.getElementById('logout').addEventListener('click', () => {
    Auth.logout();
    hideActions();
  });
  
  const showActions = () => {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('actions').style.display = 'block';
  };
  
  const hideActions = () => {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('actions').style.display = 'none';
    document.getElementById('reservation-form').style.display = 'none';
    document.getElementById('reservations').style.display = 'none';
  };

})


// class Person{
//         static users = []
//         static reservations = []
//         constructor(name, age,email, address){
//             this.name = name
//             this.email = email
//             this.address = address
//             this.age = age
//         }

//         static createUser(newUser){ /*No tuve que instanciar a Person (new Person para acceder al metodo createUser) */
//             Person.users.push(newUser)
//         }

//         static logIn(email,password){ /*No tuve que instanciar a Person (new Person para acceder al metodo Login) */
//             const user = Person.users.find(user => user.email === email && user.password === password);
//             return user
//         }

//         static booking(user,date,destination){
//            const booking = {
//             user : user,
//             date : date,
//             destination : destination
//            }
//            Person.reservations.push(booking);
//            return booking
//         }
// }

// class RegularUser extends Person{
//         constructor(name,age,email,address,password,role){
//             super(name,age,address)
//             this.email= email
//             this.password= password
//             this.role = role
//     }
// }

// class Admin extends Person{
//     static #adminKey = 12345
//     constructor(name,age, address,email,password,adminKey,role){
//         super(name,age,address)
//         this.email= email
//         this.password= password
//         this.role = role
//         this.adminKey= password
//     }
   
// }




// const user1 = new Person("Nicolas", age = 40 )/*Instanciar= Crear un objeto con esa plantilla */
// // console.log(Person.users)
// // Person.createUser(user1)


// const $loginbutton = document.createElement('button')
// $loginbutton.textContent = `Register`
// document.body.appendChild($loginbutton)
// $loginbutton.setAttribute('id','loginButton')

// $loginbutton.addEventListener('click', (e)=> {
//     Person.createUser(user1);
//     console.log(Person.users)
// })