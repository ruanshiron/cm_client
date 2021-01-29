export function formatDate(raw: Date | string | number) {
  const date = new Date(raw);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}
