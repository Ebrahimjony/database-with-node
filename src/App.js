
import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])
  
  const handelAddForm = event => {
    event.preventDefault();
    const name= event.target.name.value;
    const email= event.target.email.value;
    console.log(name,email);

    const user= {name,email};

   /*post service*/ 
  fetch('http://localhost:5000/user',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },

    body: JSON.stringify(user)

  })
    .then(res=>res.json())
    .then(data=>{
      const newUsers=[...users,data]
      setUsers(newUsers);
      console.log(user)
    })

  }


  return (
    <div className="App">
      <h1>My Own Data:{users.length} </h1>

        <form onSubmit={handelAddForm}>
          <input type="text" name="name"placeholder='name' id="" required/>
          <input type="email" name="email"placeholder='email' id="" required/>
          <input type="submit" value="Add user" />
        </form>

      <ul>
        {
          users.map(user =><li key={user.id}>id:{user.id} Name: {user.name} email:{user.email}</li>
          )
        }
      </ul>

    </div>
  )
}

export default App;