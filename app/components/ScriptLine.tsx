import { FC } from "react";
import { lato } from "../fonts";

interface ScriptLineProps {
    type?: string,
    name: string
    text: string,
    keyProp?: number
}

const ScriptLine: FC<ScriptLineProps> = ({ type, name, text, keyProp }) => {

    // console.log('should be highlighted', shouldBeHighlighted);

    // if (type && type === 'SCENE_ACTION') {
    //     if (shouldBeHighlighted) {
    //         return (
    //             <div className="relative isolate px-6 pt-14 lg:px-8">   
    //                 <div className="text-left selection:bg-yellow-300">{text}</div>
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div className="relative isolate px-6 pt-14 lg:px-8">
    //                 <div className="text-left">{text}</div>
    //             </div>
    //         )
    //     }
    // } else {
    //     return shouldBeHighlighted ? (
    //         <div className="relative isolate px-6 pt-14 lg:px-8">
    //             <div className="text-center">{name}</div> 
    //             <div className="text-center selection:bg-yellow-300">{text}</div>
    //         </div>
    //     ) :
    //     (
    //         <div className="relative isolate px-6 pt-14 lg:px-8">
    //             <div className="text-center">{name}</div> 
    //             <div className="text-center">{text}</div>
    //         </div>
    //     )
    // }

    return type && type === 'SCENE_ACTION' ? (
        <div className="relative isolate px-6 pt-14 lg:px-8" style={{ margin: "1%"}}>
            <div className="text-left">
                <span className={lato.className} style={{fontSize:"16pt"}}>{text}</span>
            </div>
        </div>
    ) : (
        <div className="relative isolate px-6 pt-14 lg:px-8" style={{ margin: "1%"}}>
            <div className="text-center">
                <span className={lato.className} style={{fontSize:"16pt"}}>{name}</span>
            </div> 
            <div className="text-left" style={{marginLeft:"20%", marginRight:"20%"}}>
                <span id={`dialogue${keyProp}`} className={lato.className} style={{fontSize:"16pt"}}>{text}</span>
            </div>
        </div>
    )
}

export default ScriptLine;