// importing components
import React from 'react';
import DoubtComponent from './doubtComponent.js';

// importing libraries
import {getDoubtList, addCommentOnDoubt} from '../utilities/apiHandling.js'
import {LoadingOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

import '../../styles/studentDoubtList.css';
import { notification } from 'antd';

class StudentDoubtList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            doubt_list : null,
            doubt_list_loading : false
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
                for(let doubtObj of response.doubt_list){
                    doubtObj.comment_creation_status = false;
                }
                this.setState({doubt_list : response.doubt_list});
            }else{
                notification.warn({message : 'Failed to Load Doubts'});
            }

        }).catch((err)=>{
            this.setState({doubt_list_loading : false});
            notification.error({message : err});
        });
    }

    setCommentCreationStatus(doubtListId,status){
        // setting comment_creation status to true
        this.setState((prevState)=>{
            let newDoubtList = [...prevState.doubt_list];
            newDoubtList[doubtListId] = {...newDoubtList[doubtListId]};
            newDoubtList[doubtListId].comment_creation_status = status;
            return {doubt_list : newDoubtList};
        });
        
    }

    addCommentHandler(doubtListId, messageContent){
        
        this.setCommentCreationStatus(doubtListId,true);
        addCommentOnDoubt(this.state.doubt_list[doubtListId]._id,this.props.userId,messageContent).then((response)=>{

            if(response.status === 'unauthorized'){
                this.props.handleUserLogout();
                return;
            }

            if(response.status === 'success'){

                notification.success({message : response.message});
                this.setState((prevState)=>{
                    let newDoubtList = [...prevState.doubt_list];
                    let doubtId = 0;
                    for(let doubtObj of newDoubtList){
                        if(doubtObj._id === response.doubt_detail._id){

                            newDoubtList[doubtId] = response.doubt_detail;
                            newDoubtList[doubtId].comment_creation_status = false;
                            return {doubt_list : newDoubtList};

                        }
                        doubtId++;
                    }
                });

            }else{

                notification.warn({message : response.message});
                this.setCommentCreationStatus(doubtListId,false);

            }
            
        }).catch((err)=>{
            notification.error({message : err});
            this.setCommentCreationStatus(doubtListId,false);
        });

    }

    render(){
        let doubtCount = this.state.doubt_list ? this.state.doubt_list.length : 0;
        return (
            <div className="student-doubt-list">
                <div className="component-header local-header">
                    <span>Home&ensp;&ensp;</span>
                    {(()=>{
                        if(this.state.doubt_list_loading){
                            return <span><LoadingOutlined/></span>;
                        }
                    })()}
                    <div className="light-font-weight">{`${doubtCount} Doubt${doubtCount>1?'s':''}`}</div>
                </div>
                {(()=>{
                    if(this.state.doubt_list){
                        let doubtElementsArray = [],doubtListId=0;
                        for(let doubtObj of this.state.doubt_list){

                            doubtElementsArray.push(
                                <DoubtComponent key={doubtObj._id} 
                                    doubtObj={{...doubtObj}} 
                                    addCommentHandler={(doubtListId, messageContent)=>{this.addCommentHandler(doubtListId, messageContent);}}
                                    doubtListId={doubtListId} 
                                />
                            );
                            doubtListId++;
                        }
                        return doubtElementsArray;
                    }
                })()}
            </div>
        )
    }
}

export default withRouter(StudentDoubtList);