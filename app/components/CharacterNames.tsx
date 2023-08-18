// input: string name
// output: an option element with the value of the string name

import { FC, useState } from "react";
import { poppins } from "../fonts";

interface CharacterNamesProps {
    listOfNames: {
        name: string,
        line: string, 
        audioBuffer: Buffer
    }[],
    chooseCharacter?: Function
};

const CharacterNames: FC<CharacterNamesProps> = ({ listOfNames, chooseCharacter }) => {

    // generate a set of unique names from the returned list 
    // we want to remove any parenthesis here and gra the unique names

    // make sure we remove parenthesis here before creating unique names
    listOfNames.forEach((obj) => {
        if (obj.name) {
            obj.name = obj.name.replace(/ *\([^)]*\) */g, "")
        }
    }); 

    const uniqueNames = [...new Set(listOfNames.map((lineObj) => lineObj.name))];
    const [nameChosen, setNameChosen] = useState('');

    const handleNameSelection = (e) => {
        chooseCharacter(e.target.value);
        setNameChosen(e.target.value);
    }

    return (
        <>
            <select 
                value={nameChosen}
                onChange={(e) => handleNameSelection(e)}
                style={{ width: "100%", textAlign: "center", padding: "10px", border: "1px solid #DDD", borderRadius: "5px" }}
            >
                {uniqueNames.map((name, id) => {
                    if (name) {
                        const onlyName = name
                        return <option key={id} value={onlyName} className={poppins.className} style={{ color: "#3D3D3D"}}>{onlyName}</option>
                    }
                })}
            </select>
        </>
    )
}

export default CharacterNames;