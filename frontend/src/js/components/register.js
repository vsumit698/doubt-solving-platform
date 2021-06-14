import React from 'react';
import { Form, Input, InputNumber, Button ,Radio,Select} from 'antd';
import {withRouter} from 'react-router-dom';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a valid phone number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

var RegisterForm = (props) => {

  return (
    
    <Form {...layout}  name="nest-messages" onFinish={props.registerUser} validateMessages={validateMessages} 
      style={{width:'600px',
            height:'500px',
            margin : '20px 400px',
            }}>


      <Form.Item name={['user', 'name']} label="Name" rules={[ {required: true}]}>
        <Input style={{color : "green"}}/>
      </Form.Item>

      <Form.Item name={['user', 'email']} label="Email"rules={[ {type: 'email',required:true}]}>
        <Input />
      </Form.Item>
      
      <Form.Item name={['user', 'mobile']} label="Mobile"  rules={[
          {
            type: 'number',
            min: 0,
            max: 9999999999,
            required : true
          },
        ]}>
        <InputNumber style={{width:'400px'}} />
      </Form.Item>
      {/* add gender via radio button */}
      <Form.Item  name={['user','gender']} label="Gender" rules={[{required:true}]}>
          <Radio.Group>
            <Radio.Button value="male">Male</Radio.Button>
            <Radio.Button value="female">Female</Radio.Button>
          </Radio.Group>
      </Form.Item>

      {/* add city via dropdown */}
      <Form.Item name={['user','city']} label="City" rules={[{required:true}]}>
          <Select>
            <Select.Option value="delhi">Delhi</Select.Option>
            <Select.Option value="banglore">Banglore</Select.Option>
            <Select.Option value="mumbai">Mumbai</Select.Option>
            <Select.Option value="kolkata">Kolkata</Select.Option>
          </Select>
      </Form.Item>

      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      
    </Form>
    
  );
};

export default withRouter(RegisterForm);