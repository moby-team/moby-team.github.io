"use client";

// import UserInputPopup from "./UserInputPopup";
// import { entityObject } from "../api/docAI_parse/route";
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
import whiteRoom from "../../assets/white_room";
import riskManagement from "../../assets/risk_management";

interface ScriptObject {
    type?: string,
    name?: string,
    text?: string,
    line?: string,
    audioBuffer?: Buffer
}

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

    const [boxBorder, setBoxBorder] = useState("2px dotted #B8E2F0");

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

        parseDocument(fileToParse);

        // try {
        //     const res = await fetch("/api/upload", {
        //       method: "POST",
        //       body: formData
        //     });

        //     const data: { status: number } = await res.json();

        //     // if file has been successfully uploaded, we now want to pass it into parseFN
        //         // else we want to throw an error here 
        //     data.status === 200 ? 
        //         parseDocument(fileToParse) 
        //         : null;

        // } catch (error) {
        //     console.log('error', error);
        //     console.error("something went wrong, check your console there.");
        //     router.push("/script/error")
        // }

    }

    const parseDocument = async (inputFile) => {

        const formData = new FormData();
        formData.append("fileName", inputFile);

        const targetFileName = formData.get("fileName") as String;

        console.log('targetFile', targetFileName);

        if (targetFileName.includes("White-Room")) {
            console.log('white');
            promptChatGPT(whiteRoom);
            
        }

        if (targetFileName.includes("Risk-Management")) {
            console.log('risk');
            promptChatGPT(riskManagement)
        }
        
        setUploadLoading(true);
        setBoxBorder("none");
        setParseLoad(true);

        // try {
        //     const res = await fetch("/api/docAI_parse", {
        //         method: "POST",
        //         body: JSON.stringify(targetFileName),
        //         headers: {"Content-Type": "application/json"}
        //     });

        //     const res_data: { scriptObjects: [] } = await res.json();

        //     console.log('res_data', res_data);

        //     const arrayOfEntities: ScriptObject[] = res_data.scriptObjects;
            
        //     setLoadingPercentage(50);
        //     console.log('returned from workbench', arrayOfEntities);
            
        //     promptChatGPT(arrayOfEntities);
        // } catch (error) {
        //     setParseError(true);
        //     console.log("error", error);
        //     console.error("something went wrong, check your console.");
        //     router.push("/script/error")
        // }
    }

    const convertTextToSpeech = async (input: string) => {

        console.log('input', input);

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
    const promptChatGPT = async (scriptBlocks: ScriptObject[]) => {

        setGPTLoad(true);
        setParseLoad(false);
        setLoadingPercentage(75);

        try {
            // const res = await fetch("/api/openAI_GPT", {
            //     method: "POST",
            //     body: JSON.stringify(scriptBlocks),
            //     headers: {"Content-Type": "application/json"}
            // });

            // const res_data: { dialogueScript: DialogueObject[] } = await res.json();
            
            // const arrayOfLines = res_data.dialogueScript;

            // console.log('returned from chatGPT', arrayOfLines);

            // if (arrayOfLines) {
            //     arrayOfLines.forEach(async (dialogueLine) => {
            //         // we grab dialogueLine.line pass it into tts
            //         // grab the returned audiobuffer and add to objects property

            //         if (dialogueLine.type !== "SCENE_ACTION") {
            //             // we want to avoid TTS reading parenthesis stuff
            //             const lineWithoutParenthesis = dialogueLine.line && dialogueLine.line.replace(/ *\([^)]*\) */g, "");

            //             const convertedAudioBuffer = await convertTextToSpeech(lineWithoutParenthesis);
            //             // at this point each object now has an audiobuffer type appended to the object. 
            //             dialogueLine.audioBuffer = convertedAudioBuffer;
            //         }
            //     });
            // }

            console.log('returned from chat', scriptBlocks);
            if (scriptBlocks) {
                scriptBlocks.forEach(async (dialogueLine) => {
                    if (dialogueLine.type !== "SCENE_ACTION") {
                        const lineWithoutParenthesis = dialogueLine.line && dialogueLine.line.replace(/ *\([^)]*\) */g, "");
                        console.log('line', lineWithoutParenthesis);
                        const convertedAudioBuffer = await convertTextToSpeech(lineWithoutParenthesis);
                        dialogueLine.audioBuffer = convertedAudioBuffer;
                    }
                })
            }

            // await setDialogueScript(arrayOfLines);
            // await setTheScript(arrayOfLines);
            await setDialogueScript(scriptBlocks);
            await setTheScript(scriptBlocks);

        } catch (error) {
            setGPTError(true);
            console.log("GPT error", error);
            console.error("something went wrong with chat gpt, check your console");
            router.push("/script/error")
        }
    }   

    return (
         // /* implement drag and drop later */
        <>
            <Card className="text-center .shadow-5"  style={{ width: '446px', height: '231px', border: `${boxBorder}`, backgroundColor:'#3E3E43', marginTop: '32px'}}>
                <Card.Header className="d-flex justify-content-end" style={{ background: "none", border: "none", padding: '0 10px 0 0'}}>
                    {/* should cancel api calls when button is clicked  */}
                    <Button variant="none" className="" href="/">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_705_1930)">
                            <path d="M20 4L4 20" stroke="white" strokeWidth="1.5"/>
                            <path d="M4 4L20 20" stroke="white" strokeWidth="1.5"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_705_1930">
                            <rect width="21" height="20" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </Button>
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
                                <p className={lato.className} style={{fontSize:"16px", color:"#fff"}}>Drag and Drop or <span className={latoBold.className} style={{fontSize:"16px"}}>Choose a PDF</span> to Upload</p>
                            </div>
                            {/* what's happening with on file change and upload?? */}
                            {/* <form method="POST" onSubmit={onFileUpload}>
                                <input type="file" onChange={onFileChange}/>
                                <br />
                            </form> */}
                            <input ref={inputRef} onChange={handleDisplayFileDetails} className="d-none" type="file" hidden/>
                            <button
                                onClick={handleUploadClick}
                                // className={`btn btn-outline-${
                                //     fileName ? "success" : "none"
                                // }`}
                                style={{ padding: '0', fontSize: '16px' }}
                            >
                                {fileName ? fileName : 
                                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.75 55H7C5.89543 55 5 54.1046 5 53V7C5 5.89543 5.89543 5 7 5H25.472C25.9724 5 26.4546 5.18757 26.8235 5.52569L40.6014 18.1555C41.0147 18.5343 41.25 19.0692 41.25 19.6298V21.25" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M26.25 6.25V16.75C26.25 17.8546 27.1454 18.75 28.25 18.75H40" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                                        <circle cx="41.25" cy="41.25" r="13.75" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M41.25 35V47.5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M35 41.25H47.5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
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
                        {/* <div style={{ width: '436px', height: '207px', border: "none", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#3E3E43", borderRadius: "5px"}}> */}
                            <ProgressBar now={loadingPercentage} 
                                style={{ width: '308px', height: '28px', margin: "auto", backgroundColor: "#1F2123", borderRadius: "50px", border: "1px solid #3E3C3C", borderStyle: "double", color: '#EC995C' }}
                            />                      
                            <p style={{fontSize:"16px", color:"#fff", marginTop: '32px'}}>Moby is preparing your script.</p>
                        {/* </div> */}
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