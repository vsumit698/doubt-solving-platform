import React from 'react';
import {withRouter} from 'react-router-dom';

class PathNotFound extends React.Component{

  render(){
  
    return (
      <div>
        PATH NOT FOUND
      </div>
    );
  }
}

export default withRouter(PathNotFound);