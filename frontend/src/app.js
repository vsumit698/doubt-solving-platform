// importing components
import React, { Component } from 'react';
import RegisterUser from './js/components/registerUser.js';
import LoginUser from './js/components/loginUser.js';
import StudentDoubtRaise from './js/components/studentDoubtRaise.js';
import StudentDoubtList from './js/components/studentDoubtList.js';
import TaDoubtList from './js/components/taDoubtList.js';
import TaSolveDoubt from './js/components/taSolveDoubt.js';
import TeacherDashboard from './js/components/teacherDashboard.js';
import PathNotFound from './js/components/pathNotFound';

// importing libraries
import {} from './js/utilities/apiHandling.js'
import {Route,NavLink,Switch} from 'react-router-dom';
import { Form, Input, InputNumber, Button ,Radio,Select} from 'antd';

// importing styles
import './styles/app.css';

class App extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            user_type : '',
        }
    }

    handleUserSignup(newUser){
      console.log('new user ->',newUser);
    }

    handleUserLogin(user){
        console.log('user ->',user);
    }
    
    render () {
        let activeStyleObj = {color : 'red',textDecoration:'underline'};
        return (
            <div className="app">

                <div className="navigation">
                    <ul>
                        <li className="app-header">Doubt Solving Platform</li>
                        <li><NavLink to="/signup" exact activeStyle={activeStyleObj}>Sign Up</NavLink></li>
                        <li><NavLink to="/login" exact activeStyle={activeStyleObj}>Login</NavLink></li>
                    </ul>
                    <Button className="logout-btn" type="primary">Logout</Button>
                </div>
                
                
                <Switch>
                  <Route  path='/signup'  exact render={()=>{return <RegisterUser handleUserSignup={(value)=>{this.handleUserSignup(value.user)}} />}}></Route>
                      
                  <Route  path='/login' exact render={()=>{return <LoginUser handleUserLogin={(value)=>{this.handleUserLogin(value.user)}}/>}}></Route>

                  <Route  path='/student/home' exact render={()=>{return <StudentDoubtList />}}></Route>

                  <Route  path='/student/raise-doubt' exact render={()=>{return <StudentDoubtRaise />}}></Route>

                  <Route  path='/ta/home' exact render={()=>{return <TaDoubtList />}}></Route>

                  <Route  path='/ta/resolve-doubt' exact render={()=>{return <TaSolveDoubt />}}></Route>

                  <Route  path='/teacher/home' exact render={()=>{return <TeacherDashboard />}}></Route>
                  
                  <Route path='/' render={()=>{return <PathNotFound/> }}></Route>
                </Switch>

                
            </div>
        );
    }
} 

export default App;