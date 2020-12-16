import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'


//Componentes
import Deshboard from './components/Deshboard';
import CreateUser from './components/CreateUser'
import Login from './components/Login'
import Navegation from './components/Navegation';
import Users from './components/users/Users'


function App() {
  return (
    //La sintaxis utilizada se llama JSX
    <div className="App">
      <Router>
        <Route path = "/" component = {Navegation}/>
        <Route exact path = "/login" component = {Login}/>
        <Route exact path = "/user" component = {Users}/>

      </Router>
    </div>
  );
}

export default App;
