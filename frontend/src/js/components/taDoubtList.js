// importing components
import React from 'react';

// importing libraries
import {getDoubtList, taActionOnDoubt} from '../utilities/apiHandling.js';
import { notification,Button } from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

// importing styles
import '../../styles/taDoubtList.css';


class TaDoubtList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            unresolve_doubt_list : null,
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
                let unresolveDoubtList = [];
                for(let doubtObj of response.doubt_list){
                    if(!doubtObj.resolve_timestamp && doubtObj.recent_ta_id===''){
                        doubtObj.doubt_accept_status = false;
                        unresolveDoubtList.push(doubtObj);
                    }else if(!doubtObj.resolve_timestamp && doubtObj.recent_ta_id===this.props.userId){
                        this.props.loadCurrDoubt(doubtObj,false);
                    }
                }
                this.setState({unresolve_doubt_list : unresolveDoubtList});
            }else{
                notification.warn({message : 'Failed to Load Doubts'});
            }

        }).catch((err)=>{
            this.setState({doubt_list_loading : false});
            notification.error({message : err});
        });
    }

    setDoubtAcceptStatus(doubtListId,status){
        // setting comment_creation status to true
        this.setState((prevState)=>{
            let newDoubtList = [...prevState.unresolve_doubt_list];
            newDoubtList[doubtListId] = {...newDoubtList[doubtListId]};
            newDoubtList[doubtListId].doubt_accept_status = status;
            return {unresolve_doubt_list : newDoubtList};
        });
        
    }

    doubtAcceptHandler(doubtListId){
        console.log(doubtListId);
        if(this.props.currDoubt){
            notification.warn({message : 'TA can only Select One Doubt At a Time'});
        }
        this.setDoubtAcceptStatus(doubtListId,true);
        taActionOnDoubt(this.state.unresolve_doubt_list[doubtListId]._id,this.props.userId,'accept').then((response)=>{

            if(response.status === 'unauthorized'){
                this.props.handleUserLogout();
                return;
            }

            if(response.status === 'success'){

                notification.success({message : response.message});
                this.setState((prevState)=>{
                    let newDoubtList = [...prevState.unresolve_doubt_list];
                    let doubtId = 0;
                    for(let doubtObj of newDoubtList){
                        if(doubtObj._id === response.doubt_detail._id){

                            newDoubtList[doubtId] = response.doubt_detail;
                            newDoubtList[doubtId].doubt_accept_status = false;

                            // loading current doubt details to app component
                            this.props.loadCurrDoubt(response.doubt_detail,true);

                            return {unresolve_doubt_list : newDoubtList};

                        }
                        doubtId++;
                    }
                });

            }else{

                notification.warn({message : response.message});
                this.setDoubtAcceptStatus(doubtListId,false);

            }
            
        }).catch((err)=>{
            notification.error({message : err});
            this.setDoubtAcceptStatus(doubtListId,false);
        });
        
    }

    render(){

        let unresolveDoubtListElements = [];

        if(Array.isArray(this.state.unresolve_doubt_list)){
            let index=0;
            for(let doubtObj of this.state.unresolve_doubt_list){
                let currIndex=index;
                unresolveDoubtListElements.push(
                    <div className="ta-doubt" key={doubtObj._id}>
                        <div>{doubtObj.title}</div>
                        <Button type="dashed" disabled={this.props.currDoubt?true:false} className="accept-btn" onClick={()=>{this.doubtAcceptHandler(currIndex);}} loading={doubtObj.doubt_accept_status}>Accept</Button>
                    </div>
                );
                index++;
            }
        }
    
        return (
            <div className="ta-doubt-list-container">

                <div className="header-wrapper">
                    <div className="component-header local-header">
                    <span>Solve Doubts List&ensp;&ensp;</span>
                    {(()=>{
                        if(this.state.doubt_list_loading){
                            return <span><LoadingOutlined/></span>;
                        }
                    })()}
                    </div>
                    
                </div>

                <div className="ta-doubt-list-wrapper">
                    
                    {unresolveDoubtListElements}

                </div>
            </div>
        )
    }
}

export default withRouter(TaDoubtList);