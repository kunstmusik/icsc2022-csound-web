---
sidebar_position: 4
---

# Tutorial 3 - Microphone/Midi interaction

In this tutorial we are going to learn about ways to interact with csound using human interface devices, like a microphone
or a midi keyboard.

## Step 1 - Connect your midi device

For this tutorial you'll need a midi device connected. This can either be a physical midi-controller, or a virtual midi device. Because of security concerns, it's not currently possible to create a "real" virtual midi device from inside the browser.

> "While it's not possible to create a virtual midi device from within the browser, it's still possible to create midi-event emitting elements. This is what the virtual midi-keyboard does in the web-ide, it uses `await csound.midiMessage(144, midiNumber, 64)` to programatically send a NOTE_ON event with a subsequent `await csound.midiMessage(128, midiNumber, 64)` NOTE_OFF event."

If you don't have a physical midi-keyboard at hand, we can recommend these alternatives:

- OSX `midikeys` [https://flit.github.io/projects/midikeys/](https://flit.github.io/projects/midikeys/)
- Windows `loopMIDI` [https://www.tobias-erichsen.de/software/loopmidi.html](https://www.tobias-erichsen.de/software/loopmidi.html)
- Linux `vmpk` [https://vmpk.sourceforge.io/](https://vmpk.sourceforge.io/) for ubuntu users `sudo apt-get install vmpk`.

## Step 2 - Detect MIDI events

If you are unsure if csound is detecting midi events, the following snippet could help with debugging. Note that csound-wasm doesn't implicitly ask for access to midi devices. Just like is the case for native csound, we need to provide an option `-M0` (or the equivalent `-Ma`) where 0 tells csound to map midi events to all instruments, for specific midi to instrument mapping; change 0 to the instrument number that you wish to be triggered from midi events.
When using `-M0` it's possible to use the opcode `massign` in global scope to manually map midi channel to a specific numbered csound instrument.

```js
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

  ktrig changed kstatus

  if ktrig == 1 then
    printks "kstatus= %d, kchan = %d, kdata1 = %d, kdata2 = %d\\n", 0, kstatus, kchan, kdata1, kdata2
  endif

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
```

If the midi is working well, you should see something similar to the following in your browser console.

```console
--Csound version 6.18 (double samples) Oct  9 2022
eventemitter3.min.js:1 [commit: HEAD]
eventemitter3.min.js:1 libsndfile-1.1.0
eventemitter3.min.js:1 graphics suppressed, ascii substituted
eventemitter3.min.js:1 sr = 48000.0, kr = 375.000, ksmps = 128
eventemitter3.min.js:1 0dBFS level = 1.0, A4 tuning = 440.0
eventemitter3.min.js:1 orch now loaded
eventemitter3.min.js:1 audio buffered in 256 sample-frame blocks
eventemitter3.min.js:1 SECTION 1:
eventemitter3.min.js:1   rtevent:	   T  5.733 TT  5.733 M:  0.00000  0.00000
eventemitter3.min.js:1 new MIDI alloc for instr 1:
eventemitter3.min.js:1 kstatus= 208, kchan = 1, kdata1 = 0, kdata2 = 0
eventemitter3.min.js:1 kstatus= 0, kchan = 1, kdata1 = 0, kdata2 = 0
eventemitter3.min.js:1 kstatus= 208, kchan = 1, kdata1 = 1, kdata2 = 0
eventemitter3.min.js:1 kstatus= 0, kchan = 1, kdata1 = 1, kdata2 = 0
```

Note that it's also possible to pass csound options directly to csound, in the case of `-M0` we could've done this

```js
await csound.compileCsdText(midiEventTest);
await csound.setOption("-M0");
await csound.start();
```

## Step 3 - connect microphone

Within the browser environment, we are somewhat limited in which devices we are allowed to access. The audio input device which the browser will grab will be determined by the default audio input set by the operating system. Such is the case for any browser based video conference application, the browser will grab the default video and audio input presented to it by the operating system.

By default, Csound will not prompt the user for access to the audio input device except it is configured to do so.
The following ways can be used to tell Csound to ask for access for audio input:

1. `-idac` flag is present within the CsOptions xml tag.
2. `-idac` flag is passed to the csound object `await csound.setOption("-idac");`
3. An explicit call is made to the csound object for enabling audioInput `await csound.enableAudioInput();`

```js
const micTest = `
      <CsoundSynthesizer>
        <CsOptions>
        -odac -iadc --daemon
        </CsOptions>
        <CsInstruments>
          0dbfs=1
          nchnls_i=1
          nchnls=2
          instr 1
            ain = inch(1)
            al, ar  reverbsc ain, ain, 0.85, 10000
            out(al, ar)
          endin
          schedule(1, 0, -1)
        </CsInstruments>
        <CsScore>
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

  await csound.compileCsdText(micTest);
  await csound.start();
};

document.querySelector("#startButton").addEventListener("click", startCsound);
```

When running this example, a notification alert should appear in the browser window, asking permission for access to the microphone. As soon as permission is given or rejected, csound will start.
