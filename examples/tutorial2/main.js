import { Csound } from '@csound/browser';
import csd from './tutorial2.csd?raw'
import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <button id='startButton'>Start</button>
  </div>
`

let csound = null;

const createPerformanceUI = (csound) => {
  document.querySelector('#app').innerHTML = `
    <div>
      <button id='flourish'>Flourish</button>
      <input id='ampSlider' type='range' min='-60' max='-12' value='-12'/>
    </div>
  `

  document.querySelector('#flourish').addEventListener('click', async () => {
    // await csound.readScore(`i "Flourish" 0 0 0`);
    await csound.evalCode(`
      schedule("Flourish", next_time(.25), 0, 0)
    `)
  })

  document.querySelector('#ampSlider').addEventListener('input', async (evt) => {
    await csound.setControlChannel('main.note.amp', evt.target.value)
  })
}

const startCsound = async () => {
  if(csound) {
    return;
  }

  console.log("Starting Csound...");

  csound = await Csound();

  await csound.setOption("-m0");
  await csound.compileCsdText(csd);

  await csound.setControlChannel('main.note.amp', -12);
  await csound.start();
  csound.ev

  document.querySelector('#startButton').remove();

  createPerformanceUI(csound);
}

document.querySelector('#startButton').addEventListener('click', startCsound);

