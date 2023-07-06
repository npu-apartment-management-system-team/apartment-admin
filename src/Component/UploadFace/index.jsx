import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { putFile } from '@/utils/ossUtil.js';
import _axios from '../../api';

export default function UploadFace () {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();
    const handleUpload = async () => {
        try {
            setUploading(true);
            if (fileList[0].size > 10 * 1024 * 1024) {
                messageApi.error('照片过大，请进行压缩')
                return
            }

            const result = await putFile(
                'apartment/user/face/',
                '人脸识别',
                fileList[0])

            _axios.get('/api/auth/face/user', {
                params: {
                    faceUrl: result.url
                }
            }).then(response => {
                const code = response.data.code
                if (code === 2000) {
                    const name = response.data.user.name
                    const bedId = response.data.user.bedId
                    messageApi.info('人脸识别成功！')
                    messageApi.info('此人是：' + name + ",床位号：" + bedId)
                } else {
                    const {msg} = response.data
                    messageApi.info('非法闯入，此人不存在')
                    console.log(msg)
                }
            })
        } catch (e) {
            console.log(e)
        } finally {
            setUploading(false);
        }

    };
    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList
    };
    return (
        <div>
            {contextHolder}
            <Upload {...props}>
                <Button icon={<UploadOutlined/>}>请选择人脸图片</Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{
                    marginTop: 16
                }}
            >
                {uploading ? '人脸识别中' : '上传人脸'}
            </Button>
        </div>
    );
}
