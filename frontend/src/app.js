import React, { Component } from 'react';
import RegisterForm from './js/components/register.js';
import Users from './js/components/users.js';
import './styles/app.less';
import {Route,NavLink,Switch} from 'react-router-dom';

class App extends Component {
    state = {
      users:[]
    }

    registerUserHandler(newUser){
      newUser.key = this.state.users.length;
      var allUsers = this.state.users.slice();
      allUsers.push(newUser);
      console.log(allUsers);
      this.setState({users : allUsers});
    }
    
    render () {
        return (
            <div className="app">
                <header>
                    <nav className="navigation">
                        <ul>
                            <li><NavLink to="/" exact activeStyle={{color : 'red',textDecoration:'underline'}}>Register Form</NavLink></li>
                            <li><NavLink to={{
                                pathname:'/view-users'
                            }}activeStyle={{color : 'red',textDecoration:'underline'}}>All Users</NavLink></li>
                        </ul>
                    </nav>
                </header>
                
                
                <Switch>
                  <Route  path='/'  exact render={()=>{return <RegisterForm registerUser={(value)=>{this.registerUserHandler(value.user)}}></RegisterForm>}}></Route>
                      
                  <Route  path='/view-users' exact render={()=>{return <Users users={this.state.users}></Users>}}></Route>
                  
                  <Route render={()=>{return <h1>NOT FOUND</h1>}}></Route>
                </Switch>

                
            </div>
        );
    }
} 

export default App;