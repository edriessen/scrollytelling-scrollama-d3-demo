// set the dimensions and margins of the graph
const margin = {top: 50, right: 25, bottom: 45, left: 50},
      width = 700 - margin.left - margin.right,
      height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#avicii_viz")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

// set colours for plot
const color_mapping = {
    red: '#A6055D',
    grey: '#777',
    green: '#00C184'
}

// Add X axis
const x = d3.scaleLinear()
    .domain([0, 13])
    .range([ 0, width ]);
              
svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .attr("class", "Xaxis axis")
    .style("opacity", 0)
    .call(d3.axisBottom(x));

// Add Y axis
const y = d3.scaleLinear()
    .domain([0, 2])
    .range([ height, 0]);

svg.append("g")
    .attr("class", "Yaxis axis")
    .style("opacity", 0)
    .call(d3.axisLeft(y));

// Add a scale for bubble size
const z = d3.scaleLinear()
    .domain([0, 1])
    .range([ 1, 4]);
              
var tooltip = d3.select("#avicii_viz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")

// change tooltip text based on position in story
function returnTooltipText(step, d){
    
    switch (step){
        case 'title':
            return d.index + ": " + d.title
            break;
        case 'title score':
            return d.index + ": " + d.title +
                " - sentiment score: " + d.score 
            break;
        case 'title score magnitude':
            return d.index + ": " + d.title +
                " - sentiment score: " + d.score +
                " - magnitude: " + d.magnitude
            break;
    }             
    
}
              
// create 2 functions to show and hide the tooltip
var showTooltip = function(d) {
    tooltip
        .transition()
        .duration(200)
    tooltip
        .style("opacity", 1)
        .html(returnTooltipText(toolTipState, d))
}

var hideTooltip = function(d) {
    tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
}

// add bubble chart
const bubbleChart = svg.append('g')
    .attr("class", "chart")
    .selectAll("dot")
    .data(data)
        .join("circle")
            .attr("class", "bubbles")
            .attr("cx", d => x(d.index))
            .attr("cy", d => y(1))
            .attr("r", 10)
            .style("fill", "#F2E8DC")
            .attr("stroke", "white")
        .on("mouseover", showTooltip )
        .on("mouseleave", hideTooltip )      
              
let bubbleRadius = 'pop'
var xAxis = d3.axisBottom().scale(x);
var yAxis = d3.axisLeft().scale(y);
    
// various functions to update chart elements

function dotColorGrey(){
    bubbleChart
        .data(data)
        .transition()
            .duration(1000)
                .attr("r", 10)  
                .style("fill", "#F2E8DC")
}

function dotColorSentiment(){
    bubbleChart               
        .data(data)
        .transition()
            .duration(1000)
                .attr("r", 10)  
                .style("fill", function(d){ 
                if (d.score > 0){
                    return color_mapping.green
                } else if (d.score < 0){
                    return color_mapping.red
                } else {
                    return color_mapping.grey
                }
    })
}

function dotResize(){
    x.domain([0,13]);
    
    svg.selectAll(".Xaxis")
        .transition()
        .duration(1000)
            .call(xAxis);
                          
    y.domain([0,2]);
    
    svg.selectAll(".Yaxis")
        .transition()
        .duration(1000)
            .call(yAxis);
                          
    bubbleChart
        .data(data)
        .transition()
        .duration(1000)
            .attr("cx", d => x(d.index))
            .attr("cy", d => y(1))
            .attr("r", d => (d.magnitude*2.7));
    
}

function dotPositionScore(){
    x.domain([-.8,.8]);
    
    svg.selectAll(".Xaxis")
        .transition()
        .duration(1000)
            .style("opacity", 1)
            .call(xAxis);
                          
    
    y.domain([0,2]);
    
    svg.selectAll(".Yaxis")
        .transition()
        .duration(1000)
            .call(yAxis);
                          
    bubbleChart
        .data(data)
        .transition()
        .duration(1000)
            .attr("cx", d => x(d.score))
            .attr("cy", d => y(1))
}

function dotPositionMagnitude(){
    y.domain([1,d3.max(data, function(d) { return d.magnitude + 1 }) ]);
    
    svg.selectAll(".Yaxis")
        .transition()
        .duration(1000)
            .style("opacity", 1)
            .call(yAxis);

    bubbleChart
        .data(data)
        .transition()
        .duration(1000)
            .style("fill", function(d){ 
                if (d.score > 0){
                    return color_mapping.green
                } else if (d.score < 0){
                    return color_mapping.red
                } else {
                    return color_mapping.grey
                }
            })
            .attr("r", d => (d.magnitude*2))
            .attr("cy", d => y(d.magnitude))
}

function dotSimplify(){
    bubbleChart
        .data(data)
        .transition()
        .duration(1000)
            .style("fill", "black")
            .attr("r", 5)

}

function toggleAxesOpacity(toggleX, toggleY, opacity){
    if(toggleX){
        svg.selectAll(".Xaxis")
            .transition()
            .duration(1000)
                .style("opacity", opacity)
    }
    
    if(toggleY){
        svg.selectAll(".Yaxis")
            .transition()
            .duration(1000)
                .style("opacity", opacity)
    }
}

function drawStraightPath(){
    if (typeof line === 'undefined'){
        var path = d3.path();
                          
        for (var item = 0; item < data.length; item++){
            let x_value = data[item].score
            let y_value = data[item].magnitude
            if (item === 0){
                path.moveTo(x(x_value), y(y_value));
            } else {
                path.lineTo(x(x_value), y(y_value));
            }
        }
        
        window.line = d3.select(".chart")
            .append("path")
            .attr("class", "straight")
            .attr("d", path)

        window.totalLength = line.node().getTotalLength()
    }

    line
      .attr("stroke", "#F2E8DC")
      .attr("fill", "none")
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(3000)
        .attr("stroke-dashoffset", 0)
}

function hideStraightPath(){
    line
        .transition()
        .duration(3000)
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
    
}

function toggleElementOpacity(element, opacity){
    element
        .transition()
        .duration(1000)
            .style("opacity", opacity)
}

function drawBezierPath(){
 

    if (typeof lineBezier === 'undefined'){
        var pathBezier = d3.path();

        for (var item = 0; item < bezierData.length; item++){
            let currenItem = bezierData[item];

            if(item === 0){
                pathBezier.moveTo(x(currenItem[0]), y(currenItem[1]));
            }


            pathBezier.bezierCurveTo(
                x(currenItem[2]), 
                y(currenItem[3]),
                x(currenItem[4]), 
                y(currenItem[5]),
                x(currenItem[6]), 
                y(currenItem[7]),
          );

        }  
        
        window.lineBezier = d3.select(".chart")
            .append("path")
                .attr("class", "bezier")
                .attr("stroke-width", "2px")
                .attr("d", pathBezier)

        window.totalLengthBezier = lineBezier.node().getTotalLength()
    }

    lineBezier
        .attr("stroke", "#F2E8DC")
        .attr("fill", "none")
        .attr("stroke-dasharray", totalLengthBezier + " " + totalLengthBezier)
        .attr("stroke-dashoffset", totalLengthBezier)
        .transition()
        .duration(3000)
            .attr("stroke-dashoffset", 0);
}

function hideBezierPath(){
    lineBezier
        .attr("fill", "none")
        .transition()
        .duration(3000)
            .attr("stroke-dasharray", totalLengthBezier + " " + totalLengthBezier)
            .attr("stroke-dashoffset", totalLengthBezier)
    
}

