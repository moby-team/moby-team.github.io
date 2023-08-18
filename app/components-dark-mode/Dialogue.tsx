import { FC, useState } from 'react';

const fuzzball = require('fuzzball');

// we want to pass in the script and character name

interface DialogueProps {
    scriptToRead: {
        type: string,
        name: string, 
        line: string, 
        audioBuffer: any
    }[],
    chosenCharacter: string
}

const Dialogue: FC<DialogueProps> = ({ scriptToRead, chosenCharacter }) => {

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
            document.getElementById(lineId).style.backgroundColor = "yellow";
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
            document.getElementById(lineId).style.backgroundColor = "rgba(236, 85, 0, 0.3)";
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
            const copyArrayBuffer = currentLineObj.audioBuffer && currentLineObj.audioBuffer.slice(0);
            // playAudioScript(currentLineObj.audioBuffer);
            playAudioScript();
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

    const playAudioScript = async () => {

        console.log('entered audio fn');
        mobyTurnLineFormat(true);
        
        const currMobyLine = document.getElementById(`dialogue${currentIndex}`).innerHTML;
        console.log(currMobyLine);
        // <TextToSpeech currLine={currMobyLine}/>
        console.log('entered text to speech new comp')
  // Initialise Web Speech API
  const synth = window.speechSynthesis || window.webkitSpeechSynthesis;

  // Query DOM Elements 
  const textForm = document.querySelector("form");
  // const textInput = document.getElementById(currLine);
  // const rate = document.getElementById("rate");
  // const rateValue = document.getElementById("rate-value");
  // const pitch = document.getElementById("pitch");
  // const pitchValue = document.getElementById("pitch-value");
  const accentSelect = document.getElementById("voice-select");
  const body = document.querySelector('body');

  // API call to query accents
  let accents = synth.getVoices();
  console.log(currMobyLine);
  // const getAccents = () => {
  //     accents = synth.getVoices();

  //     // Create accents drop down
  //     accents.forEach(a => {
  //       console.log(a);
  //         const choice = document.createElement('option');

  //         // Specify voice and language for choice
  //         choice.textContent = a.name + ' (' + a.lang + ')';

  //         // Set attributes for choice
  //         choice.setAttribute('lang', 'en-US');
  //         // choice.setAttribute('name', a.name);

  //         accentSelect.appendChild(choice);
  //     });
  // }

  // for async API call
  // getAccents();
  // if (synth.onvoiceschanged !== undefined) {
  //     synth.onvoiceschanged = getAccents;
  // }

  // Speech synthesis 
  const speech = () => {
    
      // Check if already speaking
      if (synth.speaking) {
          console.error('Already speaking..');
          return;
      }

      // Check for empty text input
      if (currMobyLine !== '') {

          // Speech waves
          // body.style.background = '#0099CC url(assets/wave.gif)';
          // body.style.backgroundRepeat = 'repeat-x';
          // body.style.backgroundSize = '50% 12%';

          // Pass text for speech
          const speak = new SpeechSynthesisUtterance(currMobyLine);
          speak.lang = 'en-US';
          speak.voice = accents[146];
          
          // End of speech
          speak.onend = e => {
              console.log('# of seconds that passed', e.elapsedTime)
              console.log('End of speech');
                mobyTurnLineFormat(false);

              // body.style.background = '#0099CC';
              currentIndex++;
            startDialogue();
          }

          // Speech error
          speak.onerror = e => {
              console.log('Something went wrong');
          }

          // Selected choice of accent
          // const selectedVoice = accentSelect.selectedOptions[0].getAttribute('name');

          // accents.forEach(a => {
          //     if (a.name === selectedVoice) {
          //         // Set selected voice for speech
          //         speak.voice = a;
          //     }
          // });

          // Set pitch and rate
          speak.rate = 0.9;
          speak.pitch = 1;

          // Speak
          synth.speak(speak);
      }
  }

  // Event Listeners
  speech();

  // Synthesis button
  // textForm.addEventListener('submit', e => {
  //     e.preventDefault();
  //     speech();
  // });

  // Rate and Pitch
  // rate.addEventListener('change', e => rateValue.textContent = rate.value);
  // pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);
//   return (
//     <></>
//   )

    //     // mobyTurnLineFormat(currMobyLine, true);
    //     mobyTurnLineFormat(true);

    //     // const copyArrayBuffer = arrayBuffer.slice(0);
    //     // console.log('copy', copyArrayBuffer);

    //     let audioContext = new AudioContext();
    //     let outputSource;
        
    //     try {
    //         if (await arrayBuffer.byteLength > 0) {
    //             audioContext.decodeAudioData(arrayBuffer.buffer,
    //             (buffer) => {
    //                 audioContext.resume();
    //                 outputSource = audioContext.createBufferSource();
    //                 outputSource.connect(audioContext.destination);
    //                 outputSource.buffer = buffer;
    //                 outputSource.start(0);

    //                 outputSource.addEventListener("ended", () => {
    //                     console.log('moby turn over');
    //                     // is this the right place to unhighlight
    //                     // mobyTurnLineFormat(currMobyLine, false);
    //                     mobyTurnLineFormat(false);

    //                     currentIndex++;
    //                     startDialogue();
    //                 });

    //             }, (err) => {
    //                 console.log('Error parsing through arrayBuffer', err.message);
    //             });
    //         } else {
    //             // mobyTurnLineFormat(currMobyLine, false);
    //             // mobyTurnLineFormat(false);
    //             console.error("did not find any arguments");
    //         }
    //     } catch(e) {
    //         console.log(e);
    //     }


    //     // try {
    //     //     if (copyArrayBuffer.byteLength > 0) {
    //     //         audioContext.decodeAudioData(copyArrayBuffer.buffer,
    //     //         (buffer) => {
    //     //             audioContext.resume();
    //     //             outputSource = audioContext.createBufferSource();
    //     //             outputSource.connect(audioContext.destination);
    //     //             outputSource.buffer = buffer;
    //     //             outputSource.start(0);

    //     //             outputSource.addEventListener("ended", () => {
    //     //                 console.log('moby turn over');
    //     //                 // is this the right place to unhighlight
    //     //                 // mobyTurnLineFormat(currMobyLine, false);
    //     //                 mobyTurnLineFormat(false);

    //     //                 currentIndex++;
    //     //                 startDialogue();
    //     //             });

    //     //         }, (err) => {
    //     //             console.log('Error parsing through arrayBuffer', err.message);
    //     //         });
    //     //     } else {
    //     //         // mobyTurnLineFormat(currMobyLine, false);
    //     //         // mobyTurnLineFormat(false);
    //     //         console.error("did not find any arguments");
    //     //     }
    //     // } catch(e) {
    //     //     console.log(e);
    //     // }


    //     return;

        return;
    }

    return (
        <></>
    )   
}

export default Dialogue;