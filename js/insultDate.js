const insultDate = (svg_name, data) => {
	data.shift()
	let chart = d3.select(svg_name);
	let chart_width = $(svg_name).width();
	let chart_height = $(svg_name).height();
	let margin = {left:50,bottom:40,right:115,top:10};
	data.forEach((d) => d.date = new Date(d.date));
	let y = d3.scaleLinear()
							.domain([0,d3.max(data,(d) => { return d.count; })]).nice()
							.range([chart_height - margin.bottom, margin.top])
	let x = d3.scaleTime()
							.domain(d3.extent(data, (d) => {return d.date;}))
							.range([margin.left,chart_width - margin.right])

	addLineDates(chart,data,x,y);
	addXAxisDates(chart,x,chart_height,margin);
	addYAxisDates(chart,y,chart_height,margin);
	addFocus(chart,x,y,margin,chart_height,chart_width,data)
}

const addLineDates = (chart, data, x, y) => {
	let valueLine = d3.area()
											.x((d) => { return x(d.date); })
											.y((d) => { return y(d.count); })
	chart.append("path")
					.datum(data)
					.attr("class","line")
					.style("stroke","steelblue")
					.attr("d",valueLine)
}

const addXAxisDates = (chart, x, height, margin) => {
  let x_axis = d3.axisBottom(x).tickFormat(d3.timeFormat("%m-%y")).ticks(d3.timeMonth.every(4));
	chart.append("g")
				.attr("class","x axis")
				.attr("transform",`translate(0,${height - margin.bottom})`)
				.call(x_axis)
}

const addYAxisDates = (chart, y, height, margin) => {
	let y_axis = d3.axisLeft(y)
	chart.append("g")
		.attr("class","y axis")
		.attr("transform",`translate(${margin.left - 4},0)`)
		.call(y_axis);
	chart.append("text")
				.attr("transform","rotate(-90)")
				.attr("y",15)
				.attr("x",-(height/2))
				.style("fill","black")
				.style("text-anchor","middle")
				.style("font-weight","bold")
				.text("Number of Tweets / Month")
}

const addFocus = (chart, x, y, margin, height, width, data) => {

	let bisectDate = d3.bisector(function(d) { return d.date; }).left

	const mousemove = () => {
		var x0 = x.invert(d3.pointer(event,this)[0] - 25),
				i = bisectDate(data, x0, 1),
				d0 = data[i - 1],
				d1 = data[i],
				d = x0 - d0.date > d1.date - x0 ? d1 : d0;
		focus.attr("transform", `translate(${x(d.date)},${y(d.count)})`);
		focus.select(".tooltip-date").text(` ${d.date.getMonth() + 1}-${d.date.getFullYear()}`);
		focus.select(".tooltip-insults").text(d.count);
	}

	let focus = chart.append("g")
										.style("display","none");

	focus.append("circle")
				.attr("class", "y")
				.style("fill", "green")
				.style("stroke", "green")
				.attr("r", 4);
	
	focus.append("rect")
				.attr("class", "tooltipDate")
				.attr("width", 100)
				.attr("height", 50)
				.attr("x", 10)
				.attr("y", -20)
				.attr("rx", 4)
				.attr("ry", 4);

	focus.append("text")
			.attr("class", "tooltip-date")
			.attr("x", 18)
			.attr("y", -2);

	focus.append("text")
			.attr("x", 18)
			.attr("y", 18)
			.text("Insults: ");

	focus.append("text")
			.attr("class", "tooltip-insults")
			.attr("x", 70)
			.attr("y", 18);
	
	chart.append("rect")
			.attr("width", width)
			.attr("height", height)
			.style("fill", "none")
			.style("pointer-events", "all")
			.on("mouseover", function() { focus.style("display", null); })
			.on("mouseout", function() { focus.style("display", "none"); })
			.on("mousemove", mousemove);

}

const addToolTipDate = () => {
	return d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
}