document.addEventListener("DOMContentLoaded", function () {
  var url =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
  req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.send();
  req.onload = function () {
    var dataset = JSON.parse(req.responseText); //Read file data

    var timeData = [];
    var yearData = [];
    var date;
    for (var i = 0; i < dataset.length; ++i) {
      date = new Date(null);
      date.setMinutes(dataset[i].Seconds / 60); // Value for Minutes here
      date.setSeconds(dataset[i].Seconds % 60); // Value for SECONDS here
      timeData.push(date); //Store time here
      yearData.push(new Date(dataset[i].Year, 1));
      //console.log(dataset[i].Seconds + " - " + dataset[i].Time + " : " + date.toISOString());	//Test output for cor
    }

    const fullwidth = 800;
    const fullheight = 600;
    const padding = 50;

    const width = fullwidth - 2 * padding;
    const height = fullheight - 2 * padding;

    //Get the range we want to display on X axis
    var maxX = d3.max(yearData, d => d);
    var minX = d3.min(yearData, d => d);
    //console.log("MaxYear: " + maxX + " MinYear: " + minX);	//Test X range

    //Get the range we want to display on Y axis
    var maxY = d3.max(timeData, d => d);
    var minY = d3.min(timeData, d => d);
    //console.log("MaxTime: " + maxY.toISOString() + " MinTime: " + minY.toISOString());	//Test Y range

    //Define the X Scale
    var xScale = d3
      .scaleUtc()
      .domain([minX, maxX])
      .rangeRound([padding, width])
      .nice();

    //Define the Y Scale
    var yScale = d3
      .scaleUtc()
      .domain([maxY, minY]) //We reverse the Y range because less is better in racing
      .rangeRound([height, padding])
      .nice();

    // Define the y and x axis
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    //Create toolTips DIV
    var toolTips = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .style("background", "Beige")
      .style("color", "Black")
      .style("opacity", 0); //Hide until mouseover

    //Create SVG
    var svg = d3
      .select("#graph")
      .append("svg")
      .attr("width", fullwidth)
      .attr("height", fullheight);

    // Draw y axis
    svg
      .append("g")
      .attr("transform", "translate(" + padding + ",0)")
      .attr("id", "y-axis")
      .call(
        yAxis
          .tickFormat(d3.utcFormat("%M:%S")) //Specify showing of time as Minute:Seconds
          .tickPadding(10),
      );

    // Draw x axis
    svg
      .append("g")
      .attr("class", "xaxis")
      .attr("id", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    //Draw data points
    svg
      .append("g")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(yearData[i]))
      .attr("cy", (d, i) => yScale(timeData[i]))
      .attr("r", 5)
      .attr("class", "dot")
      .attr("data-xvalue", (d, i) => yearData[i])
      .attr("data-yvalue", (d, i) => timeData[i])
      .style("fill", function (d) {
        if (d.Doping == "") {
          //Change fill color based on whether doping occurred or not
          return "steelblue";
        } else {
          return "red";
        }
      })
      //Tooltip DIV control
      .on("mouseover", function (d, i) {
        toolTips
          .attr("data-year", yearData[i])
          .html(
            d.Name +
              " : " +
              d.Nationality +
              "<br/>Year: " +
              d.Year +
              " Time: " +
              d.Time +
              "<br/>" +
              d.Doping,
          )
          .style("left", d3.event.pageX + 15 + "px")
          .style("top", d3.event.pageY - 50 + "px")
          .style("opacity", 0.9);
      })
      .on("mouseout", function (d) {
        toolTips.style("opacity", 0);
      })
      .style("opacity", 0.8);

    var legend = svg
      .selectAll(".legend")
      .data(dataset)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("id", "legend");

    //Add circles to legend
    legend
      .append("circle")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("cx", 0.1 * fullwidth)
      .attr("cy", fullheight - padding)
      .attr("r", 5)
      .attr("fill", "steelblue");

    legend
      .append("circle")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("cx", 0.3 * fullwidth)
      .attr("cy", fullheight - padding)
      .attr("r", 5)
      .attr("fill", "red");

    //Add text to legend
    legend
      .append("text")
      .attr("x", 0.1 * fullwidth + 10)
      .attr("y", fullheight - padding + 5)
      .text("No Doping Allegations");

    legend
      .append("text")
      .attr("x", 0.3 * fullwidth + 10)
      .attr("y", fullheight - padding + 5)
      .text("Riders With Doping Allegations");
  };
});
