import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import storageUtils from './utils/storageUtils'
import memoryUtils from  './utils/memoryUtils'
//刷新页面时：读取local中保存user，保存到内存中
const user = storageUtils.getUser();
memoryUtils.user = user;


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>,
)
