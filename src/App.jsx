import { useState } from 'react'
import header from 'waveheader';
import fs from 'fs';





function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div class="p-4 h-screen bg-slate-900 flex flex-col justify-center items-center space-y-2">
      <p class = "text-sky-50">Synthesizer </p>
      <div class="space-x-2">
      <button class= " h-7 w-7 flex-auto rounded-full p-1 bg-slate-300 hover:bg-white transition"> {/* sawtoothWave button */}
          <img src="/sawtooth-wave.svg" alt="sawtooth"/>
        </button>
        <button class= " h-7 w-7 flex-auto rounded-full p-1 bg-slate-300 hover:bg-white transition">{/* TriangleWave button */}
         <img src="/triangle-wave-icon-size_64.png" alt = "triangle"/>
        </button>
        <button class= " h-7 w-7 flex-auto rounded-full p-1 bg-slate-300 hover:bg-white transition">{/* SquareWave button */}
          <img src= "/square-wave-icon-size_64.png" alt = "square"/>
          </button>
          <button class= " h-7 w-7 flex-auto rounded-full p-1 bg-slate-300 hover:bg-white transition" onClick={karplus}>
          <img src= "/sine-wave-icon-size_64.png" alt = "karplus" /> {/* StringDecay button */} 

          </button>
      </div>
      <div>
        <button  class= "h-6 w-12 flex-auto  rounded-sm bg-slate-400 hover:bg-white transition" > 
          <p class="text-slate-900 font-mono"  >start</p>
          
        </button>
      </div>

      <div class="flex p-10">
        <input type="range" id="volume" name="amplitude" min="0" max="12" step ="any" className="-rotate-90" /> 
        <input type="range" id="volume" name="frequency" min="0" max="12" step ="any" className="-rotate-90" /> 
      </div>

    </div>


  )
}

export default App

function karplus() {

  var frequency = 5000;
  var seconds = 100.0;    
  var sampleRate = 48000;
  let samples = sampleRate * seconds;
  var size= int16Buffer.length*2;
  var fs = require("fs")//loads fs module for files
  var file = fs.createWriteStream("karplus.wav")//makes a stream to pour data nto file
  var buf = [];//array for values
  var buffer = Buffer.allocUnsafe(size);//to hold the audio data when converted to binary

  for (let n = 0; n < sampleRate / 55; n++) {
      buf.push(Math.random() * 2.0 - 1.0);
  }
  
  var finalBuffer = [];
  for (let n = 0; n < samples; n++) { //for each value of sample
      let first = buf.shift();
      let next = buf[0];
      let sample = 0.996 * 0.5 * (first + next);// karplus algorithm to simulate decay
      buf.push(sample);
      finalBuffer.push(sample);
  }
  
  var int16Buffer = Int16Array.from(
     finalBuffer.map((n) => n * 32767) //convert to 16bit range, 1 = 32767 
  );  
  
  file.write(buffer.alloc(44)); //lets use the 44 bytes in the header constructed
  int16Buffer.forEach((value, index) => { //a loop to write each buffer value into the file
      buffer.writeInt16LE(value, index * 2);
  });
  
  file.write(buffer);// file write
  file.end();
}

