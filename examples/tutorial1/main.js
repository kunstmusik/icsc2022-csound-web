import { Csound } from '@csound/browser';
import csd from './tutorial1.csd?raw'
import './style.css'

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

  await csound.compileCsdText(csd);
  await csound.start();

  document.querySelector('#startButton').remove();
}

document.querySelector('#startButton').addEventListener('click', startCsound);

