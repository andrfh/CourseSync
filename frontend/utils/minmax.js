export default function getMinMaxValue(arr=[]) {
  if (!arr.length) return null;

  let min = Infinity;
  let max = -Infinity
  for (const item of arr) {
    const val = parseFloat(item.value.replace(',', '.'));
    if (Number.isNaN(val)) continue;
    if (val < min) min = val;
    if (val > max) max = val;
  }
  return { min, max };
}