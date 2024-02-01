"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addimage } from '@/redux/slice/user';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  const handleFileUpload = (e) => {
    e.target.files[0] ? setImage(e.target.files[0]) : setImage(null);
    dispatch(addimage(e.target.files[0]));
  }
  return (
    <div>
      {!user && router.push("/")
        /* If user not loggedIn redirect to Login Page */
      }
      <div className='w-[100vw] h-[100vh] bg-black'>
        {image === null ? (
          <div className="grid place-items-center">
            <h1
              style={{ fontWeight: 500 }}
              className="mt-20 text-white text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
            >
              Please Import your Certificate Template
            </h1>
            <div className="absolute top-[35%] m-[50px] borderGradient w-4/5 md:w-5/6 xl:w-full">
              <div className="innerBorder grid place-items-center" id="drop-area">
                <Image width={201} height={201} src="/cert.png" alt="Csv Logo" />
                <div>
                  <p className="mt-5" id="file-info">
                  </p>
                  <input
                    type="file"
                    id="image-input"
                    onChange={handleFileUpload}
                    className="relative left-[5vw]"
                  />
                  <div id="error-message" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid place-items-center">
            <h1
              style={{ fontWeight: 500 }}
              className="mt-20 text-white text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
            >
              <div className="w-full h-full">
                <img src={URL.createObjectURL(image)} alt="Uploaded" className='w-[80vw] h-[80vh]' />
              </div>
            </h1>
            <div className="bottom-[5%] left-[40vw] pt-4 pb-4 pl-11 pr-11 rounded-[12px] text-[#121212] bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3]">
              <Link href="/edit">
                <button type="button">Edit</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;


