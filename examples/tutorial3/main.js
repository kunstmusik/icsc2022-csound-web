import { Csound } from "@csound/browser";
import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    <button id='startButton'>Start</button>
  </div>
`;

const midiEventTest = `
<CsoundSynthesizer>
<CsOptions>
-M0
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 128
nchnls = 2
0dbfs = 1

instr 1

  kstatus, kchan, kdata1, kdata2 midiin
  printks "kstatus= %d, kchan = %d, kdata1 = %d, kdata2 = %d\\n", 0, kstatus, kchan, kdata1, kdata2

endin

</CsInstruments>
<CsScore>
f 0 3600

</CsScore>
</CsoundSynthesizer>
`;

let csound = null;

const startCsound = async () => {
  if (csound) {
    return;
  }

  console.log("Starting Csound...");

  csound = await Csound();

  await csound.compileCsdText(midiEventTest);
  await csound.start();
};

document.querySelector("#startButton").addEventListener("click", startCsound);
