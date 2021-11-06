export default function getPercentage(c, t) {
  const count = parseInt(c),
    total = parseInt(t);
  return parseInt((count / total) * 100);
}
