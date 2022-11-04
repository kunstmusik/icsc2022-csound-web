"use strict";(self.webpackChunkicsc_2022_csound_web=self.webpackChunkicsc_2022_csound_web||[]).push([[833],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>p});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),h=u(n),p=o,m=h["".concat(s,".").concat(p)]||h[p]||c[p]||i;return n?a.createElement(m,r(r({ref:t},d),{},{components:n})):a.createElement(m,r({ref:t},d))}));function p(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var u=2;u<i;u++)r[u]=n[u];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},6931:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var a=n(7462),o=(n(7294),n(3905));const i={sidebar_position:3},r="Tutorial 2 - Interacting with Csound",l={unversionedId:"tutorial2-interacting-with-csound",id:"tutorial2-interacting-with-csound",title:"Tutorial 2 - Interacting with Csound",description:"In this tutorial we will extend the work we did in Tutorial 1 and use essential parts of the Csound API to introduce interactivity. We will cover discrete events for triggering SCO notes and evaluating ORC code, as well as communicate continous data with Csound using channels.",source:"@site/docs/tutorial2-interacting-with-csound.md",sourceDirName:".",slug:"/tutorial2-interacting-with-csound",permalink:"/icsc2022-csound-web/tutorial2-interacting-with-csound",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial2-interacting-with-csound.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Tutorial 1 - Getting Started",permalink:"/icsc2022-csound-web/tutorial1-getting-started"},next:{title:"Tutorial 3 - Microphone/Midi interaction",permalink:"/icsc2022-csound-web/tutorial3-microphone-midi-interaction"}},s={},u=[{value:"Step 1 - Project Setup",id:"step-1---project-setup",level:2},{value:"Step 2 - Triggering Score Events",id:"step-2---triggering-score-events",level:2},{value:"Testing on the Desktop",id:"testing-on-the-desktop",level:3},{value:"Evaluating Csound SCO",id:"evaluating-csound-sco",level:3},{value:"About .readScore() and Scheduling",id:"about-readscore-and-scheduling",level:3},{value:"Step 3 - Evaluating ORC code",id:"step-3---evaluating-orc-code",level:2},{value:"Setting Options",id:"setting-options",level:3},{value:"Clocks",id:"clocks",level:3},{value:"Evaluating ORC Code",id:"evaluating-orc-code",level:3},{value:"Step 4 - Writing Continuous Data (Channels)",id:"step-4---writing-continuous-data-channels",level:2},{value:"Adding a Slider",id:"adding-a-slider",level:3},{value:"Update Csound code to use channel value",id:"update-csound-code-to-use-channel-value",level:3},{value:"Initializing the Channel",id:"initializing-the-channel",level:3},{value:"Step 5 - Reading Continuous Data (Channels)",id:"step-5---reading-continuous-data-channels",level:2},{value:"Add a Mixer Instrument",id:"add-a-mixer-instrument",level:3},{value:"Reading channel values",id:"reading-channel-values",level:3},{value:"Conclusion",id:"conclusion",level:2}],d={toc:u};function c(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"tutorial-2---interacting-with-csound"},"Tutorial 2 - Interacting with Csound"),(0,o.kt)("p",null,"In this tutorial we will extend the work we did in Tutorial 1 and use essential parts of the Csound API to introduce interactivity. We will cover discrete events for triggering SCO notes and evaluating ORC code, as well as communicate continous data with Csound using channels.  "),(0,o.kt)("h2",{id:"step-1---project-setup"},"Step 1 - Project Setup"),(0,o.kt)("p",null,"For this tutorial, we are going to start off by making a copy of our tutorial1 folder and renaming it to tutorial2. Just in case, in a terminal, cd into the folder and type ",(0,o.kt)("inlineCode",{parentName:"p"},"npm install"),", to ensure all dependencies are installed. "),(0,o.kt)("p",null,'Next, edit the package.json file so that "name" is set to "tutorial2" like so:'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'  "name": "tutorial2",\n')),(0,o.kt)("p",null,"Finally, rename tutorial1.csd to tutorial2.csd and update the import in main.js to use tutorial2.csd. "),(0,o.kt)("h2",{id:"step-2---triggering-score-events"},"Step 2 - Triggering Score Events"),(0,o.kt)("p",null,"Let's take the generative pattern generator from tutorial1 and extend the project to make it interactive so that we can perform in realtime with the work. Begin by adding the following gesture generating instrument to tutorial2.csd:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csound"},"instr Flourish\n    inotes[] fillarray 72, 74, 75, 77, 79 \n    inote = inotes[floor(rnd(5))]\n\n    schedule(1, 0, .25, cpsmidinn(inote), ampdbfs(-12 + p4 * .5))\n\n    if(p4 > -60) then\n        schedule(p1, .125, 0, p4 - 1)\n    endif\nendin\n")),(0,o.kt)("p",null,"This code uses temporal recursion to schedule itself in the future and play notes with a random selection of note numbers at quieter amplitudes over time. Let's first test the code with desktop Csound then work on integrating it with our application."),(0,o.kt)("h3",{id:"testing-on-the-desktop"},"Testing on the Desktop"),(0,o.kt)("p",null,'To test what this sounds like outside of the web project, first run the CSD from the commandline (or use the "Csound: Play Active Document" command in VS Code). Csound will run and listen for UDP messages on port 10000 (set in the CsOptions of the CSD) to allow us to live code and experiment with Csound code in realtime. '),(0,o.kt)("p",null,"Next, create a test.orc file and put the following in the file:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csound"},'schedule("Flourish", 0, 0, 0)\n')),(0,o.kt)("p",null,"Finally, put the cursor on the line with the schedule call and use cmd-enter (or ctrl-enter) in VS Code to evaluate the orchestra code. This will send the code via UDP to port 10000 where csound will receive the message and evalute the ORC code and play the Flourish."),(0,o.kt)("p",null,"Csound has support for evaluating both orchestra and score code at runtime over UDP. These are are important parts of live coding for rapid development of Csound code as well as live performance.  The Csound API also exposes these capabilities for programmtic use and we will avail ourselves of these in the sections below. "),(0,o.kt)("h3",{id:"evaluating-csound-sco"},"Evaluating Csound SCO"),(0,o.kt)("p",null,"We now want to have the live code same experience within our web application so that we can hit a button to trigger the Flourish. To do this, we will need to:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},'Add a "Flourish" button.'),(0,o.kt)("li",{parentName:"ol"},"Set a callback to send SCO code to Csound to evaluate.")),(0,o.kt)("p",null,"To do this, we'll add the following utility function to main.js:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const createPerformanceUI = (csound) => {\n  document.querySelector('#app').innerHTML = `\n    <div>\n      <button id='flourish'>Flourish</button>\n    </div>\n  `\n\n  document.querySelector('#flourish').addEventListener('click', async () => {\n    await csound.readScore(`i \"Flourish\" 0 0 0`);\n  })\n}\n")),(0,o.kt)("p",null,"and we will add the following line of code to the end of our startCsound() function:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"  createPerformanceUI(csound);\n")),(0,o.kt)("p",null,"Now when we run the project, the user will hit start and see the start button disappear and the performance interface revealed. The ",(0,o.kt)("inlineCode",{parentName:"p"},"createPerformanceUI()")," function will both create new user interface elements as well as setup callback handlers to do things like call ",(0,o.kt)("inlineCode",{parentName:"p"},".readScore()")," to perform Csound SCO notes.  If all is well, the user can now hit the Flourish button to evaluate the Csound SCO code that triggers the Flourish generator.  "),(0,o.kt)("p",null,"The final code in main.js at this point of the tutorial should now look like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { Csound } from '@csound/browser';\nimport csd from './tutorial2.csd?raw'\nimport './style.css'\n\ndocument.querySelector('#app').innerHTML = `\n  <div>\n    <button id='startButton'>Start</button>\n  </div>\n`\n\nlet csound = null;\n\nconst createPerformanceUI = (csound) => {\n  document.querySelector('#app').innerHTML = `\n    <div>\n      <button id='flourish'>Flourish</button>\n    </div>\n  `\n\n  document.querySelector('#flourish').addEventListener('click', async () => {\n    await csound.readScore(`i \"Flourish\" 0 0 0`);\n  })\n}\n\nconst startCsound = async () => {\n  if(csound) {\n    return;\n  }\n\n  console.log(\"Starting Csound...\");\n\n  csound = await Csound();\n\n  await csound.compileCsdText(csd);\n  await csound.start();\n\n  document.querySelector('#startButton').remove();\n\n  createPerformanceUI(csound);\n}\n\ndocument.querySelector('#startButton').addEventListener('click', startCsound);\n")),(0,o.kt)("h3",{id:"about-readscore-and-scheduling"},"About .readScore() and Scheduling"),(0,o.kt)("p",null,"The readScore() method takes in Csound SCO text and evaluates it at runtime. Start times for notes are relative to the time when Csound evaluates the code. While we are using a hardcoded SCO string, you can certainly generate any SCO you would like in JavaScript and send it to Csound."),(0,o.kt)("p",null,'When we use score like we did above, it works very well to express the idea of "play this immediately". However, if we trigger the notes a few times we\'ll find that the gesture is not in-time with the Main generator.'),(0,o.kt)("p",null,'When we want to do things that are timed relative to other musical events occuring in Csound, we will need to use other techniques and designs to express things like "play this at the start of the next measure" or "update the looping content when the current loop ends". In those situations, it may be better to use ORC code evaluation where we can send code will read time values within Csound and schedule precisely in time with other playing content. We will explore this below.'),(0,o.kt)("h2",{id:"step-3---evaluating-orc-code"},"Step 3 - Evaluating ORC code"),(0,o.kt)("p",null,"While evaluating SCO at runtime can serve many use cases for events, evaluating ORC gives us additional tools. For example, if we wanted the Flourish to run in sync with the Main music generator, we would need to have have it trigger according to the clock time of the Csound engine. "),(0,o.kt)("h3",{id:"setting-options"},"Setting Options"),(0,o.kt)("p",null,"First off, we're going to use the JavaScript console to view Csound output to help us while we develop. If you open up the console and run the current project, you will see that it generates a lot of log output for every realtime event that gets generated. Let's first turn off those messages by using the following code in ",(0,o.kt)("inlineCode",{parentName:"p"},"startCsound()")," right after we create Csound and before we call ",(0,o.kt)("inlineCode",{parentName:"p"},"compileCsdText()"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'  await csound.setOption("-m0");\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},".setOption()")," allows us to set a single commandline flag; in this case, we are using the -m option with value 0 to disable messages. (If you need to set multiple options, we can call ",(0,o.kt)("inlineCode",{parentName:"p"},".setOption()")," multiple times.)"),(0,o.kt)("h3",{id:"clocks"},"Clocks"),(0,o.kt)("p",null,"Our application has an implicit clock that is simplistic and problematic. Our Main generator currently schedules itself to run every 0.25 beats into the future, giving us 8th note resolution at 120 BPM. Due to rounding issues, it may not always be precisely at 0.25 and the errors may gradually accumulate. The amounts might be small but when summed over time can cause things to be a little difficult for the purpose of synchronizing other events.  "),(0,o.kt)("p",null,"To synchronize new events with those running in csound--such as the ones we generate from our button callback that runs in the main thread--we will need to have some way to schedule according to the current time in the audio thread. Because Csound has relative time note processing, and beacuse of message passing latency and uncertainty on when an event is run after it is triggered, we can not depend on just reading the current time, doing calculations in the other thread, and sending that over to run. The time calculations ",(0,o.kt)("em",{parentName:"p"},"have")," to happen in the audio thread to get precise synchronization.  "),(0,o.kt)("p",null,"So let's first add a new user-defined opcode called ",(0,o.kt)("inlineCode",{parentName:"p"},"next_time"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csound"},"opcode next_time, i, i\n  inext xin\n\n  itime = times:i()\n  iticks = round(itime / inext)\n  iticks += 1\n\n  iout = (iticks * inext) - itime\n  xout iout\nendop\n")),(0,o.kt)("p",null,"This opcode will, given a subdivision of time (such as .25 beats), convert the current real time in seconds to number of subdivisions as a whole number, add 1 to get the next tick, then convert the difference between now and the time of the next subdivision tick. "),(0,o.kt)("p",null,"This implementation for a clock and time calculations is a bit simple but it will do for this tutorial. (In a more robust application, a time keeping system that allows for variable BPM and current measure/beat reading would be ideal.) "),(0,o.kt)("p",null,"With the new code, we will update Main and Flourish to both use next_time() when scheduling ahead in time like so:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csound"},"instr Flourish\n    inotes[] fillarray 72, 74, 75, 77, 79 \n    inote = inotes[floor(rnd(5))]\n\n    schedule(1, 0, .25, cpsmidinn(inote), ampdbfs(-12 + p4 * .5))\n\n    if(p4 > -60) then\n        schedule(p1, next_time(.125), 0, p4 - 1)\n    endif\nendin\n\ninstr Main\n    inotes[] fillarray 60, 67, 63, 65, 62\n    ioct[] fillarray 0,1,0,0,1\n    inote = inotes[p4 % 37 % 11 % 5] + 12 * ioct[p4 % 41 % 17 % 5]\n    schedule(1, 0, .25, cpsmidinn(inote), 0.25)\n\n    if(p4 % 64 % 37 % 17 % 11 == 0 && inote != 74 && inote != 62) then\n        schedule(1, 0, .5, cpsmidinn(inote + 7), 0.125)\n    endif\n\n    schedule(p1, next_time(.25), .25, p4 + 1)\nendin\n")),(0,o.kt)("p",null,"With this in place, we can now move on to using ORC evaluation to synchronize our user-triggered event with the musical time of the Main score generating instrument."),(0,o.kt)("h3",{id:"evaluating-orc-code"},"Evaluating ORC Code"),(0,o.kt)("p",null,"Let us replace the call to ",(0,o.kt)("inlineCode",{parentName:"p"},".readScore()")," with ",(0,o.kt)("inlineCode",{parentName:"p"},".evalCode()")," to send Csound ORC code to trigger Flourish in time with the Main generator:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"  document.querySelector('#flourish').addEventListener('click', async () => {\n    // await csound.readScore(`i \"Flourish\" 0 0 0`);\n    await csound.evalCode(`\n      schedule(\"Flourish\", next_time(.25), 0, 0)\n    `)\n  })\n")),(0,o.kt)("p",null,"Now when you run the project, you should hear the Flourish performed in time with the Main generator. By sending ORC code instead of SCO code, the schedule call can use the ",(0,o.kt)("inlineCode",{parentName:"p"},"next_time()")," UDO to calculate at evaluation time when is the next .25 time window boundary and run in sync with the Main generator."),(0,o.kt)("h2",{id:"step-4---writing-continuous-data-channels"},"Step 4 - Writing Continuous Data (Channels)"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},".readScore()")," and ",(0,o.kt)("inlineCode",{parentName:"p"},".evalCode()")," are primary tools for event-based interactivity with Csound. To work with continuous data, we will use Csound's channel system to communicate with Csound."),(0,o.kt)("p",null,"Let's say we want to make the amplitude of the notes that the Main generator be something we can control from the web interface using a slider. To do this we will need to:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Add a slider UI element that will send new values to Csound via a channel whenever it changes. "),(0,o.kt)("li",{parentName:"ol"},"Update our Csound code to read the value from the channel."),(0,o.kt)("li",{parentName:"ol"},"Be sure we initialize the channel with a good starting value. ")),(0,o.kt)("h3",{id:"adding-a-slider"},"Adding a Slider"),(0,o.kt)("p",null,"Let's update our ",(0,o.kt)("inlineCode",{parentName:"p"},"createPerformanceGUI()")," function to add a slider and add an input event listener so that we can update Csound when the slider value changes. Modify your code to look like the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const createPerformanceUI = (csound) => {\n  document.querySelector('#app').innerHTML = `\n    <div>\n      <button id='flourish'>Flourish</button>\n      <input id='ampSlider' type='range' min='-60' max='-12' value='-12'/>\n    </div>\n  `\n\n  document.querySelector('#flourish').addEventListener('click', async () => {\n    // await csound.readScore(`i \"Flourish\" 0 0 0`);\n    await csound.evalCode(`\n      schedule(\"Flourish\", next_time(.25), 0, 0)\n    `)\n  })\n\n  document.querySelector('#ampSlider').addEventListener('input', async (evt) => {\n    await csound.setControlChannel('main.note.amp', evt.target.value)\n  })\n}\n")),(0,o.kt)("p",null,"We're using here an input of type range and an ID of ampSlider. The min is set to -60 and max to -12 and a default value of -12. We are going to read these values as dbFS in our Csound code. "),(0,o.kt)("p",null,"When an input event is fired, we get the ",(0,o.kt)("inlineCode",{parentName:"p"},"evt.target.value")," to get the current value from the slider and use the ",(0,o.kt)("inlineCode",{parentName:"p"},".setControlChannel()")," method on the Csound object to set the ",(0,o.kt)("inlineCode",{parentName:"p"},"main.note.amp")," channel with the given value.  "),(0,o.kt)("h3",{id:"update-csound-code-to-use-channel-value"},"Update Csound code to use channel value"),(0,o.kt)("p",null,"Next, let's update the Csound code for Main so that it uses the 'main.note.amp' channel value for the notes. We originally used an amplitude of 0.25 (roughly -12 dbFS) for the main notes and 0.125 (or half the main amplitude) for the secondary fifths. "),(0,o.kt)("p",null,"Update the Main instrument in tutorial2.csd to look as the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csound"},'instr Main\n    iamp = ampdbfs(chnget:i("main.note.amp"))\n    inotes[] fillarray 60, 67, 63, 65, 62\n    ioct[] fillarray 0,1,0,0,1\n    inote = inotes[p4 % 37 % 11 % 5] + 12 * ioct[p4 % 41 % 17 % 5]\n    schedule(1, 0, .25, cpsmidinn(inote), iamp)\n\n    if(p4 % 64 % 37 % 17 % 11 == 0 && inote != 74 && inote != 62) then\n        schedule(1, 0, .5, cpsmidinn(inote + 7), iamp / 2)\n    endif\n\n    schedule(p1, next_time(.25), .25, p4 + 1)\nendin\n')),(0,o.kt)("p",null,"We're now using ",(0,o.kt)("inlineCode",{parentName:"p"},"chnget:i()")," to read the value set in the 'main.note.amp' channel as an i-rate variable, and converting that from dBFS to amplitude using ",(0,o.kt)("inlineCode",{parentName:"p"},"ampdbfs()"),". After we have the amplitude value, we now use it for the schedule calls, using the same half-amplitude for the the perfect fifths."),(0,o.kt)("h3",{id:"initializing-the-channel"},"Initializing the Channel"),(0,o.kt)("p",null,"If you were to run this project now, however, you will find that the generator will produce very loud clipped notes. This is because channels default to the value of 0 if no value has been set, and 0 dBFS is certainly a lot louder than the -12 dBFS we were expecting!"),(0,o.kt)("p",null,"To deal with this, we will initialize the channel to a known good value prior to starting Csound. Update your ",(0,o.kt)("inlineCode",{parentName:"p"},"startCsound()")," code to add a call to ",(0,o.kt)("inlineCode",{parentName:"p"},".setControlChannel()")," like so:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const startCsound = async () => {\n  if(csound) {\n    return;\n  }\n\n  console.log(\"Starting Csound...\");\n\n  csound = await Csound();\n\n  await csound.setOption(\"-m0\");\n  await csound.compileCsdText(csd);\n\n  await csound.setControlChannel('main.note.amp', -12);\n  await csound.start();\n  csound.ev\n\n  document.querySelector('#startButton').remove();\n\n  createPerformanceUI(csound);\n}\n")),(0,o.kt)("h2",{id:"step-5---reading-continuous-data-channels"},"Step 5 - Reading Continuous Data (Channels)"),(0,o.kt)("p",null,"Finally, let's say we want to read some values from Csound. We can use ",(0,o.kt)("inlineCode",{parentName:"p"},".getControlChannel()")," to read values that we set in Csound code. For example, let's say we want to know the current amplitude in dBFS for our Csound audio. We'll need to:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Add a mixer instrument to render audio output audio as well as measure the dBFS value for the signal and write the value to a channel."),(0,o.kt)("li",{parentName:"ol"},"In the JS side, have a timer that periodically reads the channel from from Csound and updates the UI.")),(0,o.kt)("h3",{id:"add-a-mixer-instrument"},"Add a Mixer Instrument"),(0,o.kt)("p",null,'Let\'s update instr 1 to mix its audio to audio rate channels named "master1" and "master2".  Remove the line with outs() and use:'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csound"},'    chnmix(asig, "master1")\n    chnmix(asig, "master2")\n')),(0,o.kt)("p",null,"Next, lets add a Mixer instrument that:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},'Reads audio from "master1" and "master2"'),(0,o.kt)("li",{parentName:"ol"},"Applies reverb using ",(0,o.kt)("inlineCode",{parentName:"li"},"reverbsc")),(0,o.kt)("li",{parentName:"ol"},'Measures the RMS of the sign, converts it to dBFS, and write it out to a channel called "dbfs".'),(0,o.kt)("li",{parentName:"ol"},"Sends out the final signal to the the soundcard using ",(0,o.kt)("inlineCode",{parentName:"li"},"outs()"),"."),(0,o.kt)("li",{parentName:"ol"},"Clear the audio channels to prevent accumulation.")),(0,o.kt)("p",null,"Add the following code to your tutorial2.csd:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csound"},'instr Mixer\n  a1 = chnget:a("master1")\n  a2 = chnget:a("master2")\n\n  ar1, ar2 reverbsc a1, a2, 0.9, 12000 \n\n  a1 += ar1 * 0.25\n  a2 += ar2 * 0.25\n\n  kamp = rms(a1)\n  kdbfs = dbfsamp(kamp)\n  chnset(kdbfs, "dbfs")\n\n  out(a1, a2)\n\n  chnclear("master1", "master2")\n\nendin \n\nschedule("Mixer", 0, -1)\n')),(0,o.kt)("h3",{id:"reading-channel-values"},"Reading channel values"),(0,o.kt)("p",null,"Now that we have Csound writing out the amplitude in dBFS to a channel, lets now read it and report it to the user.  To do this we will need:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"A place in the DOM to show the value"),(0,o.kt)("li",{parentName:"ol"},"A repeating function that will read values from Csound and update the UI.")),(0,o.kt)("p",null,"First, let's add a p tag to our UI that we will use to display the dBFS value for our audio signal. Update ",(0,o.kt)("inlineCode",{parentName:"p"},"createPerformanceUI()")," to add the p tag like so:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const createPerformanceUI = (csound) => {\n  document.querySelector('#app').innerHTML = `\n    <div>\n      <button id='flourish'>Flourish</button>\n      <input id='ampSlider' type='range' min='-60' max='-12' value='-12'/>\n      <p id='dbfs'></p>\n    </div>\n  `\n  ...\n")),(0,o.kt)("p",null,"Now, update the UI to show the dBFS value, we will use a temporal recursion function using setTimeout() that we will define within the ",(0,o.kt)("inlineCode",{parentName:"p"},"startCsound()")," function. After the line with ",(0,o.kt)("inlineCode",{parentName:"p"},"createPerformanceUI(csound);")," but before the final ",(0,o.kt)("inlineCode",{parentName:"p"},"}"),", insert the following code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"  const dBFSReader = () => {\n    csound.getControlChannel('dbfs').then(v => {\n      document.querySelector('#dbfs').innerHTML = v;\n    })\n    setTimeout(dBFSReader, 1000 / 10)\n  }\n  dBFSReader();\n")),(0,o.kt)("p",null,"The call to ",(0,o.kt)("inlineCode",{parentName:"p"},"csound.getControlChannel()")," returns a Promise that we can define a then-callback to perform an operation once the value is retrieved and the Promise is resolved. Our callback here simply finds the p tag with ID 'dbfs' and write the control channel value as the innerHTML contents. "),(0,o.kt)("p",null,"It's not pretty and wouldn't be great for real-world usage, but it is enough to show the technique! As the CsoundObj API returns Promises, it gives us the flexibility to use .then() or use async/await.  "),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"The CsoundObj API uses Promises as return values for almost all API functions. The various backend implementations have the WebAssembly Csound instance often in other threads (in the AudioWorklet thread or a separate web worker). Using Promises gives us the ability to perform an operation, wait for it to go across threads and back again, and get notified when a return value is ready. ")),(0,o.kt)("h2",{id:"conclusion"},"Conclusion"),(0,o.kt)("p",null,"In this tutorial we added interactivity to our web application using three primary techniques: reading score, evaluating orchestra code, and writing/reading control channels. Hopefully by going through this tutorial you have gained insight into the process of developing and transforming your Csound projects into interactive web programs."))}c.isMDXComponent=!0}}]);