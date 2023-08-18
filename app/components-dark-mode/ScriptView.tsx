// input: the array of destructured entities
// output: a formatted script

import { FC, useState } from "react";
import ScriptLine from "./ScriptLine";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import { interBold, lato } from "../fonts";

interface ScriptViewProps {
    script: {
        type: string, 
        name: string,
        line: string,
        text: string,
        audioBuffer: Buffer
    }[],
    clickStart: Function
}

const ScriptView: FC<ScriptViewProps> = ({ script, clickStart }) => {

    const [show, setShow] = useState<boolean | undefined>(true);

    // script should be destructurd objects with {type: CHARACTER_BLOCK | SCENE_ACTION, text: string }
    let dialogueOnlyIndex = -1;

    let blur = show ? "blur(10px)" : "none"

    return (
        <>
            <div style={{ filter: `${blur}`, background: "transparent", textAlign: "center"}}>
                <Modal
                    centered
                    size="lg"
                    show={show}
                    style={{ backgroundColor: "transparent", border: "none"}}
                >
                    <Modal.Body 
                        style={{ background: "transparent", border: "none", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}
                    >
                        <p className={interBold.className} style={{ fontSize: "24px", textAlign: "center", color: "#fff" }}>Say "start" to begin reading or click the Start button. <br/> Click the Restart Script button at any time to go from the top.</p>
                        {/* need to implement how to start the script */}
                        <Button onClick={() => setShow(false)} style={{ padding: "15px", width: "94px", height: "50px", backgroundColor: "#D65600", color: "#fff", lineHeight: "100%", border: "none", marginTop: "32px"}}>Got it</Button>
                    </Modal.Body>
                </Modal>   
                <Button onClick={() => clickStart(true)} className={lato.className} style={{ backgroundColor: "#D65600", width: "87px", height: "50px", color: "#fff", border: "none", fontSize: "16px", marginBottom: "48px"}}>Start</Button>
            <div style={{ padding: "0 10%", height: "80vh", overflowY: "scroll" }}>
                { script.map((dialogueObj, id) => { 
                    if (dialogueObj.type === "SCENE_ACTION") {
                        return <ScriptLine key={id} type={dialogueObj.type} name={''} text={dialogueObj.text} />
                    } else {
                        dialogueOnlyIndex++;
                        return <ScriptLine key={id} keyProp={dialogueOnlyIndex} type={dialogueObj.type} name={dialogueObj.name} text={dialogueObj.line} />
                }})}
            </div>  
            </div>
    </>
    )
}

export default ScriptView;