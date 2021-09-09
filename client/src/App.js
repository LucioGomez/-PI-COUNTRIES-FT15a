import './App.css';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import LandinPage from './components/Landinpage.jsx'
import Home from './components/Home.jsx'
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path ='/' component={LandinPage}/> 
      <Route path='/home' component={Home}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
