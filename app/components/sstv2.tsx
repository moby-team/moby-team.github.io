import { FC, useEffect } from 'react';

const fuzzball = require('fuzzball');

// we want to pass in the script and character name

interface SpeechToTextProps {
    scriptToRead: {
        type: string,
        name: string, 
        line: string, 
        audioBuffer: any
    }[],
    chosenCharacter: string,
    clickedStart: boolean
}

const SpeechToTextV2: FC<SpeechToTextProps> = ({ scriptToRead, chosenCharacter, clickedStart }) => {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    let recognition = new SpeechRecognition();

    console.log('script', scriptToRead);
    console.log('character that the user has identified', chosenCharacter);

    let dialogueOnlyScript = scriptToRead.filter((obj) => {
        return obj.type !== 'SCENE_ACTION'
    });

    // there has to be some form of tracking 
    let currentIndex = 0;
    // let currInnerHtml = '';
    let userTurn = false;
    let mobyTurn = false;

    useEffect(() => {
        clickedStart ? startDialogue() : null;
    }, [clickedStart])
    
    // const userTurnLineFormat = (currLineInnerHtml, start) => {
    const userTurnLineFormat = (start) => {
        const lineId = `dialogue${currentIndex}`;
        // console.log(lineId, '+', currInnerHtml);
        console.log(lineId);
        // let newInnerHtml = '';
        if (start) {
            console.log('in user start turn');
            userTurn = true;
            // currInnerHtml = currLineInnerHtml; // to keep track of what it was previously
            // newInnerHtml = currInnerHtml.replace(currInnerHtml, '<span style="background-color:yellow;">' + currInnerHtml + '</span>');
            // document.getElementById(lineId).innerHTML = newInnerHtml;
            document.getElementById(lineId).style.backgroundColor = "#558397";
        } else {
            console.log('in user end turn');
            userTurn = false;
            document.getElementById(lineId).style.backgroundColor = "transparent";
            // newInnerHtml = currInnerHtml;
            // document.getElementById(lineId).innerHTML = newInnerHtml;
        }
        return;
    }

    // const mobyTurnLineFormat = (currLineInnerHtml, start) => {
    const mobyTurnLineFormat = (start) => {
        // let newInnerHtml = document.getElementById(lineId).innerHTML;
        const lineId = `dialogue${currentIndex}`;
        // console.log(lineId, '+', currInnerHtml);
        console.log(lineId);
        // let newInnerHtml = '';
        if (start) {
            console.log('in moby start turn');
            mobyTurn = true;
            // currInnerHtml = currLineInnerHtml; // to keep track of what it was previously
            // newInnerHtml = currInnerHtml.replace(currInnerHtml, '<span style="background-color:rgba(236, 85, 0, 0.3)">' + currInnerHtml + '</span>');
            // document.getElementById(lineId).innerHTML = newInnerHtml;
            document.getElementById(lineId).style.backgroundColor = "#4D4C4C";
        } else {
            console.log('in moby end turn');
            mobyTurn = false;
            // newInnerHtml = currInnerHtml;
            // document.getElementById(lineId).innerHTML = newInnerHtml;
            document.getElementById(lineId).style.backgroundColor = "transparent";
        }
        return;
    }
    // there should be a function called start dialogue that 
    const startDialogue = () => {

        if (currentIndex >= dialogueOnlyScript.length) {
            console.log('mobyTurn', mobyTurn);
            console.log('userTurn', userTurn);

            // const lastScriptLine = document.getElementById(`dialogue${currentIndex - 1}`).innerHTML;

            if (mobyTurn) {
                // mobyTurnLineFormat(lastScriptLine, false);
                mobyTurnLineFormat(false);
            } else if (userTurn) {
                // userTurnLineFormat(lastScriptLine, false)
                userTurnLineFormat(false)
            }

            console.log('DONE');
            const endRecognition = new SpeechRecognition();
            endRecognition.start();
            endRecognition.stop();

            return;
        }

        const currentLineObj = dialogueOnlyScript[currentIndex];
        const objName = currentLineObj.name.valueOf();

        if (objName == chosenCharacter) {

            const newRecognition = new SpeechRecognition();

            console.log('enters user block');
            // const currScriptLine = document.getElementById(`dialogue${currentIndex}`).innerHTML;
            // userTurnLineFormat(currScriptLine, true);
            userTurnLineFormat(true);

            newRecognition.onresult = (e) => {
                const transcript = e.results[0][0].transcript.toLowerCase().replace(/\s/g, '');
                console.log('transcribed: ', transcript);

                checkSpeechAgainstTranscript(transcript);
            }

            newRecognition.continuous = true;
            newRecognition.start();

            console.log('listening...');
        } else {
            console.log('enters reader block');
            // const copyArrayBuffer = currentLineObj.audioBuffer && currentLineObj.audioBuffer.slice(0);
            const buffer = new Uint8Array(currentLineObj.audioBuffer.data);
            playAudioScript(buffer);
            // playAudioScript(copyArrayBuffer);
        }
    }

    // once user identifies start we go 
    if (scriptToRead.length > 0) {

        recognition.onresult = (e) => {
            const transcript = e.results[e.results.length - 1][0].transcript.toLowerCase().replace(/\s/g, '');
            console.log('start command?: ', transcript);

            if (transcript === 'start') {
                startDialogue();
            }
        }
        
        recognition.continuous = true;
        recognition.start();
        console.log('ready to begin');
    }

    const checkSpeechAgainstTranscript = (transcribedString) => {

        // const currUserLine = document.getElementById(`dialogue${currentIndex}`).innerHTML;

        console.log('entered speech fn');

        let bestMatch = null;
        let bestScore = -1;

        // compare the two strings without anything in parentheses
        const score = fuzzball.ratio(transcribedString, dialogueOnlyScript[currentIndex].line.replace(/ *\([^)]*\) */g, ""));

        if (score > bestScore) {
            bestScore = score;
            bestMatch = dialogueOnlyScript[currentIndex].line;
        }

        // TODO: keep in mind the call stack
        // in order for the call stack everything needs to return

        if (bestScore > 70) {
            // userTurnLineFormat(currUserLine, false)
            userTurnLineFormat(false)
            currentIndex++;
            startDialogue();
        } else {
            // without incrementing the index, the script stays at the same place
            // so we just listen again
            startDialogue();
        }

        return;
    }

    const playAudioScript = async (arrayBuffer) => {

        console.log('entered audio fn');
        console.log('asdfasd', arrayBuffer);

        // const currMobyLine = document.getElementById(`dialogue${currentIndex}`).innerHTML;
        // mobyTurnLineFormat(currMobyLine, true);
        mobyTurnLineFormat(true);

        // const copyArrayBuffer = arrayBuffer.slice(0);
        // console.log('copy', copyArrayBuffer);

        let audioContext = new AudioContext();
        let outputSource;
        
        try {
            if (await arrayBuffer.byteLength > 0) {
                audioContext.decodeAudioData(arrayBuffer.buffer,
                (buffer) => {
                    audioContext.resume();
                    outputSource = audioContext.createBufferSource();
                    outputSource.connect(audioContext.destination);
                    outputSource.buffer = buffer;
                    outputSource.start(0);

                    outputSource.addEventListener("ended", () => {
                        console.log('moby turn over');
                        // is this the right place to unhighlight
                        // mobyTurnLineFormat(currMobyLine, false);
                        mobyTurnLineFormat(false);

                        currentIndex++;
                        startDialogue();
                    });

                }, (err) => {
                    console.log('Error parsing through arrayBuffer', err.message);
                });
            } else {
                // mobyTurnLineFormat(currMobyLine, false);
                // mobyTurnLineFormat(false);
                console.error("did not find any arguments");
            }
        } catch(e) {
            console.log(e);
        }


        // try {
        //     if (copyArrayBuffer.byteLength > 0) {
        //         audioContext.decodeAudioData(copyArrayBuffer.buffer,
        //         (buffer) => {
        //             audioContext.resume();
        //             outputSource = audioContext.createBufferSource();
        //             outputSource.connect(audioContext.destination);
        //             outputSource.buffer = buffer;
        //             outputSource.start(0);

        //             outputSource.addEventListener("ended", () => {
        //                 console.log('moby turn over');
        //                 // is this the right place to unhighlight
        //                 // mobyTurnLineFormat(currMobyLine, false);
        //                 mobyTurnLineFormat(false);

        //                 currentIndex++;
        //                 startDialogue();
        //             });

        //         }, (err) => {
        //             console.log('Error parsing through arrayBuffer', err.message);
        //         });
        //     } else {
        //         // mobyTurnLineFormat(currMobyLine, false);
        //         // mobyTurnLineFormat(false);
        //         console.error("did not find any arguments");
        //     }
        // } catch(e) {
        //     console.log(e);
        // }


        return;
    }

    return (
        <></>
    )   
}

export default SpeechToTextV2;