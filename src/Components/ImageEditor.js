"use client"
// ImageUploadComponent.js

import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';

const ImageUploadComponent = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);
  const [size, setSize] = useState(null);
  const [fontfam, setFontfam] = useState(null);
  const [colour, setColour] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e, ui) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  };

  const downloadAsImage = () => {
    html2canvas(imageContainerRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'image_with_text.png';
      link.click();
    });
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type Name" onClick={(e) => e.stopPropagation()} />
      <input type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder="Type Font Size" onClick={(e) => e.stopPropagation()} />
      <input type="text" value={fontfam} onChange={(e) => setFontfam(e.target.value)} placeholder="Type Font Family" onClick={(e) => e.stopPropagation()} />
      <input type="text" value={colour} onChange={(e) => setColour(e.target.value)} placeholder="Type Font Colour" onClick={(e) => e.stopPropagation()} />
      <button onClick={downloadAsImage}>Download as Image</button>
      {image && (
        <div ref={imageContainerRef} className="relative aspect-square w-screen h-screen image-container">
          <img src={image} alt="Uploaded" />
          <Draggable onDrag={handleDrag} defaultPosition={{ x: 0, y: 0 }} className="text-white">
            <h1 style={{ fontSize: `${size}px`, fontFamily: `${fontfam}`, color: `${colour}`, width: 'fit-content' }}>{text}</h1>
          </Draggable>
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;


