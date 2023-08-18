import { NextRequest, NextResponse } from "next/server";

// requiring the open ai package
const { Configuration, OpenAIApi } = require('openai');

export interface DialogueObject {
    type: string,
    name: string,
    line: string,
    audioBuffer: Buffer
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export async function POST(request: NextRequest) {
    const res = await request.json();

    console.log('input ', JSON.stringify(res));

    const model = 'gpt-3.5-turbo';
    const messages = [
        { role: 'user', content: `Given an array of objects representing a movie script containing character names, their corresponding lines, and scene actions, parse it using the following format. Transform objects with the type value "CHARACTER_BLOCK" into individual objects with "name" and "line" as its keys, such that an object will have two key value pairs. Character names and their lines should be separated correctly, even when a character name appears within a line. Please double check even triple check to make sure that no character names are found within a line. Words that are in all caps are character names. Replace the objects with the type "CHARACTER_BLOCK" in the original array with these newly created objects and return the original array. Make sure that character names are accurately separated from their lines, and that the transformation preservers the order of objects in the original array. Please use the following array and return the transformed array as the result not a function on how to do it. ${JSON.stringify(res)}`}
    ];

    const response = await openai.createChatCompletion({
        model: model,
        messages: messages
    })

    const responseObj = JSON.parse(response.data.choices[0].message.content);

    return NextResponse.json({
        dialogueScript: responseObj
    });
}

/* 

Prompts we've tried: 

Given an array of objects representing a movie script containing character names, their corresponding lines, and scene actions, parse it using the following format. Transform objects with the type value "CHARACTER_BLOCK" into new objects with "name" and "line" as keys. Character names and their lines should be separated correctly, even when a character name appears within a line. Words that are in all caps are character names. Replace the objects with the type "CHARACTER_BLOCK" in the original array with these newly created objects and return the original array. Make sure that character names are accurately separated from their lines, and that the transformation preserves the order of objects in the original array. Use the given array of objects and provide the transformed array as the result.

Given an array of objects representing a movie script containing character names, their corresponding lines, and scene actions, parse it using the following format. Transform objects with the type value "CHARACTER_BLOCK" into new objects with "name" and "line" as keys. Character names and their lines should be separated correctly, even when a character name appears within a line. Please double check even triple check to make sure that no character names are found within a line. Words that are in all caps are character names. Replace the objects with the type "CHARACTER_BLOCK" in the original array with these newly created objects and return the original array. Make sure that character names are accurately separated from their lines, and that the transformation preservers the order of objects in the original array. Please use the following array and return the transformed array as the result.

Please transform the given array of objects representing a movie script into a new format while accurately separating character names and their corresponding lines. The array contains objects with different types, including "CHARACTER_BLOCK" and "SCENE_ACTION". The transformation should correctly identify character names in all capital letters and differentiate them from their lines. Make sure to handle cases where character names appear within lines. Here are the steps to follow: 1.For each object in the array: If the object's type is "CHARACTER_BLOCK": Split the text by newlines to separate character names and lines. Identify character names (in all caps) and their corresponding lines. Create new objects for each character with the keys "name" and "line". Ensure that character names and lines are correctly separated, even when names appear within lines.Replace the original "CHARACTER_BLOCK" object with the newly created objects.If the object's type is "SCENE_ACTION", keep it unchanged. 2. Return the array with the transformed format. Please ensure that the transformation preserves the original order of objects in the array and accurately separates character names from their lines, even when character names are embedded within lines.

{ role: 'system', content: 'You are parsing a movie script that includes character names, their corresponding lines, and scene actions.' },
 role: 'user' , content: 'For objects with the type "CHARACTER_BLOCK", separate its text value into an object with key value pairs using name and line as keys, and the characters name and their lines as corresponding values respectively. If names repeat, do not identify as new characters. ' },
{ role: 'user', content: 'Replace the CHARACTER BLOCK objects in the original json string with the newly created objects. And return that string in a JSON object. Please use the following script.' },
{ role: 'user', content: "Given a movie script containing character names, their corresponding lines, and scene actions, process the script as follows: For each element with the type 'CHARACTER_BLOCK,' create a new object using 'name' and 'line' as keys. Keep in mind there could be multiple characters in the element. Assign the character's name to the 'name' key and their lines to the 'line' key. If character names are repeated, do not treat them as new characters. Replace the 'CHARACTER_BLOCK' elements in the original JSON string with these newly created objects. Provide the modified JSON string within a JSON object." },
{ role: 'user', content: 'Given a movie script containing character names, their corresponding lines, and scene actions, I would like you to parse it in the following format' },
{ role: 'user', content: 'Given an array of objects that represent a movie script containing character names, their corresponding lines, and scene actions, I would like you to parse it in the following format' },
{ role: 'user', content: 'Break only objects with type CHARACTER_BLOCK into new objects with key value pairs where "name" and "line" are keys, and the characters names and their lines are the values respectively. All words that are in all caps are character names. Return this to me in a JSON object.' },
{ role: 'user', content: 'Break only objects with type CHARACTER_BLOCK into new objects with key value pairs where "name" and "line" are keys, and the characters names and their lines are the values respectively. All words that are in all caps are character names. Return this to me in a JSON object and return only the JSON object.' },
{ role: 'user', content: 'Break only objects that have type value CHARACTER_BLOCK into new objects with key value pairs where "name" and "line" are keys, and the characters names and their lines are the values respectively. Words that are in all caps are character names so make sure to separate those accordingly. Replace the object with type CHARACTER_BLOCK with this newly created object and return the original array.' },
{ role: 'user', content: `Given an array of objects representing a movie script containing character names, their corresponding lines, and scene actions, parse it using the following format. Transform objects with the type value "CHARACTER_BLOCK" into new objects with "name" and "line" as keys. Character names and their lines should be separated correctly, even when a character name appears within a line. WOrds that are in all caps are character names. Replace the objects with the type "CHARACTER_BLOCK" in the original array with these newly created objects and return the original array. Make sure that character names are accurately separated from their lines, and that the transformation preservers the order of objects in the original array. Please use the following array and return the transformed array as the result. ${JSON.stringify(res)}`}

*/