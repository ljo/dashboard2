# eXistdb Dashboard 2

Dashboard 2 is the next generation dashboard for eXistdb.


## Goals

1. improve responsiveness of the dashboard. Should work on as many mobiles and tablets as possible.
1. improve extensibility esp. regarding plugins
1. divide system management functionality from installed apps
1. easily optimizable for performance with regard to CSS, JavaScript and images

## Introduction

Dashboard 2 will use W3C Web Components. As these are not natively supported in all relevant browsers by now we use the Polymer polyfill library to leverage the browser differences. In addition Polymer offers some enhancements that come in handy when developing the components.

Most important about Web Components are custom elements that allow us to create our own custom DOM Elements that implement the functionality of the component. These are treated as first-class citizen DOM Element by the browser meaning that the JavaScript DOM API works for custom elments just like for any other HTML element known by the browser.

Furthermore Web Components do not lock us into a specific front-end framework. There are already 3 different Web Component polyfills around and migration and even combination of them is seemless. Polymer just happens to offer the biggest value. You still can choose to use JQuery, AngularJS or whatever you prefer for the implementation of a component. 


## Installation
Dashboard 2 requires Node.js, Grunt and Bower as tooling which must be setup on your system. The installation might look a bit complicated but once its setup offers a rich toolchain for development esp. with regard to requirement 4.

### Install Node.js

Node.js is used by many projects so please check first if you probably have it installed already by calling `npm` in your terminal.

Otherwise please refer to the [Node.js homepage](http://http://nodejs.org/) for an OS-specific installer for your system.

### Install 

If you have never used Grunt and Bower you can run the following commands in the root directory of Dashboard 2 on your system. Otherwise you should have a look at the explanations first:


1. `[sudo] npm install`
1. `npm install -g grunt-cli`
1. `bower install`


### line-by-line explanation
In **line 1** Node.js will install all dependencies listed in package.json. These already contain Grunt and Bower itself. 

**Important: At least on OSX you'll need to call `sudo npm install` to properly install the dependencies.**

In **line 2** the Grunt command line interface is installed. This might not be necessary if you have run Grunt before. Cli is a separate package that just provides command-line access to the actual Grunt.

In **line 3** bower will install the **runtime** dependencies listed in `bower.json`. Don't be shocked by the amount of components downloaded. The core-elements of Polymer are just loaded as a at-hand sampler library. In production dashboard 2 will only contain the actually used components.


## Building Dashboard 2

tbd.

<!--
Call these commnands in the root dir of your application:

`grunt [targetname]`



Target | Description |
-------- | ---------------- 
default | default Grunt task will create a .xar file in directory build containing the full source of the components managed by bower
dist| creates a fully-optimized version of the .xar application


If you are seeking detail information about the single targets please refer to gruntfile.js for inline documentation.
-->

## Development support targets

When developing the layout and client-side logic of dashboard itself or one of its components (formerly plugins like backup, package manager etc.) it is advisable to work as long as possible with the server built into grunt. This gives you live-reload whenever you save your work in the IDE.

To run the internal server simply execute:

`grunt server`

This command will also setup the 'watch` task in Gruntfile.js that automatically synchronizes your work into the component tree (components directory) used at runtime.




