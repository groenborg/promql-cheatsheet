import { section as types } from "./01-types";
import { section as selectors } from "./02-selectors";
import { section as time } from "./03-time";
import { section as aggregation } from "./04-aggregation";
import { section as functions } from "./05-functions";
import { section as gotchas, gotchas as gotchaCards } from "./06-gotchas";

export const cardSections = [types, selectors, time, aggregation, functions];
export const gotchaSection = gotchas;
export { gotchaCards };

export const tocEntries = [
	{ number: "01", id: "types", label: "Data types" },
	{ number: "02", id: "selectors", label: "Selectors & matchers" },
	{ number: "03", id: "time", label: "Time & durations" },
	{ number: "04", id: "aggregation", label: "Aggregation" },
	{ number: "05", id: "functions", label: "Functions" },
	{ number: "06", id: "gotchas", label: "Gotchas" },
];
