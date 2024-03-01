"use client"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase";
import { adduser } from "@/redux/slice/user";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userState.user);
    const router = useRouter();

    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                dispatch(adduser(data.user.email));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            {
                !!user && !!Object.keys(user).length && router.push("/home")
                /* If there exist a user then redirect to Home Page */
            }
            {/* <button onClick={handleSignInWithGoogle}>SignIn</button> */}
            <div className='flex w-[100vw] h-[100vh] items-center bg-black'>
                <Image src="/form.png" alt="" width={600} height={600} />
                <div className="relative max-w-md mr-12 mt-[5px] ml-auto ">

                    <span className="inline-flex items-baseline">
                        <img src="/download.jpeg" alt="" className="self-center w-11 h-11 full mx-1" />
                        <span><h2 className='font-bold text-white text-[24px]'>Certificate Generator</h2></span>
                    </span>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3] text-black font-bold py-2 px-4 rounded mt-10"
                            onClick={handleSignInWithGoogle}
                        >
                            Sign In with Google
                        </button>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3] text-black font-bold py-2 px-4 rounded mt-10"
                            onClick={handleSignInWithGoogle}
                        >
                            Sign Up with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;