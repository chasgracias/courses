document.addEventListener('DOMContentLoaded', function () {
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

  req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.send();
  req.onload = function () {
    const json = JSON.parse(req.responseText);

    const baseTemperature = json.baseTemperature;
    const dataset = json.monthlyVariance;

    let date;
    const timeData = [];

    for (var i = 0; i < dataset.length; ++i) {
      date = new Date(dataset[i].year, dataset[i].month - 1);
      timeData.push(date);
    }

    const fullwidth = 1000,fullheight = 600,padding = 65;

    const width = fullwidth - 2 * padding;
    const height = fullheight - 2 * padding;

    const maxX = d3.max(timeData, d => d);
    const minX = d3.min(timeData, d => d);

    document.getElementById("description").innerHTML = minX.getFullYear() + "-" + maxX.getFullYear() + " : Base Temperature = " + baseTemperature + "  &degC";

    const maxY = new Date(1970, 0, 0);
    const minY = new Date(1970, 11, 31);

    const xScale = d3.scaleTime().
    domain([minX, maxX]).
    rangeRound([padding, width]);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const monthsBackwards = months.slice();
    monthsBackwards.reverse();

    const yScale = d3.scaleBand().
    domain(monthsBackwards).
    rangeRound([height, padding]);

    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(xScale);

    const toolTips = d3.select("body").append("div").
    attr("class", "tooltip").
    attr("id", "tooltip").
    style("background", "Beige").
    style("color", "Black").
    style("opacity", 0);

    const svg = d3.select("#graph").
    append("svg").
    attr("width", fullwidth).
    attr("height", fullheight);

    svg.append("g").
    attr("transform", "translate(" + padding + ",0)").
    attr("id", "y-axis").
    call(yAxis.tickPadding(10));

    svg.append("g").
    attr("class", "xaxis").
    attr("id", "x-axis").
    attr("transform", "translate(0," + height + ")").
    call(xAxis.tickFormat(d3.utcFormat('%Y')).tickPadding(10));

    const Month = height / 12;
    const oneYear = (width - 200) / (maxX.getFullYear() - minX.getFullYear());

    const minVariance = baseTemperature + d3.min(dataset, d => d.variance);
    const maxVariance = baseTemperature + d3.max(dataset, d => d.variance);
    const stepVariance = (Math.abs(maxVariance) - Math.abs(minVariance)) / 10;

    const colorPallete = ["midnightblue", "indigo", "darkslateblue", "blue", "green", "greenyellow", "yellow", "orange", "red", "maroon"];
    const colorSteps = [
    minVariance,
    minVariance + 1 * stepVariance,
    minVariance + 2 * stepVariance,
    minVariance + 3 * stepVariance,
    minVariance + 4 * stepVariance,
    minVariance + 5 * stepVariance,
    minVariance + 6 * stepVariance,
    minVariance + 7 * stepVariance,
    minVariance + 8 * stepVariance,
    minVariance + 9 * stepVariance,
    maxVariance];


    const colorScale = d3.scaleLinear().
    domain(colorSteps).
    range(colorPallete);

    svg.append("g").
    selectAll("rect").
    data(dataset).
    enter().append("rect").
    attr("x", (d, i) => xScale(new Date(timeData[i].getFullYear(), 0))).
    attr("y", (d, i) => yScale(months[timeData[i].getMonth()])).
    attr("width", (d, i) => oneYear).
    attr("height", (d, i) => yScale.bandwidth()).
    attr("class", "cell").
    attr("data-year", (d, i) => timeData[i].getFullYear()).
    attr("data-month", (d, i) => timeData[i].getMonth()).
    attr("data-temp", (d, i) => baseTemperature + d.variance).
    style("fill", (d, i) => colorScale(baseTemperature + d.variance)).
    on("mouseover", function (d, i) {
      d3.select(this).attr("stroke", "black").
      attr("stroke-width", 0.5);

      toolTips.attr("data-year", timeData[i].getFullYear()).
      html(timeData[i].getFullYear() + " - " + timeData[i].getMonth() + "<br/>" + (baseTemperature + d.variance) + " &degC<br/>" + d.variance + " &degC").
      style("left", d3.event.pageX + 15 + "px").
      style("top", d3.event.pageY - 50 + "px").
      style("opacity", .9).
      style("background", colorScale(baseTemperature + d.variance));
    }).
    on("mouseout", function (d) {
      d3.select(this).attr("stroke", "none");
      toolTips.style("opacity", 0);
    }).
    style("opacity", .8);

    const legend = svg.selectAll(".legend").
    data(dataset).
    enter().append("g").
    attr("class", "legend").
    attr("id", "legend");

    const legendSize = 25;
    for (var i = 0; i < colorPallete.length; ++i) {
      legend.append("rect").
      attr("stroke", "black").
      attr("stroke-width", 1.5).
      attr("x", 0.1 * fullwidth + i * (legendSize * 2 + 1)).
      attr("y", fullheight - padding).
      attr("width", legendSize * 2).
      attr("height", legendSize).
      attr("fill", colorPallete[i]);
    }

    for (var j = 0; j < colorSteps.length; ++j) {
      legend.append("text").
      attr("x", 0.1 * fullwidth + j * (legendSize * 2 + 1)).
      attr("y", fullheight - padding - legendSize * 0.5).
      text(Math.round(colorSteps[j] * 100) / 100);
    }
  };
});