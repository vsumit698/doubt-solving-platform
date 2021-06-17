import React from 'react';
import { Form, Input, Button ,Radio} from 'antd';
import {withRouter} from 'react-router-dom';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!'
  }
};

var RegisterUser = (props) => {

  return (
    
    <Form {...layout} className="register-form" name="nest-messages" onFinish={props.handleUserSignup} validateMessages={validateMessages}>

      <Form.Item name={['user', 'name']} label="Name" rules={[ {required: true}]}>
        <Input style={{color : "green"}}/>
      </Form.Item>

      <Form.Item name={['user', 'email_id']} label="Email"rules={[ {type: 'email',required:true}]}>
        <Input />
      </Form.Item>
      
      <Form.Item
        label="Password"
        name={['user','password']}
        rules={[
          {
            required: true,
            message: 'Please enter password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      
      {/* add user type via radio button */}
      <Form.Item  name={['user','user_type']} label="User Type" rules={[{required:true}]}>
          <Radio.Group>
            <Radio.Button value="student">Student</Radio.Button>
            <Radio.Button value="ta">Teaching Assistant</Radio.Button>
            <Radio.Button value="teacher">Teacher</Radio.Button>
          </Radio.Group>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={props.signupLoading}>
          Submit
        </Button>
      </Form.Item>
      
    </Form>
    
  );
};

export default withRouter(RegisterUser);