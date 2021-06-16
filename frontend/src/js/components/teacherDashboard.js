// importing components
import React from 'react';

// importing libraries
import {getTeacherDashboardData} from '../utilities/apiHandling.js';
import { notification} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

// importing styles
import '../../styles/teacherDashboard.css';

class TeacherDashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            dashboard_data_loading : false,
            dashboard_details : null
        };
    }

    componentDidMount(){

        this.setState({dashboard_data_loading : true});
        getTeacherDashboardData().then((response)=>{

            this.setState({dashboard_data_loading : false});
            if(response.status === 'unauthorized'){
                // logging out user because jwt token expiration time passed
                this.props.handleUserLogout();
                return;
            }

            if(response.status === 'success'){
                
                this.setState({dashboard_details : response.dashboard_details});
                
            }else{
                notification.warn({message : 'Failed to Load Teacher Dashboard Data'});
            }

        }).catch((err)=>{
            this.setState({dashboard_data_loading : false});
            notification.error({message : err});
        });
    }

    render(){
    
        return (
            <div className="teacher-dashboard-container">

                <div className="header-wrapper">
                    <div className="component-header local-header">
                        <span>Dashboard&ensp;&ensp;</span>
                        {(()=>{
                            if(this.state.dashboard_data_loading){
                                return <span><LoadingOutlined/></span>;
                            }
                        })()}
                    </div>
                    
                </div>

                <div className="doubt-dashboard-container">
                    <div className="doubt-dashboard-wrapper">
                        <div className="data-box"></div>
                        <div className="data-box"></div>
                        <div className="data-box"></div>
                        <div className="data-box"></div>
                    </div>
                </div>

                <div className="ta-dashboard-container">

                    <div className="header-wrapper">

                        <div className="component-header">
                            <span>TA's Report</span>
                        </div>

                        <div className="ta-list-wrapper">

                            <div className="ta-summary-data">ta detaiks 1</div>
                            <div className="ta-summary-data">ta detaiks 1</div>
                            <div className="ta-summary-data">ta detaiks 1</div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default withRouter(TeacherDashboard);