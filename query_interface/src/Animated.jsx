import React from 'react';
import Lottie from 'react-lottie';
import animationData from './ani.json';
const Animated = () => {
    return (
      <div className="container">
        <Lottie animationData={animationData} />
      </div>
    );
};
export default Animated;