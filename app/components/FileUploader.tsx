"use client";

// import UserInputPopup from "./UserInputPopup";
import { entityObject } from "../api/docAI_parse/route";
import { DialogueObject } from "../api/openAI_GPT/route";
import { useRef, useState, useEffect } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
// import Card from 'react-bootstrap/Card';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import Button from 'react-bootstrap/Button';
import { Card, ProgressBar, Button, Form } from 'react-bootstrap';
import uploadPDF from "../../assets/upload-pdf.svg"
import { useRouter } from "next/navigation";
import { lato, latoBold } from "../fonts";

export default function FileUploader(
        { 
            setTheScript,
            setScriptTitle,
            isParseLoading,
            setParseLoad, 
            isParseError,
            setParseError, 
            isGPTLoading,
            setGPTLoad, 
            isGPTError, 
            setGPTError,
            isTTSLoading,
            setTTSLoad, 
            isTTSError,
            setTTSError
        }
    ) {

    // const cancelButtonRef = useRef(null)
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [dialogueScript, setDialogueScript] = useState([]);

    const [uploadLoading, setUploadLoading] = useState(false);        
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    const [boxBorder, setBoxBorder] = useState("2px dotted #3E3C3C");

    // this acts as like grabbing the inputelement and clicking it 
    const inputRef = useRef<HTMLInputElement>(null);

    // we act as if we're clicking it 
    const handleUploadClick = () => {
        inputRef.current?.click();
    }

    const router = useRouter();

    // useEffect(() => {
    //     if (loadingPercentage === 100) {
    //         router.push('/view')
    //     }
    // }, [loadingPercentage]);

    // this function handles the actual saving of the file to our local file
    // we will need to refactor eventually to save the files to a google storage?
    // TODO: check to see if we even need to save the files??
    const handleDisplayFileDetails = async () => {
        console.log(inputRef.current?.files[0]?.name);
        setScriptTitle(inputRef.current?.files[0]?.name);

        // we check to see that a file is chosen & we set the fileName state to the value 
        inputRef.current?.files && 
        await setFileName(inputRef.current?.files[0]?.name);
        // we set the file here 
        await setFile(inputRef.current?.files[0]);
        setLoadingPercentage(25);

        const targetFile = inputRef.current?.files[0];

        const formData = new FormData();
        formData.append("file", targetFile);

        const fileToParse = inputRef.current?.files[0]?.name;

        try {
            const res = await fetch("/api/upload", {
              method: "POST",
              body: formData
            });

            const data: { status: number } = await res.json();

            // if file has been successfully uploaded, we now want to pass it into parseFN
                // else we want to throw an error here 
            data.status === 200 ? 
                parseDocument(fileToParse) 
                : null;

        } catch (error) {
            console.log('error', error);
            console.error("something went wrong, check your console there.");
            router.push("/script/error")
        }

    }

    const parseDocument = async (inputFile) => {

        const formData = new FormData();
        formData.append("fileName", inputFile);

        const targetFileName = formData.get("fileName");

        setUploadLoading(true);
        setBoxBorder("2px solid #DDDDDD");
        setParseLoad(true);

        try {
            const res = await fetch("/api/docAI_parse", {
                method: "POST",
                body: JSON.stringify(targetFileName),
                headers: {"Content-Type": "application/json"}
            });

            const res_data: { scriptObjects: [] } = await res.json();

            const arrayOfEntities: entityObject[] = res_data.scriptObjects;

            console.log('returned from workbench', arrayOfEntities);

            setLoadingPercentage(50);
            promptChatGPT(arrayOfEntities);
        } catch (error) {
            setParseError(true);
            console.log("error", error);
            console.error("something went wrong, check your console.");
            router.push("/script/error")
        }
    }

    const convertTextToSpeech = async (input: string) => {

        const sizeOfFile = new Blob([input]).size;

        setLoadingPercentage(100); //moved here so we can navigate to /view once script is fully loaded
        setGPTLoad(false);
        setTTSLoad(true);
        
        if (sizeOfFile < 4000) {
            try {
                const res = await fetch("/api/gc_TTS", {
                    method: "POST",
                    body: JSON.stringify(input),
                    headers: {"Content-Type": "audio/mp3"}
                }); 
                
                const res_data = await res.json();
                const arrayBuffer = Buffer.from(res_data.buffer);
                
                setTTSLoad(false);
                // instead of passing the audio buffer directly into our play function, we'd now send it back 
                return arrayBuffer;
            } catch (error) {
                console.log("TTS error", error);
                console.error("something went wrong with text to speech, check your console");
                router.push("/script/error")
            }
        } else {
            setTTSError(true);
            console.error("The file is too big");
            
            // STRETCH GOAL: IF FILE IS BIGGER, WE NEED TO USE GOOGLE'S LONG AUDIO FORM API (still in preview mode)
            
            // try {
            //     const res = await fetch("/api/gc_TTS_LA", {
            //         method: "POST",
            //         body: JSON.stringify(script),
            //         headers: {"Content-Type": "audio/mp3"}
            //     });

            //     const res_data = await res.json();

            //     console.log('before', res_data.buffer);
            //     const arrayBuffer = Buffer.from(res_data.buffer);

            //     console.log('after', arrayBuffer);
            //     playAudioScript(arrayBuffer);

            // } catch (error) {
            //     console.log("TTS Long Audio error", error);
            //     console.error("Something went wrong with the text to speech for long audio, check your console");
            // }
        }
    };

    // function to call the chatgpt function
    // INPUT: an array of objects with format: [ { type: CHARACTER_BLOCK / SCENE_SCTION, text: string, position: { x: number, y: number } } ] 
    // OUTPUT: nothing is returned, but it creates an array of objects: [ { name: string, line: string, audioBuffer: Buffer }]
    const promptChatGPT = async (scriptBlocks: entityObject[]) => {

        setGPTLoad(true);
        setParseLoad(false);
        setLoadingPercentage(75);

        try {
            const res = await fetch("/api/openAI_GPT", {
                method: "POST",
                body: JSON.stringify(scriptBlocks),
                headers: {"Content-Type": "application/json"}
            });

            const res_data: { dialogueScript: DialogueObject[] } = await res.json();
            
            const arrayOfLines = res_data.dialogueScript;

            console.log('returned from chatGPT', arrayOfLines);

            if (arrayOfLines) {
                arrayOfLines.forEach(async (dialogueLine) => {
                    // we grab dialogueLine.line pass it into tts
                    // grab the returned audiobuffer and add to objects property

                    if (dialogueLine.type !== "SCENE_ACTION") {
                        // we want to avoid TTS reading parenthesis stuff
                        const lineWithoutParenthesis = dialogueLine.line && dialogueLine.line.replace(/ *\([^)]*\) */g, "");

                        const convertedAudioBuffer = await convertTextToSpeech(lineWithoutParenthesis);
                        // at this point each object now has an audiobuffer type appended to the object. 
                        dialogueLine.audioBuffer = convertedAudioBuffer;
                    }
                });
            }

            await setDialogueScript(arrayOfLines);
            await setTheScript(arrayOfLines);

        } catch (error) {
            setGPTError(true);
            console.log("GPT error", error);
            console.error("something went wrong with chat gpt, check your console");
            router.push("/script/error")
        }
    }   

    // return (
    //     <>
    //         <button
    //             className="bg-blue-200 text-black active:bg-blue-500 font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
    //             type="button"
    //             onClick={() => setOpen(true)}>
    //             Upload a file.
    //         </button>
    //         {/* all of this below is the modal that comes up */}
    //         {setOpen && !uploadLoading ? (
    //             <Transition.Root show={open} as={Fragment}>
    //                 <Dialog id="fileUploader" as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
    //                     <Transition.Child
    //                         as={Fragment}
    //                         enter="ease-out duration-300"
    //                         enterFrom="opacity-0"
    //                         enterTo="opacity-100"
    //                         leave="ease-in duration-200"
    //                         leaveFrom="opacity-100"
    //                         leaveTo="opacity-0"
    //                     >
    //                         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    //                     </Transition.Child>
    //                     <div className="fixed inset-0 z-10 overflow-y-auto">
    //                         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    //                             <Transition.Child
    //                                 as={Fragment}
    //                                 enter="ease-out duration-300"
    //                                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //                                 enterTo="opacity-100 translate-y-0 sm:scale-100"
    //                                 leave="ease-in duration-200"
    //                                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
    //                                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //                             >
    //                                 <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
    //                                     <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    //                                         <div className="sm:flex sm:items-start">
    //                                             <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
    //                                                 <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
    //                                             </div>
    //                                             <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
    //                                                 <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
    //                                                     File Upload
    //                                                 </Dialog.Title>
    //                                                 <div className="mt-2">
    //                                                     <p className="text-sm text-gray-500">
    //                                                         Upload your script here.
    //                                                     </p>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                     <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
    //                                         <form method="POST" onSubmit={onFileUpload}>
    //                                             <input type="file" onChange={onFileChange}/>
    //                                             <button 
    //                                                 type="submit"
    //                                                 className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
    //                                             >
    //                                                 Upload
    //                                             </button>
    //                                             <button
    //                                                 type="button"
    //                                                 // className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:ml-3 sm:w-auto"
    //                                                 className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
    //                                                 onClick={() => setOpen(false)}
    //                                                 ref={cancelButtonRef}>
    //                                                 Cancel
    //                                             </button>
    //                                         </form>
    //                                     </div>
    //                                 </Dialog.Panel>
    //                             </Transition.Child>
    //                         </div>
    //                     </div>
    //                 </Dialog>
    //             </Transition.Root>
    //         ) : null }
    //     </>
    // )

    return (
         // /* implement drag and drop later */
        <>
            <Card className="text-center .shadow-5"  style={{ width: '560px', height: '272px', border: `${boxBorder}`}}>
                <Card.Header className="d-flex justify-content-end" style={{ background: "none", border: "none"}}>
                    {/* should cancel api calls when button is clicked  */}
                    <Button variant="none" className="" href="/">x</Button>
                </Card.Header>
                { !uploadLoading ? (
                    <Card.Body>
                        <div className="mx-auto" style={{   
                            margin: "0",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}>
                            {/* PROB GOING TO NEED TO CHANGE THIS TBH */}
                            <div style={{marginBottom: "33px"}}>
                                <p className={lato.className} style={{fontSize:"16pt"}}>Drag and Drop or <span className={latoBold.className} style={{fontSize:"16pt"}}>Choose a PDF</span> to Upload</p>
                            </div>
                            {/* what's happening with on file change and upload?? */}
                            {/* <form method="POST" onSubmit={onFileUpload}>
                                <input type="file" onChange={onFileChange}/>
                                <br />
                            </form> */}
                            <input ref={inputRef} onChange={handleDisplayFileDetails} className="d-none" type="file" hidden/>
                            <button
                                onClick={handleUploadClick}
                                className={`btn btn-outline-${
                                    fileName ? "success" : "none"
                                }`}
                                style={{ padding: '0' }}
                            >
                                {fileName ? fileName : 
                                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.75 55H7C5.89543 55 5 54.1046 5 53V7C5 5.89543 5.89543 5 7 5H25.472C25.9724 5 26.4546 5.18757 26.8235 5.52569L40.6014 18.1555C41.0147 18.5343 41.25 19.0692 41.25 19.6298V21.25" stroke="#EC5500" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M26.25 6.25V16.75C26.25 17.8546 27.1454 18.75 28.25 18.75H40" stroke="#EC5500" strokeWidth="2" strokeLinejoin="round"/>
                                        <circle cx="41.25" cy="41.25" r="13.75" stroke="#EC5500" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M41.25 35V47.5" stroke="#EC5500" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M35 41.25H47.5" stroke="#EC5500" strokeWidth="2" strokeLinejoin="round"/>
                                    </svg>
                                }
                            </button>
                        </div>
                    </Card.Body>) 
                    : (<Card.Body>
                        {/* <div className="mx-auto" style={{   
                            margin: "0",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}> */}
                        {/* why isn't the progress bar showing */}
                        <ProgressBar now={loadingPercentage} 
                            style={{ width: "50%", margin: "auto", backgroundColor: "white", height: "35px", borderRadius: "50px", border: "1px solid #DDD", borderStyle: "double" }}
                        />                       
                        <p className={lato.className} style={{fontSize:"16pt"}}>Moby is preparing your script.</p>
                        {/* </div> */}
                        {/* <div>
                            {isParseLoading ? <p>DOCUMENT IS PARSING</p> : <></>}
                            {isParseError ? <p>PARSING HAD ERROR. PLEASE TRY AGAIN</p> : <></>}
                            {isGPTLoading ? <p>GPT IS LOADING</p> : <></>}
                            {isGPTError ? <p>GPT HAD ERROR. PLEASE TRY AGAIN</p> : <></>}
                            {isTTSLoading ? <p>TTS IS LOADING</p> : <></>}
                            {isTTSError ? <p>TTS HAD ERROR. PLEASE TRY AGAIN</p> : <></>}
                        </div> */}
                    </Card.Body>)                 
                }
            </Card>
        </>)
}