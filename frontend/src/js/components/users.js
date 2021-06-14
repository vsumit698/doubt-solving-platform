import React from 'react';
import { Table, Tag, Select,Input} from 'antd';
import '../../styles/users.css'
import {withRouter} from 'react-router-dom';

class Users extends React.Component{
    state = {
        searchText :'',
        searchTitle :'name'
    }

    render(){
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'Email',
              dataIndex: 'email',
            },
            {
              title: 'Mobile',
              dataIndex: 'mobile'
            },
            {
              title: 'Gender',
              dataIndex: 'gender',
              render: gender => {
                    let color = 'gender'==='male' ? 'green' : 'violet';
                    return(<Tag color={color}>
                        {gender.toUpperCase()}
                     </Tag>)
              }
            },
            {
              title: 'City',
              dataIndex: 'city',
              render: city => {
                let color;
                if(city==='delhi') color = 'blue';
                else if(city==='mumbai') color = 'green'
                else if(city==='kolkata') color = 'volcano';
                else color = 'red';
                return(<Tag color={color}>
                    {city.toUpperCase()}
                    </Tag>);
                }
            },
            {
                title: 'Introduction',
                dataIndex: 'introduction'
            }
          ];
        // search data according to user search results
        let users = this.props.users;
        let data = users;
        if(this.state.searchText.length>0){
            data = [];
            let searchTitle = this.state.searchTitle;
            let searchText = this.state.searchText;
            for(let id=0;users.length>id;id++){
                if(users[id][searchTitle] == searchText){
                    data.push(users[id]);
                }
            }
        }
        return (
            <div>
                <div className="search-zone">

                    <Input.Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onSearch={value => {this.setState({searchText:value})}}
                    style={{ width: 500 }}
                    />

                    <Select defaultValue="name" style={{ width: 120 }} onChange={(value)=>{this.setState({searchTitle:value})}}>
                        <Select.Option value="name">Name</Select.Option>
                        <Select.Option value="email">Email</Select.Option>
                        <Select.Option value="mobile">Mobile</Select.Option>
                        <Select.Option value="gender">Gender</Select.Option>
                        <Select.Option value="city">City</Select.Option>
                    </Select>

                </div>
                <Table columns={columns} dataSource={data} pagination={{position:['bottomCenter','topCenter'],showSizeChanger:true,pageSizeOptions:[2,5,10,20]}}></Table>
            </div>
        )
    }
}

export default withRouter(Users);