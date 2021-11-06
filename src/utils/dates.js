const CURRENT_YEAR = 2021;

export function normalizeDate(input) {
  const [d, y] = input.split(",");
  const year = y.trim();
  const [, month] = d.split(" ");

  if (year === CURRENT_YEAR) return d;
  else return `${month} ${year}`;
}
