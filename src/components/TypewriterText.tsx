import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypewriterText = ({ text, speed = 50, delay = 0, className = "" }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;

    const startTyping = () => {
      setIsTyping(true);
      setCurrentIndex(0);
      setDisplayText('');
    };

    const timeoutId = setTimeout(startTyping, delay);
    return () => clearTimeout(timeoutId);
  }, [text, delay]);

  useEffect(() => {
    if (!isTyping || currentIndex >= text.length) {
      if (currentIndex >= text.length) {
        setIsTyping(false);
      }
      return;
    }

    const timeoutId = setTimeout(() => {
      setDisplayText(text.slice(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, speed);

    return () => clearTimeout(timeoutId);
  }, [currentIndex, isTyping, text, speed]);

  return (
    <span className={`${className} ${isTyping ? 'border-r-2 border-primary animate-blink' : ''}`}>
      {displayText}
    </span>
  );
};

export default TypewriterText;