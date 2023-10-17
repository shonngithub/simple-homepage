import React from 'react';
// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import ShortcutIcons from './components/ShortcutIcons';
import SearchBar from './components/SearchBar';
import CurrentTime from './components/CurrentTime';
import PoetryDisplay from './components/PoetryDisplay'

function App() {

  return (
    <div className="wrap">
      <div className="header">
        {/* 头部右侧是开源的天气组件 */}
        <CurrentTime/>
        {/* <WeatherComponent /> */}
      </div>
      <div className="content">
        {/* 中间上部是搜索框 */}
        <SearchBar />
        {/* 中间下部是对应着键盘按键的网站快捷导航的图标 */}
        <ShortcutIcons />
      </div>
      <div className="footer">
        {/* 底部是一句随机的诗句 */}
        <PoetryDisplay />
      </div>
    </div>
  );
}

function WeatherComponent() {
  // 天气组件的代码
  return <div>天气组件</div>;
}


export default App;