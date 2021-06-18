// importing components
import React from 'react';

// importing libraries
import { Form, Input, Button ,Radio,Tag} from 'antd';
import moment from 'moment-timezone';
import {withRouter} from 'react-router-dom';

// import styles 
import '../../styles/doubtComponent.css'

const timeZone = 'Asia/Kolkata';

class DoubtComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {comment_data : ''};
  }

  updateComment(newValue){
    this.setState({comment_data : newValue});
  }

  render(){
  
    let commentsArray = [],doubtAnswer='',commentCount=0;

    for(let commentObj of this.props.doubtObj.comments){
      if(commentObj.user_type === 'student'){
        
        commentsArray.push(
          <div className="comments-block" key={`${commentObj.user_id}-${commentCount}`}>
            {`${commentObj.user_name} : ${commentObj.content}`}
          </div>
        );
        commentCount++;
      }else if(commentObj.user_type === 'ta'){
        doubtAnswer = <div className="font-weight-700">{`Answer : ${commentObj.content} `}</div>;
      }
    }
  
    return (
      <div className="sindle-doubt-container">
        <div className="doubt-wrapper">
          {(()=>{
            if(this.props.doubtObj.resolve_timestamp){
              return <div>
                <Tag color="#2db7f5" className="resolve-status">Resolved</Tag>
              </div>;
            }
          })()}
          <div className="doubt-title">
            {this.props.doubtObj.title}
          </div>
          <div className="doubt-description font-size-15">
            {this.props.doubtObj.description}
          </div>
          <div className="doubt-creator-wrapper">
            <div className="doubt-creator">{`Asked By : ${this.props.doubtObj.asked_student_name} on ${moment.unix(this.props.doubtObj.created_timestamp).tz(timeZone).format('DD MMMM YYYY, h:mm a')}`}</div>
          </div>
  
          {(()=>{
            if(this.props.doubtObj.resolve_timestamp){
              return (
              <div className="comments-block resolved-block">
                {doubtAnswer}
                <div>{`Answered By : ${this.props.doubtObj.solved_ta_name} on ${moment.unix(this.props.doubtObj.resolve_timestamp).tz(timeZone).format('DD MMMM YYYY, h:mm a')}`}</div>
              </div>);
            }
          })()}
  
          <div className="comments-container">
            <div className="comments-count font-weight-500">{`${this.props.doubtObj.comments.length} ${this.props.doubtObj.comments.length>1?'comments':'comment'}`}</div>
            {commentsArray}
            {(()=>{
              if(this.props.addCommentHandler){
                return (
                <div className="comment-form">
                    <Input value={this.state.comment_data} onChange={(e)=>{this.updateComment(e.target.value);}} />
                    <Button type="primary" disabled={this.state.comment_data?false:true} loading={this.props.doubtObj.comment_creation_status} onClick={()=>{this.props.addCommentHandler(this.props.doubtListId, this.state.comment_data);}}>Comment</Button>
                </div>
                );
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DoubtComponent);