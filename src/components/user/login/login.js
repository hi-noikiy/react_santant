import React, {Component} from 'react'
import './user.less'
import {Toast, Button} from 'antd-mobile'

class Login extends Component {
    btn() {
        Toast.info('111')
    }

    render() {
        return (
            <div className='user'>
                <Button onClick={this.btn.bind(this)} type="warning">warning</Button>
                user</div>
        )
    }
}

export default Login
