"use client";
import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';



const ImageUploadComponent = () => {
    const [image, setImage] = useState(null);
    const [textInputs, setTextInputs] = useState([]);
    const imageContainerRef = useRef(null);
    const [Name, setName] = useState(null);
    const [Namesize, setNameSize] = useState(null);
    const [Namefontfam, setNameFontfam] = useState(null);
    const [Namecolour, setNameColour] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const data = useSelector((state) => state.userState.data);
    const user = useSelector((state) => state.userState.user);
    const router = useRouter();

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

    const handleDrag = (e, ui, index) => {
        const newInputs = [...textInputs];
        newInputs[index].position = { x: newInputs[index].position.x + ui.deltaX, y: newInputs[index].position.y + ui.deltaY };
        setTextInputs(newInputs);
    };

    const NamehandleDrag = (e, ui) => {
        const { x, y } = position;
        setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
    };

    const addTextInput = () => {
        setTextInputs([...textInputs, { text: '', size: '', fontfam: '', colour: '', position: { x: 0, y: 0 } }]);
    };

    const removeTextInput = (index) => {
        const newInputs = [...textInputs];
        newInputs.splice(index, 1);
        setTextInputs(newInputs);
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

    const downloadallImages = async () => {
        for (const name of data.names) {
            await new Promise((resolve) => {
                setName(name);
                setTimeout(() => {
                    const imageContainer = imageContainerRef.current;

                    // Set a higher scale value for better image quality
                    const scale = 2; // You can adjust this value

                    html2canvas(imageContainer, { scale: scale }).then((canvas) => {
                        const imgData = canvas.toDataURL('image/png');
                        const link = document.createElement('a');
                        link.href = imgData;
                        link.download = `${name}.png`;
                        link.click();
                        resolve();
                    });
                }, 300);
            });
        }
    };

    return (
        <div>
            {!user && router.push("/")
                /* If user not loggedIn redirect to Login Page */
            }
            <input type="file" onChange={handleImageChange} />
            <input type="text" value={Name} onChange={(e) => setName(e.target.value)} placeholder="Type Name" onClick={(e) => e.stopPropagation()} />
            <input type="text" value={Namesize} onChange={(e) => setNameSize(e.target.value)} placeholder="Type Font Size" onClick={(e) => e.stopPropagation()} />
            <input type="text" value={Namefontfam} onChange={(e) => setNameFontfam(e.target.value)} placeholder="Type Font Family" onClick={(e) => e.stopPropagation()} />
            <input type="text" value={Namecolour} onChange={(e) => setNameColour(e.target.value)} placeholder="Type Font Colour" onClick={(e) => e.stopPropagation()} />
            {textInputs.map((input, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={input.text}
                        onChange={(e) => {
                            const newInputs = [...textInputs];
                            newInputs[index].text = e.target.value;
                            setTextInputs(newInputs);
                        }}
                        placeholder="Type Name"
                    />
                    <input
                        type="text"
                        value={input.size}
                        onChange={(e) => {
                            const newInputs = [...textInputs];
                            newInputs[index].size = e.target.value;
                            setTextInputs(newInputs);
                        }}
                        placeholder="Type Font Size"
                    />
                    <input
                        type="text"
                        value={input.fontfam}
                        onChange={(e) => {
                            const newInputs = [...textInputs];
                            newInputs[index].fontfam = e.target.value;
                            setTextInputs(newInputs);
                        }}
                        placeholder="Type Font Family"
                    />
                    <input
                        type="text"
                        value={input.colour}
                        onChange={(e) => {
                            const newInputs = [...textInputs];
                            newInputs[index].colour = e.target.value;
                            setTextInputs(newInputs);
                        }}
                        placeholder="Type Font Colour"
                    />
                    <button onClick={() => removeTextInput(index)}>Delete</button>
                </div>

            ))}
            <button onClick={addTextInput}>Add Text Input</button>
            <button onClick={downloadAsImage}>Download as Image</button>
            <button onClick={downloadallImages}>Download All Images</button>
            {image && (
                <div className="relative aspect-square max-w-screen max-h-screen image-container">
                    <div ref={imageContainerRef}>
                        <img src={image} alt="Uploaded" />
                        <Draggable onDrag={NamehandleDrag} defaultPosition={{ x: 0, y: 0 }} className="text-white">
                            <h1 style={{ fontSize: `${Namesize}px`, fontFamily: `${Namefontfam}`, color: `${Namecolour}`, width: 'fit-content' }}>
                                {Name}
                            </h1>
                        </Draggable>
                        {textInputs.map((input, index) => (
                            <Draggable onDrag={(e, ui) => handleDrag(e, ui, index)} defaultPosition={input.position} className="text-white">
                                <h1 style={{ fontSize: `${input.size}px`, fontFamily: `${input.fontfam}`, color: `${input.colour}`, width: 'fit-content' }}>
                                    {input.text}
                                </h1>
                            </Draggable>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploadComponent;
