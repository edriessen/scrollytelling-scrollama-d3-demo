# Scrollytelling demo using scrollama.js and d3.js
This repository contains a demo setup for *scrollytelling*. It uses scrollama.js and d3.js (v3.5). The setup assumes you have a screen that is at least 1100 pixels wide and it has only been tested on a modern Firefox browser.

## Background

I have created this demo for exploratory purposes. I heard about this thing called *scrollytelling*; a way to scroll through a story while some part of the website sticks around and updates dynamically. It sounded like a great way to tell stories on the web and that's the very reason I wanted to give it a try. I applied it to the story behind one of my personal projects. This repository is the result. 

[You can view a live demo here](http://edriessen.com/app/scrollytelling-demo/).

## Data and technology

The data are generated using my [Avicii Open Data Art project](https://github.com/edriessen/avicii-project) (Python). It uses Google's Natural Language API to turn music lyrics into sentiment data (details are in the project repo). The data for this demo are in `data/avciiTimData.js`. It includes two types of data:

- the `data` variable holds an array of songs; each song has 4 attributes: an index, title, score and magnitude.
- the `bezierData` variable holds an array of nested arrays; each nested array holds the coordinates to draw a (Bezier) path.

Besides that, I use two libraries:

- [scrollama.js](https://pudding.cool/process/introducing-scrollama/) for scrollytelling functionality. 
- [d3.js libraries (v3.5)](https://d3js.org/) libraries to visualise data and animate between states. Used plots and animations are: scatterplot, (Bezier)paths, changing position of plotted elements, changing value range of axes, changing visibility of axes, and animating drawing a path. *Links to the examples I used for these are listed below.* 

And I use some vanilla HTML, CSS and JavaScript.

## How to use

With this demo, I aim to give people a head start in srollytelling using scrollama with D3. It uses a small, understandable, dataset of 12 items with two variables. The custom code is for scrollama is in `scrollama-settings.js` and the custom code for d3 is in `d3-animations.js`. 

The magic of this scrollytelling demo is in the interaction between the scrollama and d3. Scrollama allows you to trigger some code at a certain point in the story. If the code you trigger is a nice d3 animation, the results get pretty nice quite quickly. 

## Challenges

Scrollama allows you track where you are in the story (the nth element) and if the user is scrolling up or down (and probably some more stuff I don't know of). I currently assume that a user starts at the top of the story. After that, I capture both the downwards and upwards scrolling events correctly. I haven't captured two other user scenario's:

- a user that just scrolls very fast, too fast for animations to keep up. 
- a user that lands at some point after the first story element. 

I won't be fixing these, as they are resolved when a user restarts at the beginning (read: users that relax and take their time to slowly scroll to the top).

## What's next

I plan to implement a few updates to the project:

- ~~Change the colours for sentiment to a more colour-blind-friendly colour scheme~~
- Add a technical note to each story element explaining what changes happen in the background
- Add some images to this repo
- ~~Add a Dutch version~~
- Add other languages (if you want to help, [reach out](http://www.edriessen.com/contact/))
- Maybe rewrite some code (it now really is a blend of various sources)

## Acknowledgements

Phoe, where to start. This project combines the knowledge of various people and blogposts. I'll aim to include them here: 

- [Tiago Marnhão Barreto Pereira](https://www.linkedin.com/in/tiagombp/): for showing a great example of scrollytelling with D3, inspiring me to give it a try myself, and helping me out with some great references. 
- [Scrollama.js](https://pudding.cool/process/introducing-scrollama/): they have great documentation and a some good examples of various basic setups (I based my demo on the [sticky overlay setup](https://russellgoldenberg.github.io/scrollama/sticky-overlay/)). 
- [D3.js](https://www.d3-graph-gallery.com/): I used various examples to test try out the various stages of my animation:   
  - [Drawing paths](http://using-d3js.com/05_01_paths.html): a good overview of path-drawing options in D3. 
  - [Animated paths](https://www.yerich.net/blog/bezier-curve-animation-using-d3): Richard Ye shares a great trick on how to animated paths with D3. 
  - D3.js Graph Gallery: Yan Holtz offers some great and understandable resources on all sorts of things related to D3. One of them is transitions. I think their pages do a really good job at explaining a simple concept and increasing the complexity of it step by step. I'll refer to two I have used for this demo: [bubble chart with data tooltip](https://www.d3-graph-gallery.com/graph/bubble_tooltip.html) and [various chart animations](https://www.d3-graph-gallery.com/graph/interactivity_transition.html).
- **Avicii**: I just can't not name him in any project that somehow touches his music. He still is a great inspiration that led me to work on some very interesting projects and develop new skills. I now get more enjoyment out creatively applying my skills and sharing projects with other people. (And the colour pallet of this demo is based on the cover art for TIM).

If you have any questions or need some help: reach out to me [here](http://www.edriessen.com/contact/). 





