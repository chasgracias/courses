document.addEventListener('DOMContentLoaded', function () {
  var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.send();
  req.onload = function () {
    json = JSON.parse(req.responseText);
    const dataset = json.data;

    const yearData = [];
    for (let i = 0; i < dataset.length; ++i) {
      yearData.push(new Date(dataset[i][0]));
    }

    const fullwidth = 800;
    const fullheight = 600;
    const padding = 50;

    const width = fullwidth - 2 * padding;
    const height = fullheight - 2 * padding;

    const maxDate = d3.max(yearData, d => d);
    const minDate = d3.min(yearData, d => d);
    const maxDateMore = new Date(maxDate);
    const minDateLess = new Date(minDate);

    const maxValue = d3.max(dataset, d => d[1]);
    const roundedUpMax = Math.ceil(maxValue / 1000) * 1000;

    const barPadding = 5;
    const barWidth = (width - padding) / (dataset.length + 2);

    const yScale = d3.scaleLinear().
    domain([0, roundedUpMax]).
    range([height, 0]);

    const xScale = d3.scaleTime().
    domain([minDateLess, maxDateMore]).
    range([padding, width]);

    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(xScale);

    const svg = d3.select("#graph").
    append("svg").
    attr("width", fullwidth).
    attr("height", fullheight);

    svg.append("g").
    attr("transform", "translate(" + padding + ",0)").
    attr("id", "y-axis").
    call(yAxis);
    svg.append("g").
    attr("class", "xaxis").
    attr("id", "x-axis").
    attr("transform", "translate(0," + height + ")").
    call(xAxis);

    const tooltip = svg.append("text").
    attr("id", "tooltip").
    attr("x", 0.5 * width - 100).
    attr("y", height * 0.5).
    attr("opacity", 0.9).
    attr("background", "yellow").
    attr("stroke", "black");

    svg.selectAll("rect").
    data(dataset).
    enter().
    append("rect").
    attr("class", "bar").
    attr("x", (d, i) => xScale(yearData[i])).
    attr("y", (d, i) => height - yScale(roundedUpMax - d[1])).
    attr("width", (d, i) => barWidth).
    attr("height", function (d, i) {
      if (yScale(roundedUpMax - d[1]) <= 0) return 1;else
      return yScale(roundedUpMax - d[1]);
    }).attr('data-date', (d, i) => d[0]).
    attr('data-gdp', (d, i) => d[1]).
    attr("fill", "LightBlue").
    on('mouseover', function (d, i) {
      tooltip.text(d[0] + ": $" + d[1] + " Billions of Dollars").
      attr('data-date', d[0]).
      attr('opacity', 0.9);
    }).on('mouseout', function (d) {
      tooltip.attr('opacity', 0);
    }).append("title").
    text((d, i) => d[0] + ": $" + d[1] + " Billions of Dollars").
    attr("data-date", (d, i) => d[0]);
  };
});