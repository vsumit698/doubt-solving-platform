import React from 'react';
import { Form, Input, Button ,Radio,Tag} from 'antd';
import {withRouter} from 'react-router-dom';

// import styles 
import '../../styles/doubtContainer.css'

var DoubtContainer = (props) => {

  return (
    <div className="sindle-doubt-container">
      <div className="doubt-wrapper">
        <div>
          <Tag color="#2db7f5" className="resolve-status">Resolved</Tag>
        </div>
        <div className="doubt-title">
          doubt title
        </div>
        <div className="doubt-description">
          doubt decription
        </div>
        <div className="doubt-creator-wrapper">
          <div className="doubt-creator">doubt creator</div>
        </div>

        <div className="comments-container">
          <div className="comments-count">56 Comments</div>
          
          <div className="comments-block">
            5454545454545454:989898
          </div>
          <div className="comments-block">
            5454545454545454:989898
          </div>

          <div className="comment-form">
            <Input/>
            <Button type="primary">Comment</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DoubtContainer);