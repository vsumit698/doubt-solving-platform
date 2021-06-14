import React from 'react';
import {withRouter} from 'react-router-dom';

class PathNotFound extends React.Component{

  componentDidMount(){
    this.props.history.push('/signup');
  }

  render(){
  
    return (
      <div>
        PATH NOT FOUND
      </div>
    );
  }
}

export default withRouter(PathNotFound);