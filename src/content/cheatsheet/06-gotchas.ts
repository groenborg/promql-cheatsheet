import type { Gotcha } from '../types';

export const section = {
  id: 'gotchas',
  number: '06',
  title: 'Performance & gotchas',
  subtitle: `Things that bite once you're past beginner`,
};

export const gotchas: Gotcha[] = [
  {
    title: '<code>rate()</code> goes <em>inside</em> <code>sum()</code>',
    keys: 'rate sum order',
    description: 'Always: <code>sum(rate(...))</code>, never <code>rate(sum(...))</code>. Counters reset per series; aggregating first hides the resets and produces nonsense.',
  },
  {
    title: 'Range window ≥ 4× scrape interval',
    keys: 'rate window scrape interval',
    description: '<code>rate</code>/<code>increase</code> need at least 2 samples. With a 30s scrape, <code>[1m]</code> is fragile. <code>[2m]</code> is the safe minimum, <code>[5m]</code> is conventional.',
  },
  {
    title: '<code>increase()</code> can return non-integers',
    keys: 'extrapolation increase',
    description: `Prometheus extrapolates to the window edges. <code>increase(x[1h])</code> may report 4.32 even though counters are integers. Don't be alarmed.`,
  },
  {
    title: 'Match the function to the metric type',
    keys: 'gauge delta counter',
    description: '<code>rate / irate / increase / resets</code> → counters. <code>delta / deriv / predict_linear</code> → gauges. Mixing them silently produces wrong numbers.',
  },
  {
    title: 'Keep <code>le</code> when summing histograms',
    keys: 'histogram quantile le label',
    description: '<code>histogram_quantile</code> needs the <code>le</code> label. <code>sum by (le, …)(rate(..._bucket[5m]))</code> — never drop it.',
  },
  {
    title: 'Watch label cardinality',
    keys: 'cardinality high',
    description: 'User IDs, request paths, and trace IDs as labels will burn your TSDB. Aggregate them away early in queries; never expose them on hot metrics.',
  },
  {
    title: 'Subqueries are expensive',
    keys: 'subquery cost',
    description: '<code>[1h:1m]</code> means 60 inner evaluations per output point. If you reach for one in a dashboard panel, it probably wants to be a recording rule.',
  },
  {
    title: 'Binary ops need matching label sets',
    keys: 'vector matching labels',
    description: 'If <code>a / b</code> drops to empty, the two sides have different labels. Use <code>on(...)</code> to whitelist matching labels, <code>ignoring(...)</code> to drop the noisy ones, and <code>group_left</code>/<code>group_right</code> for many-to-one.',
  },
];
