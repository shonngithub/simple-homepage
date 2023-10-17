import React, { useState, useEffect } from 'react';
import './PoetryDisplay.less'; // 引入自定义样式文件

function PoetryDisplay() {
    const [poetry, setPoetry] = useState({
        content: '',
        origin: '',
        author: '',
        category: '',
    });

    useEffect(() => {
        fetchPoetry();
    }, []);

    const fetchPoetry = async () => {
        try {
            // post https://v1.hitokoto.cn/?c=d&c=e&c=h&c=i&c=k
            const response = await fetch('https://v1.jinrishici.com/all.json');
            if (response.ok) {
                const data = await response.json();
                setPoetry(data);
            } else {
                console.error('Failed to fetch poetry.');
            }
        } catch (error) {
            console.error('Error fetching poetry:', error);
        }
    };

    return (
        <div className="poetry-container">
            <p className="poetry-content">{poetry.content}
                <br /> 
                <span>
                    《{poetry.origin}》  
                </span>
                {/* <br /> */}
                <span>
                    -{poetry.author}-
                </span>
            </p>
        </div>
    );
}

export default PoetryDisplay;