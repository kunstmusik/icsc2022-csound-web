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
    </div>
  `

  document.querySelector('#flourish').addEventListener('click', async () => {
    // await csound.readScore(`i "Flourish" 0 0 0`);
    await csound.evalCode(`
      print times:i()
      print (.25 - times:i() % .25)
      schedule("Flourish", .25 - times:i() % .25, 0, 0)
    `)
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
  await csound.start();
  csound.ev

  document.querySelector('#startButton').remove();

  createPerformanceUI(csound);
}

document.querySelector('#startButton').addEventListener('click', startCsound);

