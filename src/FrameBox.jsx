import React from 'react';
import './FrameBox.css';

const FrameBox = ({ label, children }) => {
    return (
        <div className="frame-box">
            <div className="frame-label">{label}</div>
            <div className="frame-content">{children}</div>
        </div>
    );
};

export default FrameBox;
