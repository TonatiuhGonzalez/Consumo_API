import './App.css';
import axios from 'axios'
import 'bulma/css/bulma.min.css'
import { Component } from 'react';

const api = axios.create({
  baseURL: "http://localhost:3001/api/notes"
})

class App extends Component{
  state={
    courses: []
  }

  constructor(){
    super();
    this.getNotes()
  } 

  getNotes = async () => {
    let data = await api.get('/').then(({data})=>data)
    this.setState({courses: data})
  }

  addNote = async () =>{
    const nTitulo = document.querySelector(".nTitulo")
    const nBody = document.querySelector(".nBody")
    let content = {title: nTitulo.value, body:nBody.value}
    await api.post('/', content)
    this.getNotes()    
  }

  deleteNote = async (id) => {
    await api.delete(`/${id}`)
    this.getNotes()
  }

  render (){
    return (
      <div class ="column is-centered">   

        <div>
          <h1 class = "title">App</h1>
          <br/>
        </div>

        <form onSubmit={this.addNote}>
          <table class="table is-bordered">
            <thead class = "thead">
              <tr>
                <td colSpan={3}>
                  <h1 class = "title">Agregar o modificar</h1>
                </td>
              </tr>
              <th>
                Título
              </th>
              <th>
                Cuerpo
              </th>
              <th>
                Acción
              </th>
            </thead>
            <tbody>
              <tr>
                <td><input type = "text" placeholder="Título" class="nTitulo"></input></td>
                <td><input type = "text" placeholder="Body" class="nBody"></input></td>
                <td><button class="button is-primary" type='submit'>Agregar</button></td>
              </tr>
            </tbody>
          </table>
        </form>
        <br/>
        <table class = "table is-bordered is-hoverable">
          <thead class = "thead">
            <tr>
              <td colSpan={5}>
                <h1 class="title">Notas almacenadas</h1>
              </td>
            </tr>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Cuerpo</th>
              <th colSpan={2}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map(nota=>{
              return(
                <tr>
                  <td>{nota.id}</td>
                  <td>{nota.title}</td>
                  <td>{nota.body}</td>
                  <td>
                    <button class="button is-info">Editar</button>
                  </td>
                  <td>
                    <button class="button is-danger" onClick={()=>{this.deleteNote(nota.id)}}>Eliminar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
