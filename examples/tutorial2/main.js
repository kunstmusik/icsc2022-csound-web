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
      <p id='dbfs'></p>
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

  document.querySelector('#startButton').remove();

  createPerformanceUI(csound);

  const dBFSReader = () => {
    csound.getControlChannel('dbfs').then(v => {
      document.querySelector('#dbfs').innerHTML = v;
    })
    setTimeout(dBFSReader, 1000 / 10)
  }
  dBFSReader();
}

document.querySelector('#startButton').addEventListener('click', startCsound);

