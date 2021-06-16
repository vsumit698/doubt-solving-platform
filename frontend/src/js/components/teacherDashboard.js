// importing components
import React from 'react';

// importing libraries
import {getTeacherDashboardData} from '../utilities/apiHandling.js';
import { notification} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

// importing styles
import '../../styles/teacherDashboard.css';

const doubtSummaryHeaders = {'doubts_asked' : 'Doubts Asked','doubts_resolved' : 'Doubts Resolved','doubts_escalated' : 'Doubts Escalated','avg_doubt_resolution_time' : 'Avg. Doubt Resolution Time'};

const taDoubtSummaryHeaders = {
    "doubt_accept_count": "Doubts Accepted",
    "doubt_resolve_count": "Doubts Resolved",
    "doubt_escalated_count": "Doubts Escalated",
    "avg_doubt_activity_time": "Avg. Doubt Activity Time"
}

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
        let dashboardDetails = this.state.dashboard_details;
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

                {(()=>{

                    if(dashboardDetails){
                     
                        return (
                            <div>
                                <div className="doubt-dashboard-container">
                                    <div className="doubt-dashboard-wrapper">

                                        {(()=>{
                                            
                                            let dataBox = [];
                                            for(let dataKey in doubtSummaryHeaders){
                                                let data = dashboardDetails[dataKey];
                                                if(dataKey === 'avg_doubt_resolution_time'){
                                                    data =  `${parseInt(data/60)} min.`;
                                                }
                                                dataBox.push(
                                                    <div className="data-box" key={dataKey}>
                                                        <div className="summary-data">{data}</div>
                                                        <div className="summary-header">{doubtSummaryHeaders[dataKey]}</div>
                                                    </div>
                                                );
                                            }
                                            return dataBox;
                                        })()}
                                        
                                    </div>
                                </div>

                                <div className="ta-dashboard-container">

                                    <div className="header-wrapper">

                                        <div className="component-header">
                                            <span>TA's Report</span>
                                        </div>

                                        <div className="ta-list-wrapper">

                                            {(()=>{
                                                let taSummaryElements = [];
                                                let id=0;
                                                for(let taObj of dashboardDetails.ta_summary_list){
                                                    taSummaryElements.push(
                                                        <div className="ta-summary-row" key={`${taObj.name}-${id}`}>
                                                            <div className="ta-name">{taObj.name}</div>
                                                            <div className="ta-summary-row-detail">
                                                                {(()=>{
                                                                    let taDoubtSummaryEle = [],data;

                                                                    for(let dataKey in taDoubtSummaryHeaders){
                                                                        data = taObj[dataKey];
                                                                        if(dataKey === 'avg_doubt_activity_time'){
                                                                            data =  `${parseInt(data/60)} min.`;
                                                                        }
                                                                        taDoubtSummaryEle.push(
                                                                            <div className="ta-summary-data" key={dataKey}>{`${taDoubtSummaryHeaders[dataKey]} : ${data}`}</div>
                                                                        );

                                                                    }

                                                                    return taDoubtSummaryEle;
                                                                })()}
                            
                                                            </div>
                                                        </div>
                                                    );
                                                    id++;
                                                }

                                                return taSummaryElements;
                                            })()}

                                        </div>

                                    </div>

                                </div>
                            </div>
                        );
                    }
                })()}

            </div>
        );
    }
}

export default withRouter(TeacherDashboard);