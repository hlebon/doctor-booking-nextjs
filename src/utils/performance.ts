export const reportWebVitals = (metric: { label: string; value: number }) => {
  if (metric.label === 'web-vital') {
    console.log(metric);
  }
};
