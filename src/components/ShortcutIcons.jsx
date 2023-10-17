import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './ShortcutIcons.less';

function ShortcutIcons() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [icons, setIconsData] = useState([]);
  const formRef = useRef();

  useEffect(() => {
    try {
      const localicon = localStorage.getItem('icons') ? JSON.parse(localStorage.getItem('icons')) : '';
      if (localicon) {
        setIconsData(localicon || data);
        return
      }
    } catch (error) {
      console.log(error);
    }

    fetch('/config.json')
      .then(response => response.json())
      .then(data => {
        data.splice(25);
        setIconsData(data);
      })
      .catch(error => {
        console.error('Error loading config.json:', error);
      });
  }, []);

  const showModal = (index) => {
    console.log(index);
    window.removeEventListener('keydown', window.handleKeyPress);
    setCurrentIndex(index);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    // Handle form submission logic here
    // setIsModalVisible(false);
    console.log(formRef.current)
    formRef.current.submit();
  };

  const submit = (data) => {
    console.log('submit', data, formRef.current);
    let nowIcon = [...icons];
    nowIcon[currentIndex] = data;
    setIconsData(nowIcon);

    // console.log(JSON.stringify(nowIcon));
    formRef.current.resetFields();

    setIsModalVisible(false);
    window.addEventListener('keydown', window.handleKeyPress);
    localStorage.setItem('icons', JSON.stringify(nowIcon));
  };

  const del = (i) => {
    let tmp = [...icons];
    tmp.splice(i, 1);
    setIconsData(tmp);
    console.log(i, tmp);
  }



  // const icons = [
  //   { name: '百度', url: 'https://www.baidu.com', icon: 'https://infinityicon.infinitynewtab.com/user-share-icon/c9f7546ad597dd7fb53e8129b6c07877.png' },

  //   { name: 'bilibili', url: 'https://www.bilibili.com', icon: 'https://infinityicon.infinitynewtab.com/user-share-icon/d8b62f4d64bda8800b1c788cd5ba3c68.png' },
  //   { name: '京东', url: 'https://www.jd.com', icon: 'https://infinityicon.infinitynewtab.com/user-share-icon/cee009549b352def723ba09d6da4b742.png' },
  //   // 添加更多的图标和链接...
  // ];

  const defaultIcon = <PlusOutlined />; // 使用Ant Design的+图标作为默认图标



  // 补充不满26个的图标
  while (icons.length < 26) {
    icons.push({ name: '', url: '', icon: '' });
  }



  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      const index = key.charCodeAt(0) - 65; // 获取字母对应的索引值
      const isLetterAZ = /^[A-Z]{1}$/;
      if (!isLetterAZ.test(key)) return;
      console.log(key, key.charCodeAt());
      if (index >= 0 && index < icons.length) {
        if (icons[index].icon) {
          window.open(icons[index].url, '_blank');
        } else {
          message.info(`🐶子别按了,你还没绑定${key}的网址`, 0.5);
          // showModal();
        }
      }
    };
    window['handleKeyPress'] = handleKeyPress;
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [icons]);

  return (
    <div className="shortcut-icons">

      <div className="row">
        {icons.slice(0, 10).map((icon, index) => (
          <div key={index}>
            <div className="abox" onClick={() => {
              return icon.icon ? '' : showModal(index)
            }}>
              {icon.icon ? (
                <a href={icon.url} target="_blank" rel="noopener noreferrer" style={{ "--code": "'按" + String.fromCharCode(65 + index) + "'" }}>
                  <img src={icon.icon} alt={icon.name} />
                </a>
              ) : (
                <div className="default-icon">{defaultIcon}</div>
              )}

              {icon.url && <span className='abox_del' onClick={(e) => { e.preventDefault; del(index) }}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="minus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z"></path></svg>
              </span>}
            </div>
            <span className='abox_name'>
              {icon.name}{icon.name ? '' : String.fromCharCode(65 + index)}
            </span>
          </div>
        ))}
      </div>


      <div className="row">
        {icons.slice(10, 20).map((icon, index) => (
          <div key={index}>
            <div className="abox" onClick={() => {
              return icon.icon ? '' : showModal(10 + index)
            }}>
              {icon.url ? (
                <a href={icon.url} target="_blank" rel="noopener noreferrer" style={{ "--code": "'按" + String.fromCharCode(75 + index) + "'" }}>
                  <img src={icon.icon} alt={icon.name} />
                </a>
              ) : (
                <div className="default-icon">{defaultIcon}</div>
              )}

              {icon.url && <span className='abox_del' onClick={(e) => { e.preventDefault; del(10 + index) }}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="minus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z"></path></svg>
              </span>}
            </div>
            <span className='abox_name'>
              {icon.name}{icon.name ? '' : String.fromCharCode(75 + index)}
            </span>
          </div>
        ))}
      </div>


      <div className="row">
        {icons.slice(20).map((icon, index) => (
          <div key={index}>
            <div className="abox" onClick={() => {
              return icon.icon ? '' : showModal(20 + index)
            }}>
              {icon.icon ? (
                <a href={icon.url} target="_blank" rel="noopener noreferrer" style={{ "--code": "'按" + String.fromCharCode(85 + index) + "'" }}>

                  <img src={icon.icon} alt={icon.name} />
                </a>
              ) : (
                <div className="default-icon">{defaultIcon}</div>
              )}

              {icon.url && <span className='abox_del' onClick={(e) => { e.preventDefault; del(20 + index) }}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="minus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z"></path></svg>
              </span>}
            </div>
            <span className='abox_name'>
              {icon.name}{icon.name ? '' : String.fromCharCode(85 + index)}
            </span>
          </div>
        ))}
      </div>

      <Modal
        title="添加网址"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="确定"
        cancelText="取消"
      >
        <Form ref={formRef} onFinish={submit}>
          <Form.Item label="网站名称" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="网站地址" name="url">
            <Input />
          </Form.Item>
          <Form.Item label="网站图标" name="icon">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ShortcutIcons;

