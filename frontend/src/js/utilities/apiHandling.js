const apiBasePath = 'http://127.0.0.1:9000';

const registerUser = async (userObj)=>{
  try{

    let response = await fetch(`${apiBasePath}/doubt-solving/api/v1/user/register`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name : userObj.name,
        email_id : userObj.email_id,
        password : userObj.password,
        user_type : userObj.user_type
      })
    });

    let responseJson = await response.json();
    return responseJson;

  }catch(error){
    throw new Error(error);
  }
}

const loginUser = async(userObj)=>{
  try{

    let response = await fetch(`${apiBasePath}/doubt-solving/api/v1/user/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email_id : userObj.email_id,
        password : userObj.password,
        user_type : userObj.user_type
      })
    });

    let responseJson = await response.json();
    return responseJson;

  }catch(error){
    throw new Error(error);
  }
}


const getDoubtList = async()=>{
  try{

    let response = await fetch(`${apiBasePath}/doubt-solving/api/v1/doubt/doubts-list`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : `bearer ${localStorage.getItem('dsp_access_token')}`
      }
    });
    if(response.status === 401){
      // unauthorized request
      return {
        status : 'unauthorized'
      };
    }
    let responseJson = await response.json();
    return responseJson;

  }catch(error){
    throw new Error(error);
  }

}

const raiseDoubt = async (doubtObj)=>{
  try{

    let response = await fetch(`${apiBasePath}/doubt-solving/api/v1/doubt/create-doubt/${doubtObj.user_id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : `bearer ${localStorage.getItem('dsp_access_token')}`
      },
      body: JSON.stringify({
        title : doubtObj.title,
        description : doubtObj.description
      })
    });

    if(response.status === 401){
      // unauthorized request
      return {
        status : 'unauthorized'
      };
    }

    let responseJson = await response.json();
    return responseJson;

  }catch(error){
    throw new Error(error);
  }

};

const addCommentOnDoubt = ()=>{

};

export {registerUser, loginUser, getDoubtList, raiseDoubt, addCommentOnDoubt};