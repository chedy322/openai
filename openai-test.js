// var Sentiment = require('sentiment');
import Sentiment from 'sentiment'
var sentiment = new Sentiment();
import OpenAI from 'openai';
import * as readline from 'node:readline/promises';
import 'dotenv/config'
import { stdin as input, stdout as output } from 'node:process';

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

// Create a readline interface
const rl = readline.createInterface({ input, output });

export default async function main() {
  // Capture user input
  let quitting=false
  while(quitting!==true){
  const userInput = await rl.question("Please enter your input: ");
  if(userInput==="quit"){
    quitting=true
    console.log("the chat has ended")
    rl.close();
    return 
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: userInput }
    ],
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1,
  });
  const sens=sentiment.analyze(userInput)
  console.log(response)
  const aiResponse = response.choices[0].message.content;

  // console.log("AI Response:", aiResponse);
  
  
  return aiResponse
  
}
}

