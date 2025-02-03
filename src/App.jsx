  import { useState } from 'react'
  import header from 'waveheader';

  function App() {
    const [count, setCount] = useState(0)
    let audio;

    function karplus() {
      let samples = AudioParameters.sampleRate * AudioParameters.seconds;
      var size = samples * 2; // sample size
    
      var buf = [];//array for values
      var buffer = ArrayBuffer.allocUnsafe(size);//to hold the audio data when converted to binary
    
      for (let n = 0; n < AudioParameters.sampleRate / 55; n++) {
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
          
      audio = buffer.alloc(44) + int16Buffer;
    }

    return (
      <div class="p-4 h-screen bg-slate-900 flex flex-col justify-center items-center space-y-2">
        <p class = "text-sky-50">Synthesizer </p>
        <div class="space-x-2">
          <button class= " h-7 w-7 flex-auto rounded-full p-1 bg-slate-300 hover:bg-white transition" onClick= {sawTooth}> {/* sawtoothWave button */}
            <img src="/sawtooth-wave.png" alt="sawtooth"/>
          </button>
          <button class= " h-7 w-7 flex-auto rounded-full p-1 bg-slate-300 hover:bg-white transition">{/* TriangleWave button */}
          <img src="/triangle-wave-icon-size_64.png" alt = "triangle"/>
          </button>
          <button class= " h-7 w-7 flex-auto rounded-full p-1 bg-slate-300 hover:bg-white transition" >{/* SquareWave button */}
            <img src= "/square-wave-icon-size_64.png" alt = "square"/>
          </button>
          <button class= " h-7 w-7 flex-auto rounded-full p-1 bg-slate-300 hover:bg-white transition" onClick={karplus}>
            <img src= "/sine-wa ve-icon-size_64.png" alt = "karplus" /> {/* StringDecay button */} 
          </button>
        </div>
        <div>
          <button  class= "h-6 w-12 flex-auto  rounded-sm bg-slate-400 hover:bg-white transition" > 
            <p class="text-slate-900 font-mono" onClick={((event) => {
              let audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
            audioContext.decodeAudioData(event
                .target.result, function (buffer) {
                    let audioPlayer = document.createElement('audio');
                    audioPlayer.controls = true;
                    audioPlayer.src = URL.createObjectURL(this.audio);
                    document.body.appendChild(audioPlayer);
                });
            })} >start</p>
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
  const AudioParameters = {
    frequency: 400,   // structs for all functions
    seconds: 1.0,
    sampleRate: 48000,
  };

  function sawTooth(){
  let samples = AudioParameters.sampleRate * AudioParameters.seconds;
  var fs= require(fs);
  var file =  fs.writestream("audio.wav")

  }
function square(){

}