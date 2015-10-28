import d3 from 'd3';

//  TODO: replace hard coded dimensions with derived values
//  TODO: feint border
const DATA_POINTS = 200;

export const add = (selector, fn) => {
  const lineFunction =
    d3.svg.line()
      .x(i => i)
      .y(i => DATA_POINTS * fn(i / DATA_POINTS))
      .interpolate('linear');

  const svgContainer =
    d3.select(selector)
      .append('svg')
      .attr('width', '200px')

  svgContainer.append('path')
    .attr('d', lineFunction([...new Array(DATA_POINTS)].map((_, i) => i)))
    .attr('stroke', 'blue')
    .attr('stroke-width', 4)
    .attr('fill', 'none');
}

export const update = (selector, fn) => {
  const lineFunction =
    d3.svg.line()
      .x(i => i)
      .y(i => DATA_POINTS * fn(i / DATA_POINTS))
      .interpolate('linear');

  const svgContainer = d3.select(selector).transition();

  svgContainer.select('path')
    .attr('d', lineFunction([...new Array(DATA_POINTS)].map((_, i) => i)))
}
