import React from "react";
import CustomButton from "@/Components/CustomButton";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <div
        className="flex flex-col gap-44 h-screen w-screen bg-no-repeat bg-center bg-cover items-center justify-center"
        style={{ backgroundImage: "url('/back.png')" }}
      >
        <div className="text-8xl max-sm:text-6xl font-black justify-center items-center  flex flex-col text-white bg-transparent">
          <h1>Certificate</h1>
          <h1 className="indent-96 max-md:indent-40 max-sm:indent-12">
            Generator
          </h1>
        </div>

        {/* <div className="relative bg-transparent flex max-md:justify-center justify-end mr-24 max-sm:mr-0">
          <Link href={"/upload_user_data"}>
            <CustomButton
              label="Get Started &#8599;"
              buttonStyles="bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3] text-white font-black py-4 px-10 rounded"
              textStyle="flex gap-2 text-black text-[14px] leading-[17px] font-black"
            />
          </Link>
        </div> */}

<div className="absolute bottom-20 right-0 bg-transparent flex max-md:justify-center justify-end mr-24 max-sm:mr-0">
          <Link href={"/upload_user_data"}>
            <CustomButton
              label="Get Started &#8599;"
              buttonStyles="bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3] text-white font-black py-4 px-10 rounded"
              textStyle="flex gap-2 text-black text-[14px] leading-[17px] font-black"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
