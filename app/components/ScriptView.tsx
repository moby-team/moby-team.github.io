// input: the array of destructured entities
// output: a formatted script

import { FC } from "react";
import ScriptLine from "./ScriptLine";

interface ScriptViewProps {
    script: {
        type: string, 
        name: string,
        line: string,
        text: string,
        audioBuffer: Buffer
    }[]
}

const ScriptView: FC<ScriptViewProps> = ({ script }) => {

    // script should be destructurd objects with {type: CHARACTER_BLOCK | SCENE_ACTION, text: string }
    let dialogueOnlyIndex = -1;

    return (
        // if the script.type === 'CHARACTER_BLOCK' then we want to style the text with a center div 
        <div className="relative isolate px-6 pt-14 lg:px-8" style={{ padding: "0 20%" }}>
        { script.map((dialogueObj, id) => { 
            if (dialogueObj.type === "SCENE_ACTION") {
                return <ScriptLine key={id} type={dialogueObj.type} name={''} text={dialogueObj.text} />
            } else {
                dialogueOnlyIndex++;
                return <ScriptLine key={id} keyProp={dialogueOnlyIndex} type={dialogueObj.type} name={dialogueObj.name} text={dialogueObj.line} />
        }})}
        </div>
    )
}

export default ScriptView;


// how can we apply the curent Index of the line...
// we need to know which index we're currently at and then in the scriptLine we need to know which index the line is at 

// id lines up with the index of the array 

// can we just pass in a true or false variable 
    // we can't do this because all of the lines will be highlighted and then unhighlighted
    // we need to identify the index too  

// we need a way for us to pass the currentIndex from STT to the SCRIPTVIEW and identify which line should be highlighted 
