'use client'
import React, {useState} from "react";
import {WebsocketDemo} from "@/lib/service/OcrService";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        try {
            const appId = '5c2b33cc';
            const apiKey = 'bf577fd11e99e0776c6afd00ac483daa';
            const apiSecret = 'd371c18650d420736e8f157c042f4552';
            // const fileInput = document.getElementById('fileInput') as HTMLInputElement;
            // const file = fileInput.files[0]; // 假设你有一个文件输入元素
            const resultType = '1'; // 选择输出格式 2:ppt、1:doc、0:excel,结果将保存在output中

            if (file) {
                const demo = new WebsocketDemo(appId, apiKey, apiSecret, file, resultType);
            } else {
                console.error("No file selected.");
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('There was an error uploading the file.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange}/>
            <button type="submit" className={"btn"}>Upload File</button>
        </form>
    );
}
