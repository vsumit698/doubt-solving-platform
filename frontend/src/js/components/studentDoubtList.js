// importing components
import React from 'react';
import DoubtContainer from '../containers/doubtContainer';

// importing libraries
import {getDoubtList} from '../utilities/apiHandling.js'
import {LoadingOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

import '../../styles/studentDoubtList.css';
import { notification } from 'antd';

class StudentDoubtList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            doubt_list : null,
            doubt_list_loading : false,
            comment_status : false
        };
    }

    componentDidMount(){
        this.setState({doubt_list_loading : true});
        getDoubtList().then((response)=>{
            this.setState({doubt_list_loading : false});
            if(response.status === 'unauthorized'){
                // logging out user because jwt token expiration time passed
                this.props.handleUserLogout();
                return;
            }
            if(response.status === 'success'){
                this.setState({doubt_list : response.doubt_list});
            }else{
                notification.warn({message : 'Failed to Load Doubts'});
            }

        }).catch((err)=>{
            this.setState({doubt_list_loading : false});
            notification.error({message : err});
        });
    }

    addCommentHandler(){

    }

    render(){
    
        return (
            <div className="student-doubt-list">
                <div className="component-header local-header">
                    <span>Home&ensp;&ensp;</span>
                    {(()=>{
                        if(this.state.doubt_list_loading){
                            return <span><LoadingOutlined/></span>;
                        }
                    })()}
                    <div className="light-font-weight">45 doubts found</div>
                </div>
                {(()=>{
                    if(this.state.doubt_list){
                        let doubtElementsArray = [];
                        for(let doubtObj of this.state.doubt_list){
                            doubtElementsArray.push(
                                <DoubtContainer key={doubtObj._id} {...doubtObj} />
                            );
                        }
                        return doubtElementsArray;
                    }
                })()}
            </div>
        )
    }
}

export default withRouter(StudentDoubtList);