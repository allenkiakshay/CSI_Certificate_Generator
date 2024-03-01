// components/CustomButton.js
import React from 'react';

const CustomButton = ({ label, onClick, buttonStyles, rightIcon, textStyle }) => {
  return (
    <button className={buttonStyles} onClick={onClick}>
      <span className={textStyle}>{label}</span>
      {rightIcon && (
        <img src={rightIcon} alt='right icon' className='w-6 h-6 object-contain' />
      )}
    </button>
  );
};

export default CustomButton;
