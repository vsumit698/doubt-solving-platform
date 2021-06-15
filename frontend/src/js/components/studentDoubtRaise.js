import React from 'react';

// importing libraries
import { Table, Button,Input,notification} from 'antd';
import {withRouter} from 'react-router-dom';
import {raiseDoubt} from '../utilities/apiHandling'

// importing styles
import '../../styles/studentDoubtRaise.css';

class StudentDoubtRaise extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title : '',
            description : '',
            doubt_creation_status : false
        };
    }

    raiseDoubtHandler(){
        let doubtObj = {...this.state,user_id : this.props.userId};
        this.setState({doubt_creation_status : true});
        raiseDoubt(doubtObj).then((response)=>{

            if(response.status === 'unauthorized'){
                this.props.handleUserLogout();
                return;
            }

            if(response.status === 'success'){

                notification.success({message : response.message});

            }else{

                notification.warn({message : response.message});

            }
            this.setState({doubt_creation_status : false});
        }).catch((err)=>{
            notification.error({message : err});
            this.setState({doubt_creation_status : false});
        });
    }

    updateValues(inputKey,value){
        let updateObj = {};
        updateObj[inputKey] = value;
        this.setState(updateObj);
    }

    render(){
    
        return (
            <div className="raise-doubt-container">
                <div className="raise-doubt-wrapper">
                    <div className="component-header">Raise Doubt</div>
                    <div className="raise-doubt-form">
                        <div>Title</div>
                        <Input onChange={(event)=>{this.updateValues('title',event.target.value)}} value={this.state.title}/>
                        <div>Description</div>
                        <Input onChange={(event)=>{this.updateValues('description',event.target.value)}} value={this.state.description}/>
                        <div className="ask-doubt-btn-wrapper">
                            <Button type="primary" loading={this.state.doubt_creation_status} className="ask-doubt-btn" onClick={()=>{this.raiseDoubtHandler();}}>Ask Doubt</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(StudentDoubtRaise);