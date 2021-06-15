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

    handleTaActionOnDoubt(){

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
                                    <div className="ta-solve-doubt-answer">
                                        <div>Answer</div>
                                        <div className="ta-solve-doubt-action-container">
                                            <Input.TextArea rows="3" value={this.state.resolve_content} onChange={(e)=>{this.updateValue(e.target.value)}}/>
                                            <Button className="resolve-btn" type="primary" onClick={()=>{this.handleTaActionOnDoubt('resolve')}}>Answer</Button>
                                            <Button  className="accept-btn" type="dashed" onClick={()=>{this.handleTaActionOnDoubt('escalate')}}>Escalate</Button>
                                        </div>
                                        
                                    </div>
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