import { ChangeEvent, MouseEvent, useState } from "react"
import type { NextPage } from "next";

import Head from "next/head";

import uploadFiles from "./api/upload";


const Home: NextPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [chattiestUsers, setChattiestUsers] = useState([]);

  const handleFile = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      alert("No file was chosen");
      return;
    }

    const uploadedFiles = Array.from(fileList);

    const invalidFiles = uploadedFiles.filter(
      (file) => !file.type.startsWith("text/plain")
    );
    if (invalidFiles.length > 0) {
      alert("Please select valid .txt files.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    setPreviewUrls((prevUrls) => [
      ...prevUrls,
      ...uploadedFiles.map((file) => file.name),
    ]);
  };

  const onFileUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files);
  };

  const dropFileHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    handleFile(event.dataTransfer.files);
  };

  const preventDefaultHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onCancelFileHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!files.length) {
      return;
    }
    setFiles([]);
    setPreviewUrls([]);
  };

  const onUploadFileHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  
    try {
      const chattiestUsers = await uploadFiles(files);
      setChattiestUsers(chattiestUsers);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "Network Error") {
          console.error(
            "An error occurred while uploading files. Please check your internet connection and try again."
          );
        } else {
          console.error("An error occurred while uploading files:", error);
        }
      }
    }

    setFiles([]);
    setPreviewUrls([]);
  };

  interface User {
    username: string;
    wordCount: number;
  }
  
  return (
    <div>
      <Head>
        <title>File uploader</title>
        <meta name="description" content="File uploader" />
      </Head>

      <main className="py-10">
        <div className="w-full min-h-screen max-w-3xl px-3 mx-auto">
          <h1 className="mb-10 text-3xl font-bold text-gray-900">
            Upload your files {"(.txt)"}
          </h1>

          <form onSubmit={(event) => event.preventDefault()}>
            <div className="pb-2 md:flex gap-2">
              <div
                className="flex p-3 border border-gray-500 border-dashed gap-1.5 flex-grow h-[250px] mb-2 md:mb-auto"
                onDrop={dropFileHandler}
                onDragOver={preventDefaultHandler}
              >
                <label className="flex flex-col items-center justify-center flex-grow h-full py-3 transition-colors duration-150 cursor-pointer hover:text-gray-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-14 h-14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                  <strong className="text-sm font-medium">
                    Drag and drop your file here
                  </strong>
                  <input
                    className="block w-0 h-0"
                    name="file"
                    type="file"
                    onChange={onFileUploadChange}
                    multiple
                  />
                </label>
              </div>
              {chattiestUsers.length > 0 && (
                <div className='flex-grow p-3 border border-gray-500'>
                  <h2>Chattiest Users:</h2>
                  <ul className="max-h-[200px] overflow-auto">
                    {chattiestUsers.map((user: User, index: number) => (
                      <li key={index}>
                        {user.username}: {user.wordCount}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {previewUrls.length > 0 && (
              <div>
                <h2>You are uploading:</h2>
                <ul>
                  {previewUrls.map((url, index) => (
                    <li key={index}>{url}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex mt-4 gap-1.5">
              <button
                onClick={onUploadFileHandler}
                disabled={files.length === 0}
                className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
              >
                Upload files
              </button>
              <button
                onClick={onCancelFileHandler}
                disabled={files.length === 0}
                className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
              >
                Remove files
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
