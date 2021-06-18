// importing components
import React from 'react';
import DoubtComponent from './doubtComponent.js';

// importing libraries
import {taActionOnDoubt} from '../utilities/apiHandling.js';
import { notification,Button,Input } from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

// importing styles
import '../../styles/taSolveDoubt.css';

class TaSolveDoubt extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            resolve_content : '',
            doubt_escalate_status : false,
            doubt_resolve_status : false
        };
    }

    setActionStatus(action,status){
        if(action === 'resolve'){
            this.setState({doubt_resolve_status : status});
        }else if(action === 'escalate'){
            this.setState({doubt_resolve_status : status});
        } 
    }

    handleTaActionOnDoubt(action){
        console.log(action);
        let resolveContent = '';
        if(action === 'resolve'){
            resolveContent = this.state.resolve_content;
        }

        this.setActionStatus(action,true);

        taActionOnDoubt(this.props.currDoubt._id,this.props.userId,action,resolveContent).then((response)=>{

            this.setActionStatus(action,false);

            if(response.status === 'unauthorized'){
                this.props.handleUserLogout();
                return;
            }

            if(response.status === 'success'){

                notification.success({message : response.message});
                if(action === 'resolve'){
                    this.props.loadCurrDoubt(response.doubt_detail);
                }else if(action === 'escalate'){
                    this.props.escalateCurrDoubt(null);
                }

            }else{

                notification.warn({message : response.message});

            }
            
        }).catch((err)=>{
            notification.error({message : err});
            this.setActionStatus(action,false);
        });

    }

    updateValue(newValue){
        this.setState({resolve_content : newValue});
    }

    render(){
        
        return (
            <div className="ta-solve-doubt-container">

                {(()=>{
                    if(!this.props.currDoubt){
                        return <div className="no-curr-doubt">Accept Doubt Before Solve It</div>
                    }else{
                        return(
                            <React.Fragment>
                                <div className="header-wrapper">
                                    <div className="component-header local-header">
                                        <span>Solve Doubt</span>
                                    </div>  
                                </div>
                                <div className="ta-solve-doubt-wrapper">
                                    <div className="ta-solve-doubt-detail">
                                        <DoubtComponent
                                            doubtObj={{...this.props.currDoubt}} 
                                        />
                                    </div>
                                    {(()=>{
                                        let isDoubtResolved = this.props.currDoubt.resolve_timestamp>0?true:false;
                                        let isAnswerExist = this.state.resolve_content.length?true:false;

                                        return (
                                            <div className="ta-solve-doubt-answer">
                                                <div>Answer</div>
                                                <div className="ta-solve-doubt-action-container">
                                                    <Input.TextArea rows="3" disabled={isDoubtResolved} value={this.state.resolve_content} onChange={(e)=>{this.updateValue(e.target.value)}}/>
                                                    <Button disabled={!isAnswerExist || isDoubtResolved} className="resolve-btn" type="primary" onClick={()=>{this.handleTaActionOnDoubt('resolve')}} loading={this.state.doubt_resolve_status}>Answer</Button>
                                                    <Button disabled={isDoubtResolved} className="accept-btn" type="dashed" onClick={()=>{this.handleTaActionOnDoubt('escalate')}} loading={this.state.doubt_escalate_status}>Escalate</Button>
                                                </div>
                                                
                                            </div>
                                        );
                                    })()}
                                </div>
                            </React.Fragment>
                        );
                    }
                })()}

            </div>
        )
    }
}

export default withRouter(TaSolveDoubt);