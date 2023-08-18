import { NextRequest, NextResponse } from "next/server";

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

export async function POST(request: NextRequest) {
    const res = await request.json();

    const audioRequest = {
        input: {text: res},
        // Select the language and SSML voice gender (optional)
        voice: {name: 'en-US-Neural2-I', languageCode: 'en-US', ssmlGender: 'MALE'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
    }

    /* we can uncomment these next couple lines to see what voices are available */

    // const [result] = await client.listVoices({});
    // const voices = result.voices;

    // console.log('Voices:');
    // voices.forEach(voice => {
    //     console.log(`Name: ${voice.name}`);
    //     console.log(`  SSML Voice Gender: ${voice.ssmlGender}`);
    //     console.log(`  Natural Sample Rate Hertz: ${voice.naturalSampleRateHertz}`);
    //     console.log('  Supported languages:');
    //     voice.languageCodes.forEach(languageCode => {
    //         console.log(`    ${languageCode}`);
    //     });
    // });


    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(audioRequest);

    return NextResponse.json({
        buffer: response.audioContent
    });
};