"use client";
import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



const ImageUploadComponent = () => {
    const [textInputs, setTextInputs] = useState([]);
    const imageContainerRef = useRef(null);
    const [Name, setName] = useState(null);
    const [Namesize, setNameSize] = useState(null);
    const [Namefontfam, setNameFontfam] = useState(null);
    const [Namecolour, setNameColour] = useState(null);
    const [CertId, setCertId] = useState(null);
    const [CertIdsize, setCertIdSize] = useState(null);
    const [CertIdfontfam, setCertIdFontfam] = useState(null);
    const [CertIdcolour, setCertIdColour] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const data = useSelector((state) => state.userState.data);
    const user = useSelector((state) => state.userState.user);
    const router = useRouter();
    const image = useSelector((state) => state.userState.image);

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
        for (const [index, name] of data.names.entries()) {
            const id = data.id[index];
            await new Promise((resolve) => {
                setName(name);
                setCertId(id);
                setTimeout(() => {
                    const imageContainer = imageContainerRef.current;

                    // Set a higher scale value for better image quality
                    const scale = 2; // You can adjust this value

                    html2canvas(imageContainer, { scale: scale }).then((canvas) => {
                        const imgData = canvas.toDataURL('image/png');
                        const link = document.createElement('a');
                        link.href = imgData;
                        link.download = `${id}.png`;
                        link.click();
                        resolve();
                    });
                }, 300);
            });
        }
    };

    return (
        <div>
            <div className='flex w-[100%] h-[100%] bg-black'>
                <div className='flex flex-col w-[75vw] h-[100vh] bg-white justify-center items-center' ref={imageContainerRef}>
                    {image === null ? null : (
                        <img src={image instanceof Blob ? URL.createObjectURL(image) : ''} alt="Uploaded" className='w-[70vw] h-[90vh]' />
                    )}
                    <Draggable onDrag={NamehandleDrag} defaultPosition={{ x: 0, y: 0 }} className="text-white">
                        <h1 style={{ fontSize: `${Namesize}px`, fontFamily: `${Namefontfam}`, color: `${Namecolour}`, width: 'fit-content' }}>
                            {Name}
                        </h1>
                    </Draggable>
                    <Draggable onDrag={NamehandleDrag} defaultPosition={{ x: 0, y: 0 }} className="text-white">
                        <h1 style={{ fontSize: `${CertIdsize}px`, fontFamily: `${CertIdfontfam}`, color: `${CertIdcolour}`, width: 'fit-content' }}>
                            {CertId}
                        </h1>
                    </Draggable>
                    {textInputs.map((input, index) => (
                        <Draggable onDrag={(e, ui) => handleDrag(e, ui, index)} defaultPosition={input.position} className="text-white" key={index}>
                            <h1 style={{ fontSize: `${input.size}px`, fontFamily: `${input.fontfam}`, color: `${input.colour}`, width: 'fit-content' }}>
                                {input.text}
                            </h1>
                        </Draggable>
                    ))}
                </div>
                <div className='flex w-[fit] h-[100vh] bg-black flex-col m-[20px] overflow-auto'>
                    <div className='flex w-[fit] h-[90vh] bg-black flex-col m-[20px] overflow-auto'>
                        {/* User Name */}
                        <h1 className='text-white text-2xl'>&middot; Add Text</h1>
                        <input type="text" value={Name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" onClick={(e) => e.stopPropagation()} className="w-[300px] h-[60px] m-[20px] text-center mb-2 bg-black border-[2px] border-white text-white" />
                        <input type="text" value={Namesize} onChange={(e) => setNameSize(e.target.value)} placeholder="Type Font Size" onClick={(e) => e.stopPropagation()} className="w-[300px] h-[60px] m-[20px] text-center mb-2 bg-black border-[2px] border-white text-white" />
                        <input type="text" value={Namefontfam} onChange={(e) => setNameFontfam(e.target.value)} placeholder="Type Font Family" onClick={(e) => e.stopPropagation()} className="w-[300px] h-[60px] m-[20px] text-center mb-2 bg-black border-[2px] border-white text-white" />
                        <input type="text" value={Namecolour} onChange={(e) => setNameColour(e.target.value)} placeholder="Type Font Colour" onClick={(e) => e.stopPropagation()} className="w-[300px] h-[60px] m-[20px] text-center mb-2 bg-black border-[2px] border-white text-white" />
                        {/* Certificate ID */}
                        <h1 className='text-white text-2xl'>&middot; Add Certificate Id</h1>
                        <input type="text" value={CertId} onChange={(e) => setCertId(e.target.value)} placeholder="Enter Certificate Id" onClick={(e) => e.stopPropagation()} className="w-[300px] h-[60px] m-[20px] text-center mb-2 bg-black border-[2px] border-white text-white" />
                        <input type="text" value={CertIdsize} onChange={(e) => setCertIdSize(e.target.value)} placeholder="Type Font Size" onClick={(e) => e.stopPropagation()} className="w-[300px] h-[60px] m-[20px] text-center mb-2 bg-black border-[2px] border-white text-white" />
                        <input type="text" value={CertIdfontfam} onChange={(e) => setCertIdFontfam(e.target.value)} placeholder="Type Font Family" onClick={(e) => e.stopPropagation()} className="w-[300px] h-[60px] m-[20px] text-center mb-2 bg-black border-[2px] border-white text-white" />
                        <input type="text" value={CertIdcolour} onChange={(e) => setCertIdColour(e.target.value)} placeholder="Type Font Colour" onClick={(e) => e.stopPropagation()} className="w-[300px] h-[60px] m-[20px] text-center mb-2 bg-black border-[2px] border-white text-white" />
                        {textInputs.map((input, index) => (
                            <>
                                <div className='flex gap-40' key={index}>
                                    <h1 className='text-white text-2xl'>&middot; Field {index + 1}</h1>
                                    <button onClick={() => removeTextInput(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </button>
                                </div>
                                <div key={index} className='flex flex-col'>
                                    <input
                                        type="text"
                                        value={input.text}
                                        onChange={(e) => {
                                            const newInputs = [...textInputs];
                                            newInputs[index].text = e.target.value;
                                            setTextInputs(newInputs);
                                        }}
                                        placeholder="Type Name"
                                        className="flex w-[300px] h-[60px] m-[20px] text-center mb-2 bg-black border-[2px] border-white text-white"
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
                                        className="flex w-[300px] h-[60px] m-[20px] text-center mb-2 bg-black border-[2px] border-white text-white"
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
                                        className="w-[300px] h-[60px] m-[20px] text-center mb-2 bg-black border-[2px] border-white text-white"
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
                                        className="w-[300px] h-[60px] m-[20px] text-center mb-2 bg-black border-[2px] border-white text-white"
                                    />
                                </div>
                            </>
                        ))}
                    </div>
                    <button onClick={addTextInput} className='bottom-[5%] left-[40vw] m-[5px] pt-4 pb-4 pl-11 rounded-[12px] text-[#121212] bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3] text-center'>Add a Field</button>
                    <button onClick={downloadAsImage} className='bottom-[5%] left-[40vw] m-[5px] pt-4 pb-4 pl-11 rounded-[12px] text-[#121212] bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3]'>Download Sample</button>
                    <button onClick={downloadallImages} className='bottom-[5%] left-[40vw] m-[5px] pt-4 pb-4 pl-11 rounded-[12px] text-[#121212] bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3]'>Download Certificates</button>
                </div>
            </div>
        </div >
    );
};

export default ImageUploadComponent;
