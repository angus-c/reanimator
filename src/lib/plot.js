import d3 from 'd3';

export const add = (selector, fn) => {
  const lineFunction =
    d3.svg.line()
      .x(i => i)
      .y(i => fn(i))
      .interpolate('linear');

  const svgContainer =
    d3.select(selector).append('svg');

  svgContainer.append('path')
    .attr('d', lineFunction([...new Array(1000)].map((_, i) => i)))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
}

export const update = (selector, fn) => {
  const lineFunction =
    d3.svg.line()
      .x(i => i)
      .y(i => fn(i))
      .interpolate('linear');

  const svgContainer = d3.select(selector).transition();

  svgContainer.select('path')
    .attr('d', lineFunction([...new Array(1000)].map((_, i) => i)))
}
