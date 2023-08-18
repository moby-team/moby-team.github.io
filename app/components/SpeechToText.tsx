// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import React, { FC, useState, useEffect, useRef } from "react";

// const fuzzball = require('fuzzball');

// interface STTProps {
//     scriptToRead: {
//         name: string, 
//         line: string,
//         audioBuffer: Buffer
//     }[];
//     // we'll have to pass in the user chosen character name
// }

// const SpeechToText: FC<STTProps> = ({ scriptToRead }) => {
//     const commands = [
//         {
//             // command to start script
//             command: 'moby',
//             callback: () => {
//                 // SpeechRecognition.startListening({continuous: true})
//                 // console.log('start');
//                 start();
//             }
//         },
//         {
//             // command to restart script
//             command: 'moby restart',
//             callback: () => {
//                 // SpeechRecognition.stopListening();
//                 console.log('MOBY');
//                 // SpeechRecognition.startListening();
//                 resetTranscript();
//             }
//         },
//         {
//             // command to restart script
//             command: 'stop listening',
//             callback: () => {
//                 SpeechRecognition.stopListening();
//                 console.log('stopped');
//             }
//         },
//         // {
//             // command for following line based on script (this should trigger our app to say next line)
//         //     command: 'clear',
//         //     callback: ({ resetTranscript }) => resetTranscript()
//         // },
//         {
//             command: 'clear',
//             callback: ({ resetTranscript }) => {
//                 console.log('testing');
//                 resetTranscript()
//             }
//         },
//     ]

//     const {
//         transcript,
//         listening,
//         resetTranscript,
//         browserSupportsSpeechRecognition,
//     } = useSpeechRecognition({ commands });

//     if (!browserSupportsSpeechRecognition) {
//         // we may want it to show an error on the page
//         console.log('Browser does not support speech recognition.');
//     } 

//     const [speechTranscript, setSpeechTranscript] = useState('');

//     const mounted = useRef();

//     // NOTE - EDGE CASE
//         // if user says a line that is technically not assigned to their char, what to do?
//     // upon this component rendering, the speech recognition - continuous true is in place 
//     // useEffect runs on the first render AND any time the dependency val changes
//     useEffect(() => {
//         // we are doing this because we want the user to be able to
//         // utilize the commands defined above immediately
//         if (!mounted.current) {
//             SpeechRecognition.startListening({continuous: true});
//         } else {
//             // componentDidUpdate logic
//             start()
//         }

//         // we want continuous listening on render
//         // we want it to stop when 

//         // checkSpeechAgainstTranscript();
//         // we have to determine if the audio plays first or user goes first
//         // if name property of first element of the array is the user's char's name
//             // we want to listen for user's input
//             // as soon as the transcript matches a line within the script
//             // we shift / unshift the script array 
//         // else
//             // invoke resetTranscript fn
//             // invoke stopListening fn
//             // invoke the playAudio fn with the audioBuffer property passed in
//     }, [speechTranscript]);

//     // occur for each user spoken line
//     // setSpeechTranscript(transcript)
//     // check script against speechTranscript
//     // if it matches SpeechRecognition.resetTranscript()
    

//     // continuous listening
//     // SpeechRecognition.startListening({continuous: true})

//     // when do we want to start the listening? as soon as this is rendered?

//     // user gets to page
//     // pass down who the user is going to be reading for
//     // if script starts with AI (if first block of text char name !== char name that user chose)
//         // may need to map through list of characters if there are more than 1 other chars aside from user
//         // start first block of script using tts
//     // else 
//         // start listening for user to speak using stt
//         // possibly compare transcript with respective block of script in case of improv?
//     // when user finishes their part (transcript == block of script)
//         // AI continues script part using tts
//     // recursive until end of script





//     // we'll create a state variable

//     // user says moby

//     // we have to determine whether its the AI reading or user reading
//     // check based on what character name user chose to determine path
//         // if AI reading, 
//             // then we want to immediately invoke the playAudioScript() & pass in the first line
//             // we want to shift the array 
        

//     // now whatever the user says is updated to 'transcript'

//     // we want to use state management to check whenever transcript is changed / modified
//     // then we call the checkSpeechAgainstTranscript function 
//     // & also reset the transcript variable at the end of it 

//     // as soon as page renders to notify user to say moby to start
//         // invoke start listening with continuous true
//         // check speech against transcript -> HOW CAN WE DO THIS
//     // as soon as transcript matches a line
//         // trigger app to play audio of next line
//         // invoke start listening with continuous true
//     // recursive call until end of script

//     const start = () => {
//         // if user chosen name is the first object, we'll wait for user to stop speaking and then invoke
//         // checkSpeechAagainstTranscript
//         // if else, we can just pass in the first objects audioBuffer to playAudioScript()

//         if (scriptToRead[0].name === 'asdf' ) {
//             // wait for speaker to stop speaking somehow 
//             SpeechRecognition.startListening({ continuous: false });
//             checkSpeechAgainstTranscript();
//             scriptToRead.shift();
//         } else {
//             // if the AI starts
//             playAudioScript(scriptToRead[0].audioBuffer);
//             scriptToRead.shift();
//         }
//     }
    
//     const checkSpeechAgainstTranscript = () => {

//         // SpeechRecognition.stopListening();

//         let bestMatch = null;
//         let bestScore = -1;
//         // index should be kept track of so that we can identify which lines we're at 
//         // let index = -1;

//         scriptToRead.forEach((scriptObj) => {
//             // ON START SOUND AND ON START END?? WE NEED TO ADDRESS
//             // perhaps can use token-set or token-sort ratio down the line
//             const score = fuzzball.ratio(transcript, scriptObj.line);

//             if (score > bestScore) {
//                 bestScore = score;
//                 bestMatch = scriptObj.line;
//                 // index = scriptObj.indexOf(scriptObj.line); // probably not necessary
//             }
//         })

//         console.log('bestScore', bestScore);
//         console.log('bestMatch', bestMatch);


//         // if score > 80 then we setSpeechTranscript(transcript)
//         // return bestScore > 80 ? true : false;
//         // bestScore > 80 ? (
           
//         // ) : null;

//         if (bestScore > 80) {
//             setSpeechTranscript(transcript);
//             resetTranscript();
//         } else {
//             console.log('false');
//         }

//         // because we are shifting the array, we likely won't have to change the index [0]
//         // playAudioScript(scriptToRead[0].audioBuffer);
//     }

//     const playAudioScript = async (arrayBuffer) => {
        
//         resetTranscript();

//         let audioContext = new AudioContext();
//         let outputSource;
        
//         try {
//             if (await arrayBuffer.byteLength > 0) {
//                 audioContext.decodeAudioData(arrayBuffer.buffer,
//                 (buffer) => {
//                     audioContext.resume();
//                     outputSource = audioContext.createBufferSource();
//                     outputSource.connect(audioContext.destination);
//                     outputSource.buffer = buffer;
//                     outputSource.start(0);
//                 }, (err) => {
//                     console.log('Error parsing through arrayBuffer', err.message);
//                 });
//             } else {
//                 console.error("did not find any arguments");
//             }
//         } catch(e) {
//             console.log(e);
//         }

//         setSpeechTranscript('');
//     }

//     // when array is empty aka script is finished
//         // go to finish page

//     return (
//         <div>
//             <p>
//                 <span>Transcribed text: </span>
//                 {/* design how the text is returned */}
//                 {transcript}
//             </p>
//             <p>Microphone: {listening ? 'Listening to your voice..' : 'off'}</p>

//             <div>
//                 <button 
//                     onClick={(event) => SpeechRecognition.startListening({ continuous: true })}
//                     className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
//                     Start
//                 </button>
//                 <button 
//                     onClick={() => checkSpeechAgainstTranscript()}
//                     className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
//                     Stop
//                 </button>
//                 <button 
//                     onClick={resetTranscript}
//                     className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
//                     Reset
//                 </button>
//             </div>
//         </div>
//     );
// };


// export default SpeechToText;