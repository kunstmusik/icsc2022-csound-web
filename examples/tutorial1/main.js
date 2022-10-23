import { Csound } from '@csound/browser';
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
}

document.querySelector('#startButton').addEventListener('click', startCsound);

