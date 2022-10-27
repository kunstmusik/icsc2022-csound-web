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

Let's take the generative pattern generator from tutorial1 and extend the project to make it interactive so that we can perform in realtime with the work. Begin by adding the following gesture generating instrument to tutorial2.csd:

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

This code uses temporal recursion to schedule itself in the future and play notes with a random selection of note numbers at quieter amplitudes over time. Let's first test the code with desktop Csound then work on integrating it with our application.

### Testing on the Desktop

To test what this sounds like outside of the web project, first run the CSD from the commandline (or use the "Csound: Play Active Document" command in VS Code). Csound will run and listen for UDP messages on port 10000 (set in the CsOptions of the CSD) to allow us to live code and experiment with Csound code in realtime. 

Next, create a test.orc file and put the following in the file:

```csound
schedule("Flourish", 0, 0, 0)
```

Finally, put the cursor on the line with the schedule call and use cmd-enter (or ctrl-enter) in VS Code to evaluate the orchestra code. This will send the code via UDP to port 10000 where csound will receive the message and evalute the ORC code and play the Flourish.

Csound has support for evaluating both orchestra and score code at runtime over UDP. These are are important parts of live coding for rapid development of Csound code as well as live performance.  The Csound API also exposes these capabilities for programmtic use and we will avail ourselves of these in the sections below. 

### Evaluating Csound SCO

We now want to have the live code same experience within our web application so that we can hit a button to trigger the Flourish. To do this, we will need to:

1. Add a "Flourish" button.
2. Set a callback to send SCO code to Csound to evaluate.

To do this, we'll add the following utility function to main.js:

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

Now when we run the project, the user will hit start and see the start button disappear and the performance interface revealed. The `createPerformanceUI()` function will both create new user interface elements as well as setup callback handlers to do things like call `.readScore()` to perform Csound SCO notes.  If all is well, the user can now hit the Flourish button to evaluate the Csound SCO code that triggers the Flourish generator.  

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

:::note About .readScore() and Scheduling 

The readScore() method takes in Csound SCO text and evaluates it at runtime. Start times for notes are relative to the time when Csound evaluates the code. While we are using a hardcoded SCO string, you can certainly generate any SCO you would like in JavaScript and send it to Csound.

When we use score like we did above, it works very well to express the idea of "play this immediately". 

When we want to do things that are timed relative to other musical events occuring in Csound, we will need to use other techniques and designs to express things like "play this at the start of the next measure" or "update the looping content when the current loop ends". In those situations, it is often better to use ORC code evaluation where we can send code to be evaluated that can itself read time values within Csound and schedule precisely in time with other playing content. We will explore this below.
:::

## Step 3 - Evaluating ORC code 

While evaluating SCO at runtime can serve many use cases for events, evaluating ORC gives us additional tools. For example, if we wanted the Flourish to run in sync with the Main music generator, we would need to have have it trigger right according to the clock time of the Csound engine. 

First off, we're going to want to use the JavaScript console to view Csound output to help use while we develop. If you open up the console and run the current project, you will see that it generates a lot of log output for every realtime event that gets generated. Let's first turn off those messages by using the following code in `startCsound()` right after we create Csound and before we call `compileCsdText()`:

```js
  await csound.setOption("-m0");
```

`.setOption()` allows us to set a single commandline flag; in this case, we are using the -m option with value 0 to disable messages. (If you need to set multiple options, we can call `.setOption()` multiple times.)

Next, let's replace the call to `.readScore()` with `.evalCode()` to send Csound ORC code to trigger Flourish in time with the Main generator:

```js
  document.querySelector('#flourish').addEventListener('click', async () => {
    // await csound.readScore(`i "Flourish" 0 0 0`);
    await csound.evalCode(`
      print times:i()
      print (.25 - times:i() % .25)
      schedule("Flourish", .25 - times:i() % .25, 0, 0)
    `)
  })
```

Now when you run the project, you should hear the Flourish performed in time with the Main generator. The ORC code reads Csound's time since the beginning of its run using the `times` opcode, then calculates the amount of time until the next .25 second boundary, and finally calls Flourish to run at that time. 

## Step 4 - Continuous Data (Channels) 

