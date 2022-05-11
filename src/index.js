import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import App from './frontend/App'


ReactDOM.render(<App></App>,document.getElementById('root'))
if (module.hot) {
    module.hot.accept();
}

