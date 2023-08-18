'use client'

import { useState } from "react";
// import LandingPageContent from "./components/LandingPageContent";
// import MobyHomeNavbar from "./components/MobyHomeNavbar";
import LandingPageContent from "./components-dark-mode/LandingPageContent";
import MobyHomeNavbar from "./components-dark-mode/MobyHomeNavbar";

// TODO: this will require some adjustments with the new designs that we have coming up - page formatting and ordering


export default function Page() {

    const [scriptDialogue, setScriptDialogue] = useState([]);
    const [chosenCharacter, setChosenCharacter] = useState('');

    const [parseLoading, setParseLoading] = useState(false);
    const [parseError, setParseError] = useState(false);

    const [gptLoading, setGPTLoading] = useState(false);
    const [gptError, setGPTError] = useState(false);

    const [ttsLoading, setTTSLoading] = useState(false);
    const [ttsError, setTTSError] = useState(false);

    console.log('what is script', scriptDialogue)
    console.log('who is chosen', chosenCharacter);

    return (
        <main>
            <MobyHomeNavbar />
            <LandingPageContent />
        </main>
    )
}
