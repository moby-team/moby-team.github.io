// TO IMPLEMENT IN THE FUTURE AS WE WON'T NEED LONG AUDIO FOR MVP
// might not be needed as most scripts should be only a couple pages (< 5000 bytes)
// this will only be needed if file is greater than 5000 bytes

// import { NextRequest, NextResponse } from "next/server";

// // Imports the Google Cloud client library
// const textToSpeech = require('@google-cloud/text-to-speech');

// // Creates a client
// const client = new textToSpeech.TextToSpeechLongAudioSynthesizeClient();

// export async function POST(request: NextRequest) {
//     const res = await request.json();

//     const number = Math.floor(Math.random() * 1000);

//     const audioRequest = {
//         parent: "projects/224518125313/locations/global",
//         input: {text: res},
//         // select the type of audio encoding
//         audioConfig: {audioEncoding: 'LINEAR16'},
//         // this request is being saved in the google cloud 
//         outputGcsUri: `gs://moby_test_bucket/long_audio${number}`,
//         // Select the language and SSML voice gender (optional)
//         voice: {name: 'en-US-Neural2-I', languageCode: 'en-US', ssmlGender: 'MALE'}
//     }

//     // Performs the text-to-speech request
//     // response is an object type Operations
//     const [response] = await client.synthesizeLongAudio(audioRequest);

//     // metadata.value holds a Buffer object (this could be of type LINEAR16)
//     const longAudioData = response.latestResponse.metadata.value;

//     return NextResponse.json({
//         buffer: longAudioData
//     });
// };