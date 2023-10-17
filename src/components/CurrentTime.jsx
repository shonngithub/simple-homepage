import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import lunarCalendar from 'lunar-calendar';
import './CurrentTime.less'

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentWeek, setCurrentWeek] = useState('');
  const [lunarDate, setLunarDate] = useState('');

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // useEffect(()=>{
    // const now = new Date();
    // setCurrentWeek(format(now,'EEEE', { locale: zhCN }));
    // setCurrentDate(format(now, 'yyyy-MM-dd'));
    // setLunarDate(getLunarDate(now));
  // },[])

  const updateTime = () => {
    const now = new Date();
    setCurrentTime(format(now, 'HH:mm:ss'));
    setCurrentWeek(format(now,'EEEE', { locale: zhCN }));
    setCurrentDate(format(now, 'yyyy年MM月dd'));
    setLunarDate(getLunarDate(now));
  };

  const getLunarDate = (date) => {
    const lunarDateInfo = lunarCalendar.solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
    // console.log(lunarDateInfo)
    return `${lunarDateInfo.GanZhiYear}${lunarDateInfo.zodiac}年 ${lunarDateInfo.GanZhiMonth}月 ${lunarDateInfo.GanZhiDay}日  
    ${lunarDateInfo.lunarMonthName}${lunarDateInfo.lunarDayName} ${lunarDateInfo.term?'今日'+lunarDateInfo.term:''}`;
  };

  return (
    <div className='time_container'>
      <p className="time-display">{currentTime}</p>
      <p className="date-display">{currentDate}&nbsp;&nbsp;&nbsp;{currentWeek}&nbsp;&nbsp;&nbsp;{lunarDate}</p>
      {/* <p className="lunar-display">{lunarDate}</p> */}
    </div>
  );
}

export default CurrentTime;