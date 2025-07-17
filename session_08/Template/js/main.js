
// Load CSV file
d3.csv("data/wealth-health-2014.csv", d => {

	d.Income = +d.Income
	d.LifeExpectancy = +d.LifeExpectancy
	d.Population = +d.Population

	return d;
}).then( data => {

	// Analyze the dataset in the web console
	console.log(data);
	console.log("Countries: " + data.length)

	drawChart(data)

});

function drawChart(data){

	console.log('in drawChart')

	// Margin object with properties for the four directions
	let margin = {top: 20, right: 10, bottom: 20, left: 50};

// Width and height as the inner dimensions of the chart area
	let width = 700 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

// Define 'svg' as a child-element (g) from the drawing area and include spaces
	let svg = d3.select("#chart-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	let incomeScale = d3.scaleLog()
		.domain(d3.extent(data, d => d.Income))
		.range([0, width])

	let lifeScale = d3.scaleLinear()
		.domain([d3.min(data, d => d.LifeExpectancy), d3.max(data, d => d.LifeExpectancy)])
		.range([height, 0])

	let poplationScale = d3.scaleLinear()
		.domain(d3.extent(data, d => d.Population))
		.range([5, width/25])

	let colorScale = d3.scaleOrdinal()
		.domain(data.map(d => d.Region))
		.range(d3.schemeCategory10)


	let xAxis = d3.axisBottom()
		.scale(incomeScale);

	let yAxis = d3.axisLeft()
		.scale(lifeScale);

	// Draw the axis
	svg.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "axis y-axis")
		.call(yAxis)


	let circles = svg.selectAll("circle").data(data)

	circles.enter()
		.append("circle")
		.attr("class", "country-circle")
		.attr("r", d => poplationScale(d.Population))
		.attr("cx", d => incomeScale(d.Income))
		.attr("cy", d => lifeScale(d.LifeExpectancy))
		.attr("fill", d => colorScale(d.Region))
		.style("opacity", 0.7)
		.style("stroke", "black")
}
