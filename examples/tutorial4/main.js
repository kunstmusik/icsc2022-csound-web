import { Csound } from '@csound/browser';
import csd from './sample_instrument.csd?raw'
import './style.css'

const loadResources = async (csound, filesArray) => {
    for (let i = 0; i < filesArray.length; i++) {
        const fileUrl = filesArray[i];
        const f = await fetch(fileUrl);
        const fName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
        const path = `${fName}`;
        const buffer = await f.arrayBuffer();

        // console.log(path, buffer);
        await csound.fs.writeFile(path, new Uint8Array(buffer));
    }
    return true;
}


document.querySelector('#app').innerHTML = `
  <div>
    <button id='startButton'>Start</button>
  </div>
`

let csound = null;

const startCsound = async () => {
  if(csound) {
    return;
  }

  console.log("Starting Csound...");

  csound = await Csound();

  const resources = [
      "SynthStrings1-WAV-20160913/SynthStrings1-30.wav",
      "SynthStrings1-WAV-20160913/SynthStrings1-36.wav",
      "SynthStrings1-WAV-20160913/SynthStrings1-42.wav",
      "SynthStrings1-WAV-20160913/SynthStrings1-48.wav",
      "SynthStrings1-WAV-20160913/SynthStrings1-54.wav",
      "SynthStrings1-WAV-20160913/SynthStrings1-60.wav",
      "SynthStrings1-WAV-20160913/SynthStrings1-66.wav",
      "SynthStrings1-WAV-20160913/SynthStrings1-72.wav",
      "SynthStrings1-WAV-20160913/SynthStrings1-78.wav",
      "SynthStrings1-WAV-20160913/SynthStrings1-84.wav",
      "SynthStrings1-WAV-20160913/SynthStrings1-90.wav",
      "SynthStrings1-WAV-20160913/SynthStrings1-96.wav",
  ];

  await loadResources(csound, resources);

  await csound.compileCsdText(csd);
  await csound.start();

  document.querySelector('#startButton').remove();
}

document.querySelector('#startButton').addEventListener('click', startCsound);

