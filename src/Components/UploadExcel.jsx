"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from 'xlsx';
import { adddata } from '@/redux/slice/user';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { storage } from "@/Firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const UploadExcel = () => {

    const [names, setNames] = useState([]);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.userState.data);
    const user = useSelector((state) => state.userState.user);
    const router = useRouter();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            const fileRef = ref(storage, `csv/${file.name + v4()}.xlsx`);
            uploadBytes(fileRef, file);

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                const columnA = XLSX.utils.sheet_to_json(sheet, { header: 1, range: sheet['!ref'] ? { s: { c: 0, r: 1 }, e: { c: 0, r: XLSX.utils.decode_range(sheet['!ref']).e.r } } : null, raw: false }).flat();

                const columnB = XLSX.utils.sheet_to_json(sheet, { header: 1, range: sheet['!ref'] ? { s: { c: 1, r: 1 }, e: { c: 1, r: XLSX.utils.decode_range(sheet['!ref']).e.r } } : null, raw: false }).flat();

                const columnC = XLSX.utils.sheet_to_json(sheet, { header: 1, range: sheet['!ref'] ? { s: { c: 2, r: 1 }, e: { c: 2, r: XLSX.utils.decode_range(sheet['!ref']).e.r } } : null, raw: false }).flat();

                setNames({ names: columnA, emails: columnB,id:columnC });
            };

            reader.readAsArrayBuffer(file);
        }
    };

    dispatch(adddata(names));
    const numberArray = Array.from({ length: data.names?.length }, (_, index) => index);

    return (
        <div>
            <div className="min-w-[100vw] h-[100vh] bg-black">
                {names.length === 0 ? (
                    <div className="grid place-items-center">
                        <h1
                            style={{ fontWeight: 500 }}
                            className="mt-20 text-white text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                        >
                            Please Import your CSV File Here
                        </h1>
                        <div className="absolute top-[35%] m-[50px] borderGradient w-4/5 md:w-5/6 xl:w-full">
                            <div className="innerBorder grid place-items-center" id="drop-area">
                                <Image width={201} height={201} src="/csvLogo.png" alt="Csv Logo" />
                                <div>
                                    <p className="mt-5" id="file-info">
                                    </p>
                                    <input
                                        type="file"
                                        id="file-input"
                                        accept=".csv,.xlsx,.xls"
                                        onChange={handleFileUpload}
                                        className="relative left-[5vw]"
                                    />
                                    <div id="error-message" />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="relative left-[10vw] top-[10vh] w-[80vw] h-[60vh] border-[2px] border-dashed rounded overflow-auto">
                            <table className="w-[100%] h-[100%] px-[1000px]">
                                <thead className="mx-[100px]">
                                    <tr className="font-bold text-white text-[30px]">
                                        <th className="m-[30px]">Id.No</th>
                                        <th className="m-[30px]">Name</th>
                                        <th className="m-[30px]">Email</th>
                                    </tr>
                                </thead>
                                <tbody className="mx-[100px]">
                                    {numberArray.map((num) => (
                                        <tr key={num} className="font-semibold text-[20px] text-white">
                                            <td className="m-[30px] text-center">{names.id[num]}</td>
                                            <td className="m-[30px] text-center">{names.names[num]}</td>
                                            <td className="m-[30px] text-center">{names.emails[num]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="absolute bottom-[5%] left-[40vw] pt-4 pb-4 pl-11 pr-11 rounded-[12px] text-[#121212] bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3]">
                            <Link href="/upload_image">
                                <button type="button" >IMPORT YOUR CSV</button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadExcel;
