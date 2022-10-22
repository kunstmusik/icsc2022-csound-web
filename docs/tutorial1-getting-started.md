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

```
  "dependencies": {
    "@csound/browser": "^6.18.0-beta1"
  }
```

Congratulations! Csound is now available to use in your project and you will be able to use it in your JavaScript code. Now, let's get to the exciting part and take a Csound CSD and run it on your website!

## Step 3 - Run a CSD on your website 

Now that we have a basic website project setup, let's clear open up the main.js file, clear its contents, and start adding our own 