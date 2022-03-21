import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { upload } from '../../api/upload'

export default function CoverImage(prop) {
  const { emitImgPath } = prop
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });
    setUploading(true)
    const {
      data: { data: { path } }
    } = await upload(formData)
    if (path) {
      setUploading([])
      setUploading(false)
      emitImgPath(path)
    } else {
      message.error('上传失败')
    }
  };
  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList)
    },
    beforeUpload: file => {
      setFileList([...fileList, file])
      return false;
    },
    fileList,
  };
  return (
    <div>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>+添加封面</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? '上传中' : '上传'}
      </Button>
    </div>
  );
};
