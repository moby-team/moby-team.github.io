import { fstat } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from 'path';


export interface entityObject {
    type: string,
    text: string,
    positions: {}
}

const projectId = 'moby-project-393418';
const location_gc = 'us'; // Format is 'us' or 'eu'
// const processorId = 'afbbb298ff2f34d6'; // this is our previous default Doc Parser processor ID 
// const processorId = '5fb25a11187fecdb'; // this is our custom processor ID  with Workbench - this returns CHARACTER_NAME, LINES, & SCENE_ACTIONS
const processorId = 'f1d9c2d96304cda5' // this is our custom processir v2 ID with Workbench - this returns CHARACTER_BLOCKS & SCENE_ACTIONS

const { DocumentProcessorServiceClient } =
  require('@google-cloud/documentai').v1;

// Instantiates a client
// apiEndpoint regions available: eu-documentai.googleapis.com, us-documentai.googleapis.com (Required if using eu based processor)
const client = new DocumentProcessorServiceClient();

// export async function POST(request: NextRequest) {
//     // The full resource name of the processor, e.g.:
//     // projects/project-id/locations/location/processor/processor-id
//     // You must create new processors in the Cloud Console first
//     const name = `projects/${projectId}/locations/${location_gc}/processors/${processorId}`;

//     // Read the file into memory.
//     const fs = require('fs').promises;
//     const res = await request.json();

//     // TODO: once we have a cloud storage set up to store our scripts - we'll need to point it to here 
//         // this will be where we can identify whether we need to actually send the document or just pull from the storage 
//     const filePath = `/Users/jinhoobong/Desktop/ScenePartner_AI/ScenePartnerAI/public/uploads/${res}`;
//     // const filePath = `/Users/janeyou/Coding/JJA/ScenePartnerAI/public/uploads/${res}`;

//     const imageFile = await fs.readFile(filePath);

//     // Convert the image data to a Buffer and base64 encode it.
//     const encodedImage = Buffer.from(imageFile).toString('base64');

//     const request_gc = {
//         name,
//         rawDocument: {
//         content: encodedImage,
//         mimeType: 'application/pdf',
//         },
//     };

//     // Recognizes text entities in the PDF document
//     const [ result ] = await client.processDocument(request_gc);
//     const { document } = result;

//     const entities = document.entities;

//     // array to store the object with extracted necessary info
//     const destructuredEntities = [];

//     // we're extracting the necessary information from the response from Google DocAI 
//     entities.forEach((entity) => {
//         const entityInfo = {
//             type: entity.type,
//             text: entity.mentionText,
//             position: entity.pageAnchor.pageRefs[0].boundingPoly.normalizedVertices[0]
//         }

//         destructuredEntities.push(entityInfo);
//     })

//     // function to help sort the objects 
//     const sortByVertical = (object) => {
//         return object.position.y;
//     }

//     // sort by vertical position 
//     destructuredEntities.sort((a, b) => sortByVertical(a) - sortByVertical(b));

//     return NextResponse.json({ scriptObjects: destructuredEntities });
// }

export async function POST(request: NextRequest) {
    // grab the file name
    const res = await request.json();
    console.log('waht is res', res);

    const fs = require('fs').promises;
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'assets');

    if (res.includes("White-Room")) {
        const fileContents = await fs.readFile(jsonDirectory + '/white_room.json', 'utf8');
        const scriptObjects = eval(fileContents);
        return NextResponse.json({ scriptObjects: scriptObjects });
    }

    if (res.includes("Risk-Management")) {
        const fileContents = await fs.readFile(jsonDirectory + '/risk_management.json', 'utf8');
        const scriptObjects = eval(fileContents);
        return NextResponse.json({ scriptObjects: scriptObjects });
    }

    return NextResponse.json({ scriptObjects: '' });
}