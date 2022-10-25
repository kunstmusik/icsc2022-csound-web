---
sidebar_position: 2
---

# Tutorial 1 - Getting Started 

In this tutorial, we are going to take a Csound CSD and create a simple web site that will run the CSD when pressing a "Play" button. We'll cover a lot of essential aspects of workflow from organizing your projects, integrating Csound into a web site, and designing your projects to work on the desktop and on the web. 

## Step 1 - Create a new project

We are going to start off by bootstrapping a very simple JavaScript project using [vite](https://vitejs.dev/). There are many great client-side web frameworks to use for making web development an enjoyable development experience; we will use this one as for this tutorial as we have found it easy to use and convenient for development.

First thing we'll need to do is open up a terminal and type in:

```npm create vite```

This may ask you install create-vite, which you can enter 'y' to proceed.

```
Need to install the following packages:
  create-vite
Ok to proceed? (y) y
```

Next, the script will ask you for a project name, framework, and variant. While in real world usage you might choose something like React and Typescript, we will start off with 'Vanilla' and 'JavaScript' for this tutorial.

```
✔ Project name: … tutorial1
✔ Select a framework: › Vanilla
✔ Select a variant: › JavaScript

Scaffolding project in /Users/username/examples/tutorial1...

Done. Now run:

  cd tutorial1
  npm install
  npm run dev
```

The create-vite script has now created a basic project. If you follow the steps provided, you will use npm to install any dependencies listed in package.json and then start the development server using `npm run dev`. If all goes well, you will see terminal output that looks like the following:

```
  VITE v3.1.8  ready in 378 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
```

Open up a browser and navigate to the URL that Vite shows and you should see a basic Vite website. 

## Step 2 - Add Csound to your project

```npm install @csound/browser```

npm will then add a dependency for the latest version of the @csound/browser on npmjs.com to your project and also download and install it to your node_modules folder. If this is successful, you will find the package contents in the node_modules/@csound/browser folder as well as see an entry in your package.json file that looks like the following:

```json
  "dependencies": {
    "@csound/browser": "^6.18.0-beta1"
  }
```

Congratulations! Csound is now available to use in your project and you will be able to use it in your JavaScript code. Now, let's get to the exciting part and take a Csound CSD and run it on your website!

## Step 3 - Run a CSD on your website 

Now that we have a basic website project setup, let's introduce our own code to create our own Csound-based web application. The essential steps to getting Csound running in the browser include:

1. Adding a button to start Csound
2. Instantiating and configuring the Csound engine
3. Loading our Csound code and Running Csound

Let's go over each of these parts below.

### Adding a button to start Csound

Browsers require a user interaction (like a button press) to start running the WebAudio AudioContext. To get going, we will add a button to our HTML code and add an onClick handler to the button.  

First, open up the main.js file. Replace the contents of the file with the following:

```js
import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <button id='startButton'>Start</button>
  </div>
`
```

When the page begins, main.js is included in the index.html file and the code above will run. This will find the div named app and insert HTML content. In this case, we are adding a button with the id of 'startButton' and with the text of 'Start'. 

Save the file and refresh the page. At this point you should see the 'Start' button on the page. 

Next, add the following code to the file to create an async function for starting Csound and to bind that to the button's click event:

```js
const startCsound = async () => {
  console.log("Starting Csound...");
}

document.querySelector('#startButton').addEventListener('click', startCsound);
```

Refresh the page, open up the JavaScript console, and hit the button. You should see "Starting Csound..." called whenever you hit the button. 

Note: The startCsound function is asynchronous as we will be using awaits when we interact with Csound's API, explained further below. 

### Instantiating the Csound Engine

Now we will want to create a Csound engine for our project to use. We also want to make it so that our page only ever uses one Csound engine. (This isn't the only way to use WebAudio Csound, but it is a common use case so we will work with it here.)

First, we will need to import Csound from @csound/browser. Add the following code at the very top of main.js:

```js
import { Csound } from '@csound/browser';
```

Next, replace the previous startCsound code with the following:

```js
let csound = null;

const startCsound = async () => {
  if(csound) {
    return;
  }

  console.log("Starting Csound...");

  csound = await Csound();
  console.log(csound) 
}
```

What the above does is specify a global `csound` variable that is initially set to null.  When startCsound() is called, it now checks to see if `csound` has been initialized yet and, if so, returns out of the function. If not, it runs the code to create a CsoundObj instance by calling `await Csound()`. 

:::note 

WebAudio Csound comes with a number of backend implementations. Each one provides benefits and drawbacks. The Csound() function takes in an object that one can configure for various settings that can influence channel counts and backend chosen.  The return value from Csound() is an instance of CsoundObj.

To clarify, CsoundObj is the interface that contains the WebAudio version of Csound API. It is an object-oriented API versus the traditional Csound C API. 

By default, the single-threaded AudioWorklet version of CsoundObj is used. This implementation works well for most use cases and is recommended to use for your initial forays into WebAudio Csound.

:::

The complete code for main.js at this point should look as below:

```js
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
```

### Loading our Csound Code and Running Csound

Let's now get our Csound code running!  We will use the following Csound CSD code:

```
<CsoundSynthesizer>
<CsOptions>
-o dac --port=10000
</CsOptions>
<CsInstruments>
sr=48000
ksmps=64
nchnls=2
0dbfs=1

instr 1
    ioct = octcps(p4)
    kpwm = oscili(.1, 5)
    asig = vco2(p5, p4, 4, .5 + kpwm)
    asig += vco2(p5, p4 * 2)

    idepth = 3
    acut = transegr:a(0, .002, 0, idepth, .5, -4.2, 0.001, .5, -4.2, 0)
    asig = zdf_2pole(asig, cpsoct(ioct + acut), 0.5)

    asig *= linsegr:a(1, p3, 1, .5, 0)

    out(asig, asig)

endin

instr Main
    inotes[] fillarray 60, 67, 63, 65, 62
    ioct[] fillarray 0,1,0,0,1
    inote = inotes[p4 % 37 % 11 % 5] + 12 * ioct[p4 % 41 % 17 % 5]
    schedule(1, 0, .25, cpsmidinn(inote), 0.25)

    if(p4 % 64 % 37 % 17 % 11 == 0) then
        schedule(1, 0, .5, cpsmidinn(inote + 7), 0.125)
    endif

    schedule(p1, .25, .25, p4 + 1)
endin

schedule("Main", 0, 0, 0)

</CsInstruments>
</CsoundSynthesizer>
```

Save the above code in a file called tutorial1.csd in the root of your project folder (should be in the same folder as main.js). You should be able to run it on the commandline using `csound tutorial1.csd` and hear a small generative music example. 

Next, we need to have the code accessible in our project. We will use a vite's raw loading system to import the CSD as a string by adding the following import to the top of the file:

```
import csd from './tutorial1.csd?raw'
```

This will make the contents of the tutorial1.csd file accessible as a variable named `csd`. 

Next, will will have Csound load the CSD and play the CSD. Modify the startCsound() function to use:

```
  csound = await Csound();

  await csound.compileCsdText(csd);
  await csound.start();

  document.querySelector('#startButton').remove();
```

Now when you press the button you should hear the CSD playing in the browser and the button has disappeared.  


## Summary

Congratulations! You now have a basic Csound web application that renders Csound projects in the browser. Being able to take a work that runs on the desktop and have it run in the browser is a big first-step. We'll continue on in the next tutorial to learn more about the Csound API to create interactive audio projects. 
