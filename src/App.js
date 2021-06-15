import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Login from "./Login";
import Dashboard from "./Dashboard";
import Error from "./Error";
import New from "./New";

function App() {

    return (

        <div className="App">
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/dashboard' component={New}/>
                <Route component={Error} />
            </Switch>
        </div>
    );
}

export default App;
