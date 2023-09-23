'use client'
import { useState, useEffect } from 'react';

type TypeWriterProps = {
    text : string , 
    delay : number
}
const Typewriter = ({ text, delay }:TypeWriterProps) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
            setCurrentText(prevText => prevText + text[currentIndex])
            setCurrentIndex(prevIndex => prevIndex + 1)
        }, delay);
    
        return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    return <>{currentText}</>
}

export default Typewriter;