"use strict";(self.webpackChunkicsc_2022_csound_web=self.webpackChunkicsc_2022_csound_web||[]).push([[671],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=o.createContext({}),l=function(e){var t=o.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=l(e.components);return o.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,u=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=l(n),h=a,m=p["".concat(u,".").concat(h)]||p[h]||c[h]||r;return n?o.createElement(m,i(i({ref:t},d),{},{components:n})):o.createElement(m,i({ref:t},d))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=p;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<r;l++)i[l]=n[l];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},9881:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var o=n(7462),a=(n(7294),n(3905));const r={sidebar_position:1,slug:"/"},i="Csound on the Web",s={unversionedId:"intro",id:"intro",title:"Csound on the Web",description:"Welcome to Csound on the Web! In this tutorial we will learn the essentials of using Csound in a browser-based application. This will enable you take your Csound work across platforms to reach a large audience and work across devices. Along the way, we will cover some best practices for modularizing your work so that you can reuse as much as you can for your browser and non-browser work. Enjoy!",source:"@site/docs/intro.md",sourceDirName:".",slug:"/",permalink:"/icsc2022-csound-web/",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,slug:"/"},sidebar:"tutorialSidebar",next:{title:"Tutorial 1 - Getting Started",permalink:"/icsc2022-csound-web/tutorial1-getting-started"}},u={},l=[{value:"About WebAudio Csound",id:"about-webaudio-csound",level:2},{value:"Getting Started",id:"getting-started",level:2},{value:"What you&#39;ll need",id:"what-youll-need",level:3},{value:"Useful Links",id:"useful-links",level:2},{value:"WebAudio Csound Projects",id:"webaudio-csound-projects",level:2}],d={toc:l};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"csound-on-the-web"},"Csound on the Web"),(0,a.kt)("p",null,"Welcome to Csound on the Web! In this tutorial we will learn the essentials of using Csound in a browser-based application. This will enable you take your Csound work across platforms to reach a large audience and work across devices. Along the way, we will cover some best practices for modularizing your work so that you can reuse as much as you can for your browser and non-browser work. Enjoy!"),(0,a.kt)("h2",{id:"about-webaudio-csound"},"About WebAudio Csound"),(0,a.kt)("p",null,"WebAudio Csound is a JavaScript and TypeScript library for using Csound in browser-based applications. It provides various backend architecture designs that implement the CsoundObj API. The CsoundObj API allows users to work primarily with Csound first without requiring deep knowledge of WebAudio, Workers, and WebAssembly, yet still offer the ability to access lower-level features for more advanced use cases."),(0,a.kt)("p",{align:"center",width:"100%"},(0,a.kt)("img",{src:"/img/WebAudioCsound.drawio.png"}),(0,a.kt)("p",null,(0,a.kt)("b",null,"CsoundObj Backend Architectures"))),(0,a.kt)("h2",{id:"getting-started"},"Getting Started"),(0,a.kt)("p",null,"Before we get going on tutorials, be sure to have the following installed. "),(0,a.kt)("h3",{id:"what-youll-need"},"What you'll need"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://nodejs.org/en/download/"},"Node.js")," version 16.14 or above:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"When installing Node.js, you are recommended to check all checkboxes\nrelated to dependencies."),(0,a.kt)("li",{parentName:"ul"},"The installation should include NPM (the Node Package Management tool) for managing projects and dependencies."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://code.visualstudio.com/"},"Visual Studio Code"),":",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"You're welcome to use whatever text editor you'd like, but we'll be using this one for these tutorials. "),(0,a.kt)("li",{parentName:"ul"},"Install the Csound extension through the Extension Manager. It provides syntax highlighting and live coding capabilities which can help make working with Csound code a little bit easier. ")))),(0,a.kt)("p",null,"We will also be installing additional libraries and tools as we go through the tutorials. "),(0,a.kt)("h2",{id:"useful-links"},"Useful Links"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/@csound/browser"},"WebAudio Csound Documentation")," - Documentation for the WebAudio Csound API. The latest documentation for each version is always published with each release to NPM. ")),(0,a.kt)("h2",{id:"webaudio-csound-projects"},"WebAudio Csound Projects"),(0,a.kt)("p",null,"Project that you might look at for inspiration:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://ide.csound.com"},"Csound Web-IDE")," - The online Csound Web IDE. (",(0,a.kt)("a",{parentName:"p",href:"https://github.com/csound/web-ide"},"Github Project"),").")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://live.csound.com"},"csound-live-code")," - Online live coding environment using Steven Yi's csound-live-code system. (",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kunstmusik/csound-live-code"},"Github Project"),")")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://kunstmusik.github.io/webaudio-csound-samples-example/"},"webaudio-csound-samples-example")," - Example using FS and Csound project that loads audio samples. (",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kunstmusik/webaudio-csound-samples-example"},"Github Project"),")")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://github.com/kunstmusik/gamepad-csound-web"},"gamepad-csound-web")," - Example using Gamepad API and Webaudio Csound. (",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kunstmusik/gamepad-csound-web"},"Github Project"),")")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://kunstmusik.github.io/learn-synthesis/"},"learn-synthesis")," - Learning site for various synthesis methods. (",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kunstmusik/learn-synthesis"},"Github Project"),")"))))}c.isMDXComponent=!0}}]);