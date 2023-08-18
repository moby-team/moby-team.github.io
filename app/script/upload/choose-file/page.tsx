"use client"

import { useState } from 'react';
// import FileUploader from '../../../components/FileUploader';
import FileUploader from '../../../components-dark-mode/FileUploader';

// import WelcomeUser from '../../../components/WelcomeUser';
import WelcomeUser from '../../../components-dark-mode/WelcomeUser';

import ScriptView from '../../../components/ScriptView';
import MobyNavbar from '../../../components/MobyNavbar';
// import UserInputModal from '../../../components/UserInputModal';
import UserInputModal from '../../../components-dark-mode/UserInputModal';

import SpeechToTextV2 from '../../../components/sstv2';
// import Dialogue from '../../../components-dark-mode/Dialogue';

// import ScriptsContent from '../../../components/ScriptContent';
import ScriptsContent from '../../../components-dark-mode/ScriptContent';
import { ProgressBar } from 'react-bootstrap';


export default function ChooseFile() {

    const [scriptDialogue, setScriptDialogue] = useState([]);

    const [parseLoading, setParseLoading] = useState(false);
    const [parseError, setParseError] = useState(false);

    const [gptLoading, setGPTLoading] = useState(false);
    const [gptError, setGPTError] = useState(false);
    
    const [ttsLoading, setTTSLoading] = useState(false);
    const [ttsError, setTTSError] = useState(false);
    const [scriptTitle, setScriptTitle] = useState('');

    const [chosenCharacter, setChosenCharacter] = useState<string | undefined>(undefined);
    const [showScript, setShowScript] = useState<boolean | undefined>(false);

    const [startReading, setStartReading] = useState(false);

    return (
        <div 
            style={{
                margin: "0",
                width: "100%",
                height: '100vh',
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#1F2123"
        }}>
            { scriptDialogue.length > 0 ? (
                    // if character has not been chosen yet, we do not surface the scriptview
                    !showScript ? 
                    <>
                        <UserInputModal 
                            scriptTitle={scriptTitle}
                            scriptDialogue={scriptDialogue} 
                            chooseCharacter={setChosenCharacter} 
                            showScript={setShowScript}
                        />
                    </>    
                    : <div style={{ height: "100vh"}}> 
                        {/* <ScriptView script={scriptDialogue}/> */}
                        <ScriptsContent scriptTitle={scriptTitle} script={scriptDialogue} clickStart={setStartReading}/>
                        {/* <Dialogue scriptToRead={scriptDialogue} chosenCharacter={chosenCharacter} /> */}
                        <SpeechToTextV2 scriptToRead={scriptDialogue} chosenCharacter={chosenCharacter} clickedStart={startReading}/>
                    </div>
                ) : (
                    <>
                        <WelcomeUser />
                        <FileUploader 
                            setTheScript={setScriptDialogue}
                            setScriptTitle={setScriptTitle}
                            isParseLoading={parseLoading}
                            setParseLoad={setParseLoading}
                            isParseError={parseError}
                            setParseError={setParseError}
                            isGPTLoading={gptLoading}
                            setGPTLoad={setGPTLoading}
                            isGPTError={gptError}
                            setGPTError={setGPTError}
                            isTTSLoading={ttsLoading}
                            setTTSLoad={setTTSLoading}
                            isTTSError={ttsError}
                            setTTSError={setTTSError}
                        />
                    </>
                    
                )
            }
        </div>
    ) 
}