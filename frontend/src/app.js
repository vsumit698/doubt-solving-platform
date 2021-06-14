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
import {Route,NavLink,Switch, withRouter} from 'react-router-dom';
import { Button, notification} from 'antd';

// importing styles
import './styles/app.css';

notification.config({
    placement: 'bottomLeft'
});

const activeStyleObj = {color : 'red',textDecoration:'underline'};

const userTypeToNavItems = {
    'student' : [
        <li key={'route-1'}><NavLink to="/student/home" exact activeStyle={activeStyleObj}>Home</NavLink></li>, 
        <li key={'route-2'}><NavLink to="/student/raise-doubt" exact activeStyle={activeStyleObj}>Raise Doubt</NavLink></li>
    ],'ta' : [
        <li key={'route-1'}><NavLink to="/ta/home" exact activeStyle={activeStyleObj}>Home</NavLink></li>, 
        <li key={'route-2'}><NavLink to="/ta/resolve-doubt" exact activeStyle={activeStyleObj}>Solve Doubt</NavLink></li>
    ], 'teacher' : [
        <li key={'route-1'}><NavLink to="/teacher/home" exact activeStyle={activeStyleObj}>Home</NavLink></li>
    ]
};

class App extends Component {
    
    constructor(props){
        super(props);

        let userType = localStorage.getItem('dsp_user_type');
        if(!userType) userType = '';
        let hasAccessToken = localStorage.getItem('dsp_access_token');
        hasAccessToken = hasAccessToken ? true : false;

        this.state = {
            user_type : userType,
            has_access_token : hasAccessToken
        }
    }

    componentDidMount(){

        if(this.state.user_type && this.state.has_access_token){
            
            if(this.state.user_type==='student'){
                this.props.history.push('/student/home');
            }else if(this.state.user_type==='ta'){
                this.props.history.push('/ta/home');
            }else if(this.state.user_type==='teacher'){
                this.props.history.push('/teacher/home');
            }else{
                console.log(`user type ${this.state.user_type} is not valid`);
                notification.warn({message : `user type ${this.state.user_type} is not valid`});
            }

        }else{
            this.props.history.push('/signup');
        }

    }

    handleUserSignup(newUser){
      console.log('new user ->',newUser);
    }

    handleUserLogin(user){
        console.log('user ->',user);
    }
    

    handleUserLogout(){

    }

    render () {
        let logoutButton = <Button className="logout-btn" type="primary">Logout</Button>;
        if(!this.state.has_access_token) logoutButton = null;
        return (
            <div className="app">

                <div className="navigation">
                    <ul>
                        <li className="app-header">Doubt Solving Platform</li>

                        {(()=>{

                            if(userTypeToNavItems.hasOwnProperty(this.state.user_type)){
                                return userTypeToNavItems[this.state.user_type];
                            }

                            return [
                            <li key={'route-1'}><NavLink to="/signup" exact activeStyle={activeStyleObj}>Sign Up</NavLink></li>,
                            <li key={'route-2'}><NavLink to="/login" exact activeStyle={activeStyleObj}>Login</NavLink></li>
                            ];

                        })()}

                    </ul>
                    {logoutButton}
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

export default withRouter(App);