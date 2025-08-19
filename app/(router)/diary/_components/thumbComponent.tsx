'use client';

import { useState } from 'react';

import ThumbDownActive from '@icons/thumbdown_active.svg';
import ThumbDown from '@icons/thumbdown_black.svg';
import ThumbUpActive from '@icons/thumbup_active.svg';
import ThumbUp from '@icons/thumbup_black.svg';

export default function ThumbComponent() {
  const [thumbUp, setThumbUp] = useState(false);
  const [thumbDown, setThumbDown] = useState(false);

  const handleThumbUp = () => {
    setThumbUp(!thumbUp);
    if (thumbDown) {
      setThumbDown(false);
    }
  };
  const handleThumbDown = () => {
    setThumbDown(!thumbDown);
    if (thumbUp) {
      setThumbUp(false);
    }
  };

  return (
    <div className="flex justify-center gap-[2rem] mt-[1.2rem]">
      <button onClick={handleThumbUp}>{thumbUp ? <ThumbUpActive /> : <ThumbUp />}</button>
      <button onClick={handleThumbDown}>{thumbDown ? <ThumbDownActive /> : <ThumbDown />}</button>
    </div>
  );
}
