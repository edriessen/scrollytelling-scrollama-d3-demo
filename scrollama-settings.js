// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style("height", stepH + "px");
    step.style("width", "250px")

    var figureHeight = window.innerHeight / 2;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;
    
    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers

var toolTipState = 'title';

/*
scrollama magic happens here:
- based on the index, trigger a certiain function from d3-animations.js
- sometimes only fire an event when going down or up in the story
*/ 
function handleStepEnter(response) {
    
    console.log(response);
    // response = { element, direction, index }
    let currentIndex = response.index;
    let currentDirection = response.direction;
    
    // add color to current step only
    step.classed("is-active", function(d, i) {
        return i === currentIndex;
    });

    // update graphic based on step
    switch(currentIndex){
        case 0:
            toolTipState = 'title';
            if(currentDirection === 'up'){
                dotColorGrey();
            }
            break;
        case 1:
            toolTipState = 'title score';
            dotColorSentiment()
            break;
        case 2:
            toolTipState = 'title score magnitude';
            dotResize()
            if(currentDirection === 'up'){
                toggleAxesOpacity(true, false, 0)
            }
            break;
        case 3:
            dotPositionScore()
            if(currentDirection === 'up'){
                toggleAxesOpacity(false, true, 0)
            }
            break;
        case 4:
            dotPositionMagnitude()
            if(currentDirection === 'up'){
                toggleAxesOpacity(true, true, 1)
            }else{
                toggleAxesOpacity(false, true, 1)
            }
            break;
        case 5:
            dotSimplify()
            if(currentDirection === 'up'){
                hideStraightPath()
            }else{
                toggleAxesOpacity(true, true, 0)
            }
            break;
        case 6:
            if(currentDirection === 'up'){
                hideBezierPath()
                toggleElementOpacity(line, 1)
            }else{
                drawStraightPath()
            }
            break;
        case 7:
            toggleElementOpacity(line, 0.25)
            if(currentDirection === 'up'){
                toggleElementOpacity(bubbleChart, 1)
            } else {
                drawBezierPath();
            }
            break;
        case 8:
            if(currentDirection === 'down'){
                toggleElementOpacity(line, 0)
                toggleElementOpacity(bubbleChart, 0)
            }
        default:
            break;
    }

}

function setupStickyfill() {
    d3.selectAll(".sticky").each(function() {
        Stickyfill.add(this);
    });
}

function init() {
    setupStickyfill();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.5,
            debug: false
        })
        .onStepEnter(handleStepEnter);

    // setup resize event
    window.addEventListener("resize", handleResize);
}

// kick things off
init();