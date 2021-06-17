import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'antd/dist/antd.css';
import {BrowserRouter} from 'react-router-dom'
import App from './app';

ReactDOM.render(<BrowserRouter>
                    <App/>
                </BrowserRouter>,document.getElementById('root'));
