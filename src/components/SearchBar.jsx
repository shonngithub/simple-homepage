import React, { useState } from 'react';
import './SearchBar.less';
import { Input, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons'; // 导入搜索图标

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false); // 新增状态用于判断是否聚焦
  
    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // console.log('Searching for:', searchQuery);
      window.open(`https://cn.bing.com/search?q=${searchQuery}`)
    };
  
    const handleFocus = () => {
      setIsFocused(true);
      window.removeEventListener('keydown', window.handleKeyPress);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
      window.addEventListener('keydown', window.handleKeyPress);
    };
  
    return (
      <div className={`bing-search-box ${isFocused ? 'focused' : ''}`}>
          <Input
          prefix={<img src="https://infinity-permanent.infinitynewtab.com/infinity/search-add/bing_new.png?imageMogr2/thumbnail/48x/format/webp/blur/1x0/quality/100|imageslim" alt="Bing" style={{width:'30px',height:'30px'}} />}
            suffix={<SearchOutlined style={{color:'lightblue',fontSize:'18px'}} />} // 使用 Ant Design 的搜索图标
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onPressEnter={handleSubmit}
          />
      </div>
    );
};

export default SearchBox;