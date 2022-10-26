---
sidebar_position: 3
---

# Tutorial 2 - Interacting with Csound

In this tutorial we will extend the work we did in Tutorial 1 and use essential parts of the Csound API to introduce interactivity. We will cover discrete events for triggering SCO notes and evaluating ORC code, as well as communicate continous data with Csound using channels.  

## Step 1 - Project Setup 

For this tutorial, we are going to start off by making a copy of our tutorial1 folder and renaming it to tutorial2. Just in case, in a terminal, cd into the folder and type `npm install`, to ensure all dependencies are installed. 

Next, edit the package.json file so that "name" is set to "tutorial2" like so:

```json
  "name": "tutorial2",
```

Finally, rename tutorial1.csd to tutorial2.csd and update the import in main.js to use tutorial2.csd. 

## Step 2 - Triggering Score Events 

Let's take the lovely generative pattern generator from tutorial1 and extend the project to make it interactive so that we can perform in realtime with the work. To start, let's a add the following gesture generating instrument to tutorial2.csd:

```csound
instr Flourish
    inotes[] fillarray 72, 74, 75, 77, 79 
    inote = inotes[floor(rnd(5))]

    schedule(1, 0, .25, cpsmidinn(inote), ampdbfs(-12 + p4 * .5))

    if(p4 > -60) then
        schedule(p1, .125, 0, p4 - 1)
    endif
endin
```

### Testing on the Desktop

If you want to test what this sounds like outside of the project, first run the CSD from the commandline (or use the "Csound: Play Active Document" command in VS Code). Next, create a test.orc file and put the following in the file:

```csound
schedule("Flourish", 0, 0, 0)
```

Finally, with the CSD running, open the ORC file, put the curosr on the line with the schedule call, and use cmd-enter (or ctrl-enter) in VS Code to evaluate the orchestra code. This will send the code via UDP on port 10000 (set in the CsOptions of the CSD) to csound to evalute the code and play the Flourish.

### Evaluating Csound SCO

Now, we want to have this same capability and experience within our web application so that we can hit a button to trigger the Flourish. To do this, we will need to:

1. Add a "Flourish" button.
2. Set a callback to send SCO code to Csound to evaluate.

To do this, we'll add the following utility function:

```js
const createPerformanceUI = (csound) => {
  document.querySelector('#app').innerHTML = `
    <div>
      <button id='flourish'>Flourish</button>
    </div>
  `

  document.querySelector('#flourish').addEventListener('click', async () => {
    await csound.readScore(`i "Flourish" 0 0 0`);
  })
}
```

and we will add the following line of code to the end of our startCsound() function:

```js
  createPerformanceUI(csound);
```

Now when we run the project, the user will hit start and see the start button disappear and the performance interface revealed. They can now hit the Flourish button to evaluate the Csound SCO code the runs the Flourish generator.  

The final code in main.js at this point of the tutorial should now look like this:

```js
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
    await csound.readScore(`i "Flourish" 0 0 0`);
  })
}

const startCsound = async () => {
  if(csound) {
    return;
  }

  console.log("Starting Csound...");

  csound = await Csound();

  await csound.compileCsdText(csd);
  await csound.start();

  document.querySelector('#startButton').remove();

  createPerformanceUI(csound);
}

document.querySelector('#startButton').addEventListener('click', startCsound);
```

### About .readScore() and scheduling

The readScore() method takes in any valid Csound SCO text and evaluates it at runtime. Start times for notes are relative to the time when Csound evaluates the code. While we are using a hardcoded SCO string, you can certainly generate any SCO you would like in JavaScript and send it to Csound.





## Step 3 - Evaluating ORC code 

## Step 4 - Continuous Data (Channels) 

