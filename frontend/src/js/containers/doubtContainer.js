// importing components
import React from 'react';

// importing libraries
import { Form, Input, Button ,Radio,Tag} from 'antd';
import moment from 'moment-timezone';
import {withRouter} from 'react-router-dom';

// import styles 
import '../../styles/doubtContainer.css'

const timeZone = 'Asia/Kolkata';

var DoubtContainer = (props) => {

  let commentsArray = [],doubtAnswer='',commentCount=0;

  for(let commentObj of props.doubtObj.comments){
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
          if(props.doubtObj.resolve_timestamp){
            return <div>
              <Tag color="#2db7f5" className="resolve-status">Resolved</Tag>
            </div>;
          }
        })()}
        <div className="doubt-title">
          {props.doubtObj.title}
        </div>
        <div className="doubt-description font-size-15">
          {props.doubtObj.description}
        </div>
        <div className="doubt-creator-wrapper">
          <div className="doubt-creator">{`Asked By : ${props.doubtObj.asked_student_name} on ${moment.unix(props.doubtObj.created_timestamp).tz(timeZone).format('DD MMMM YYYY, h:mm a')}`}</div>
        </div>

        {(()=>{
          if(props.doubtObj.resolve_timestamp || true){
            return (
            <div className="comments-block resolved-block">
              {doubtAnswer}
              <div>{`Answered By : ${props.doubtObj.solved_ta_name} on ${moment.unix(props.doubtObj.resolve_timestamp).tz(timeZone).format('DD MMMM YYYY, h:mm a')}`}</div>
            </div>);
          }
        })()}

        <div className="comments-container">
          <div className="comments-count font-weight-500">{`${props.doubtObj.comments.length} ${props.doubtObj.comments.length>1?'comments':'comment'}`}</div>
          {commentsArray}
          {(()=>{
            if(props.addCommentHandler){
              return (
                <div className="comment-form">
                  <Input/>
                  <Button type="primary">Comment</Button>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default withRouter(DoubtContainer);