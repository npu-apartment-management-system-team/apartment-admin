import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd';

export default function LeftMenu (props) {
    const {routers} = props
    const navigate = useNavigate()

    function changeNav (e) {
        navigate('/home' + routers[parseInt(e.key, 10) - 1].route, {replace: true});
    }

    return (
        <div>
            <div>
                <Menu
                    mode={props.mode}
                    theme={props.theme}
                    items={props.textitem}
                    onClick={changeNav}
                />
            </div>
        </div>
    )
}
