import { arc as d3Arc } from "d3-shape";
import { select as d3Select } from "d3-selection";
import { interpolate as d3Interpolate } from "d3-interpolate";
import "d3-transition";
import classNames from "./class-names.module.css";

const svgLength = 200;
document.documentElement.style.setProperty("--svg-length", svgLength + "px");
const svgHalfLength = svgLength / 2;
const tau = 2 * Math.PI;
let transitionDuration = 750;

export const setTransitionDuration = duration => {
  transitionDuration = duration;
};

export const arc = d3Arc()
  .innerRadius(svgHalfLength - 20)
  .outerRadius(svgHalfLength - 40)
  .startAngle(0);

export const calculateEndAngle = percentage => (percentage / 100) * tau;

const previousEndAngles = new WeakMap();

const arcTween = (SVGElement, arc) => d => {
  const previousEndAngle = previousEndAngles.get(SVGElement) || 0;
  const nextEndAngle = d.endAngle;
  const interpolate = d3Interpolate(previousEndAngle, nextEndAngle);
  d.endAngle = previousEndAngle;

  return t => {
    const endAngle = interpolate(t);
    d.endAngle = endAngle;
    previousEndAngles.set(SVGElement, endAngle);
    return arc(d);
  };
};

export const drawProgressBar = (SVGElement, percentage) => {
  const svg = d3Select(SVGElement);

  const endAngle = calculateEndAngle(percentage);

  const updateSelection = svg.selectAll("g").data([{ endAngle }]);

  const enterSelection = updateSelection.enter();

  const g = enterSelection
    .append("g")
    .attr("transform", `translate(${svgHalfLength},${svgHalfLength})`);

  g.append("path")
    .datum({ endAngle: tau })
    .attr("class", classNames.backgroundProgressBar)
    .attr("d", arc);

  g.append("path")
    .datum({ endAngle: 0 })
    .attr("class", classNames.progressBar)
    .attr("d", arc);

  enterSelection
    .merge(updateSelection)
    .select("." + classNames.progressBar)
    .transition()
    .duration(transitionDuration)
    .attrTween("d", arcTween(SVGElement, arc));
};

export const makePercentage = value => {
  const parsedValue = parseInt(value, 10) || 0;
  if (parsedValue > 100) return 100;
  return parsedValue < 0 ? 0 : parsedValue;
};
