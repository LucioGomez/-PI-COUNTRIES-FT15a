import './App.css';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import LandinPage from './components/Landinpage.jsx'
import Home from './components/Home.jsx'
import CreateActivity from './components/CreateActivity.jsx'
import Detail from './components/Detail.jsx'
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path ='/' component={LandinPage} /> 
      <Route exact path='/home' component={Home}/>
      <Route exact path='/activity' component={CreateActivity}/>
      <Route exact path ='/home/:id' component={Detail}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
