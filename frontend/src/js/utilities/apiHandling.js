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


const getDoubtList = ()=>{

}

const raiseDoubt = ()=>{

};

const addCommentOnDoubt = ()=>{

};

export {registerUser, loginUser, getDoubtList, raiseDoubt, addCommentOnDoubt};