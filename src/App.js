import { Fragment , useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import UserTable from './Componentes/userTable'
import AddUserForm from './Componentes/AddUserForm'
import EditUserForm from './Componentes/EditUserForm'


function App() {

  const usersData = [
    { id: uuidv4(), name: 'Tania', username: 'floppydiskette' },
    { id: uuidv4(), name: 'Craig', username: 'siliconeidolon' },
    { id: uuidv4(), name: 'Ben', username: 'benisphere' },
  ]

  const [users, setUsers] = useState(usersData)

  //Variables para cambio de edicion
  const [editing, setEditing] = useState(false)

  //variables para actualizar un usuario
  const [ currentUser, setCurrentUser ] = useState({
    id: null , name: '', username: '' 
  })
  //funcion que cambia el estado de edicion y muestra usuario a editar
  const editRow = (user) => {
    setEditing(true)
  
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  //Añadir usuarios
  const addUser = (user) => {
    user.id = uuidv4()
    setUsers([...users, user])
    console.log(users)
  }
  //Eliminar usuarios
  const deleteUser = (id)=>{
    console.log(id)
    setUsers(users.filter((user) => user.id !== id))
  }

  //modificar usuarios
  const updateUser = (id, updatedUser) => {
    setEditing(false)
  
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {
            editing?
            
            <div>
              <h2>Edit user</h2>
              <EditUserForm currentUser = {currentUser} updateUser={updateUser} />

            </div>

            : <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser}  />

            </div>
          }

        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable 
            users = {users}  
            deleteUser={deleteUser}
            setEditing = {setEditing}
            
            editRow = {editRow}
          />

        </div>
      </div>
    </div>
  );
}

export default App;
