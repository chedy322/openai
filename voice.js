import fs from "fs";
import path from "path";
import OpenAI from "openai";
import * as readline from 'node:readline/promises';
// import {stdin as input, stdout as output} from 'node:process'
import main from './openai-test.js'
import 'dotenv/config'

const openai = new OpenAI({
    apiKey: process.env.APIKEY,
});

const speechFile = path.resolve("./speech.mp3");

// const rl =readline.createInterface({ input, output });
async function main2() {
    // let quit=false
    // console.log(await main())
    let quit=false
   while(quit===false){

   
        const question=await main()
        if(!question){
            quit=true
        return      
     }
            const mp3 = await openai.audio.speech.create({
              model: "tts-1",
              voice: "alloy",
              input: question,
            });
            console.log(speechFile);
            const buffer = Buffer.from(await mp3.arrayBuffer());
            await fs.promises.writeFile(speechFile, buffer);
   }
    }

main2();