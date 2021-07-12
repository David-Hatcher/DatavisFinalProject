const insultTarget = (svg_name,data) => {
	let chart = d3.select(svg_name);
	let chart_width = $(svg_name).width();
	let chart_height = $(svg_name).height();
	let margin = {left:50,bottom:120,right:15,top:10};
	let y = d3.scaleLinear()
						.domain([0,d3.max(data, (d) => {return d.count;})]).nice()
						.range([chart_height - margin.bottom, margin.top]);
	let x = d3.scaleBand()
						.domain(data.map((d) => {return formatName(d.target);}))
						.range([margin.left,chart_width - margin.right])
						.padding(0.1);
	let tooltip = addToolTip();
	addBars(chart,data,x,y,tooltip);
	addYAxis(chart,y,margin,chart_height);
	addXAxis(chart,x,margin,chart_height);
}

const addBars = (chart,data,x,y,tooltip) => {
	chart.selectAll("g").transition(1000).style("opacity",0).remove();
	chart.selectAll("text").transition(1000).style("opacity",0).remove();
	let chartLoc = chart.append("g").selectAll("rect")
											.data(data)
	let bars = chartLoc.enter()
					.append("rect")
						.attr("x",(d,i) => x(formatName(d.target)))
						.attr("y",(d) => y(d.count))
						.attr("width", x.bandwidth())
						.attr("height", (d) => y(0) - y(d.count))
						.attr("opacity",1).attr("fill","steelblue")
						.on("mouseover", function(event,d) {
							tooltip.transition()
								.duration(200)
								.style("opacity", .9);
							tooltip.html(`${formatName(d.target)} <br> Count:${d.count}`)
								.style("left", (event.pageX) + "px")
								.style("top", (event.pageY - 28) + "px");
							})
						.on("mouseout", function(d) {
							tooltip.transition()
								.duration(500)
								.style("opacity", 0);
							});
	bars.merge(chartLoc)
			.on("mouseover", function(event,d) {
				tooltip.transition()
					.duration(200)
					.style("opacity", .9);
				tooltip.html(`${formatName(d.target)} <br> Count:${d.count}`)
					.style("left", (event.pageX) + "px")
					.style("top", (event.pageY - 28) + "px");
				})
			.attr("opacity",0)
			.transition().duration(1000)
			.attr("x",(d,i) => x(formatName(d.target)))
			.attr("y",(d) => y(d.count))
			.attr("width", x.bandwidth())
			.attr("height", (d) => y(0) - y(d.count))
			.attr("opacity",1)

			chartLoc.exit().transition().duration(1000)
							.attr("opacity",0)
							.remove();
}

const formatName = (target) => {
	let newTargetArr = target.split('-');
	let newTarString = "";
	for(word of newTargetArr){
		newTarString += word.charAt(0).toUpperCase() + word.slice(1) + " ";
	}
	return newTarString;
}

const addYAxis = (chart, y, margin, height) => {
	let y_axis = d3.axisLeft(y);
	chart.append("g")
		.classed("y axis", true)
		.transition().duration(1000)
		.attr("transform", `translate(${margin.left - 4},0)`)
		.call(y_axis)

	chart
		.append("text")
		.transition().duration(1000)
		.attr("transform", "rotate(-90)")
		.attr("y",15)
		.attr("x", 0 - (height / 2))
		.style("fill","black")
		.style("text-anchor", "middle")
		.style("font-weight","bold")
		.text("Number of Tweets");
}

const addXAxis = (chart, x, margin, height) => {
	let x_axis = d3.axisBottom(x);
	chart.append("g")
		.transition().duration(1000)
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(x_axis)
		.selectAll("text")
		.transition().duration(1000)
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
		.style("text","bold")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");
}

const addToolTip = () => {
	return d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
}