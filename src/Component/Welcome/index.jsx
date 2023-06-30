import React, { useEffect } from 'react'
import { Tooltip } from 'antd';

export default function Welcome(props) {
  return (
    <Tooltip placement="right" title="先生/女士">
    <span>欢迎您，{props.job} {JSON.parse(props.usermsg).name}</span>
    </Tooltip>
  )
}