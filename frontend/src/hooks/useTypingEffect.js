import { useState, useEffect } from 'react';

export function useTypingEffect(fullText, speed = 18) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!fullText) {
      setDisplayedText("");
      return;
    }

    setDisplayedText(""); // Reset text when new fullText is provided

    let currentText = "";
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setDisplayedText(currentText);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId); // Cleanup interval on unmount or fullText change
  }, [fullText, speed]);

  return displayedText;
}
