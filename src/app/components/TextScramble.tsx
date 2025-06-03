"use client";
import React, { useEffect, useState } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#0123456789abcdefghijklmnopqrstuvwxyz";

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

interface TextScrambleProps {
  texts: string[];
  interval?: number; // how long to keep final word
  speed?: number;    // how fast animation runs
}

const TextScramble: React.FC<TextScrambleProps> = ({
  texts,
  interval = 2500,
  speed = 10,
}) => {
  const [output, setOutput] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[index];
    const nextIndex = (index + 1) % texts.length;
    let frame = 0;
    let resolved = false;

    const maxLength = currentText.length;
    const scrambleArray = Array(maxLength).fill("").map(() => randomChar());

    const update = () => {
      let updated = false;

      for (let i = 0; i < maxLength; i++) {
        if (frame > i * 2 && scrambleArray[i] !== currentText[i]) {
          scrambleArray[i] = currentText[i];
          updated = true;
        } else if (scrambleArray[i] !== currentText[i]) {
          scrambleArray[i] = randomChar();
          updated = true;
        }
      }

      setOutput(scrambleArray.join(""));

      if (updated) {
        frame++;
        setTimeout(update, speed);
      } else {
        resolved = true;
        setTimeout(() => {
          setIndex(nextIndex);
        }, interval);
      }
    };

    update();

    return () => {
      if (!resolved) setOutput("");
    };
  }, [index, interval, speed, texts]);

  return (
    <div className="uppercase font-mono text-lg tracking-widest text-amber-400 min-h-[1.5em]">
      {output}
    </div>
  );
};

export default TextScramble;
