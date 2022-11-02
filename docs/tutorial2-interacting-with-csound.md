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

### About .readScore() and Scheduling 

The readScore() method takes in Csound SCO text and evaluates it at runtime. Start times for notes are relative to the time when Csound evaluates the code. While we are using a hardcoded SCO string, you can certainly generate any SCO you would like in JavaScript and send it to Csound.

When we use score like we did above, it works very well to express the idea of "play this immediately". However, if we trigger the notes a few times we'll find that the gesture is not in-time with the Main generator.

When we want to do things that are timed relative to other musical events occuring in Csound, we will need to use other techniques and designs to express things like "play this at the start of the next measure" or "update the looping content when the current loop ends". In those situations, it may be better to use ORC code evaluation where we can send code will read time values within Csound and schedule precisely in time with other playing content. We will explore this below.

## Step 3 - Evaluating ORC code 

While evaluating SCO at runtime can serve many use cases for events, evaluating ORC gives us additional tools. For example, if we wanted the Flourish to run in sync with the Main music generator, we would need to have have it trigger according to the clock time of the Csound engine. 

### Setting Options 

First off, we're going to use the JavaScript console to view Csound output to help us while we develop. If you open up the console and run the current project, you will see that it generates a lot of log output for every realtime event that gets generated. Let's first turn off those messages by using the following code in `startCsound()` right after we create Csound and before we call `compileCsdText()`:

```js
  await csound.setOption("-m0");
```

`.setOption()` allows us to set a single commandline flag; in this case, we are using the -m option with value 0 to disable messages. (If you need to set multiple options, we can call `.setOption()` multiple times.)

### Clocks

Our application has an implicit clock that is simplistic and problematic. Our Main generator currently schedules itself to run every 0.25 beats into the future, giving us 8th note resolution at 120 BPM. Due to rounding issues, it may not always be precisely at 0.25 and the errors may gradually accumulate. The amounts might be small but when summed over time can cause things to be a little difficult for the purpose of synchronizing other events.  

To synchronize new events with those running in csound--such as the ones we generate from our button callback that runs in the main thread--we will need to have some way to schedule according to the current time in the audio thread. Because Csound has relative time note processing, and beacuse of message passing latency and uncertainty on when an event is run after it is triggered, we can not depend on just reading the current time, doing calculations in the other thread, and sending that over to run. The time calculations *have* to happen in the audio thread to get precise synchronization.  

So let's first add a new user-defined opcode called `next_time`:

```csound
opcode next_time, i, i
  inext xin

  itime = times:i()
  iticks = round(itime / inext)
  iticks += 1

  iout = (iticks * inext) - itime
  xout iout
endop
```

This opcode will, given a subdivision of time (such as .25 beats), convert the current real time in seconds to number of subdivisions as a whole number, add 1 to get the next tick, then convert the difference between now and the time of the next subdivision tick. 

This implementation for a clock and time calculations is a bit simple but it will do for this tutorial. (In a more robust application, a time keeping system that allows for variable BPM and current measure/beat reading would be ideal.) 

With the new code, we will update Main and Flourish to both use next_time() when scheduling ahead in time like so:

```csound
instr Flourish
    inotes[] fillarray 72, 74, 75, 77, 79 
    inote = inotes[floor(rnd(5))]

    schedule(1, 0, .25, cpsmidinn(inote), ampdbfs(-12 + p4 * .5))

    if(p4 > -60) then
        schedule(p1, next_time(.125), 0, p4 - 1)
    endif
endin

instr Main
    inotes[] fillarray 60, 67, 63, 65, 62
    ioct[] fillarray 0,1,0,0,1
    inote = inotes[p4 % 37 % 11 % 5] + 12 * ioct[p4 % 41 % 17 % 5]
    schedule(1, 0, .25, cpsmidinn(inote), 0.25)

    if(p4 % 64 % 37 % 17 % 11 == 0 && inote != 74 && inote != 62) then
        schedule(1, 0, .5, cpsmidinn(inote + 7), 0.125)
    endif

    schedule(p1, next_time(.25), .25, p4 + 1)
endin
```

With this in place, we can now move on to using ORC evaluation to synchronize our user-triggered event with the musical time of the Main score generating instrument.

### Evaluating ORC Code 

Let us replace the call to `.readScore()` with `.evalCode()` to send Csound ORC code to trigger Flourish in time with the Main generator:

```js
  document.querySelector('#flourish').addEventListener('click', async () => {
    // await csound.readScore(`i "Flourish" 0 0 0`);
    await csound.evalCode(`
      schedule("Flourish", next_time(.25), 0, 0)
    `)
  })
```

Now when you run the project, you should hear the Flourish performed in time with the Main generator. By sending ORC code instead of SCO code, the schedule call can use the `next_time()` UDO to calculate at evaluation time when is the next .25 time window boundary and run in sync with the Main generator.


## Step 4 - Writing Continuous Data (Channels) 

`.readScore()` and `.evalCode()` are primary tools for event-based interactivity with Csound. To work with continuous data, we will use Csound's channel system to communicate with Csound.

Let's say we want to make the amplitude of the notes that the Main generator be something we can control from the web interface using a slider. To do this we will need to:

1. Add a slider UI element that will send new values to Csound via a channel whenever it changes. 
2. Update our Csound code to read the value from the channel.
3. Be sure we initialize the channel with a good starting value. 

### Adding a Slider

Let's update our `createPerformanceGUI()` function to add a slider and add an input event listener so that we can update Csound when the slider value changes. Modify your code to look like the following:

```js
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
```

We're using here an input of type range and an ID of ampSlider. The min is set to -60 and max to -12 and a default value of -12. We are going to read these values as dbFS in our Csound code. 

When an input event is fired, we get the `evt.target.value` to get the current value from the slider and use the `.setControlChannel()` method on the Csound object to set the `main.note.amp` channel with the given value.  

### Update Csound code to use channel value

Next, let's update the Csound code for Main so that it uses the 'main.note.amp' channel value for the notes. We originally used an amplitude of 0.25 (roughly -12 dbFS) for the main notes and 0.125 (or half the main amplitude) for the secondary fifths. 

Update the Main instrument in tutorial2.csd to look as the following:


```csound
instr Main
    iamp = ampdbfs(chnget:i("main.note.amp"))
    inotes[] fillarray 60, 67, 63, 65, 62
    ioct[] fillarray 0,1,0,0,1
    inote = inotes[p4 % 37 % 11 % 5] + 12 * ioct[p4 % 41 % 17 % 5]
    schedule(1, 0, .25, cpsmidinn(inote), iamp)

    if(p4 % 64 % 37 % 17 % 11 == 0 && inote != 74 && inote != 62) then
        schedule(1, 0, .5, cpsmidinn(inote + 7), iamp / 2)
    endif

    schedule(p1, next_time(.25), .25, p4 + 1)
endin
```

We're now using `chnget:i()` to read the value set in the 'main.note.amp' channel as an i-rate variable, and converting that from dBFS to amplitude using `ampdbfs()`. After we have the amplitude value, we now use it for the schedule calls, using the same half-amplitude for the the perfect fifths.

### Initializing the Channel

If you were to run this project now, however, you will find that the generator will produce very loud clipped notes. This is because channels default to the value of 0 if no value has been set, and 0 dBFS is certainly a lot louder than the -12 dBFS we were expecting!

To deal with this, we will initialize the channel to a known good value prior to starting Csound. Update your `startCsound()` code to add a call to `.setControlChannel()` like so:

```js
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
```

## Step 5 - Reading Continuous Data (Channels) 

