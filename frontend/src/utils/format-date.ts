function parseEventDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(value: string): string {
  return parseEventDate(value).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getEventDateValue(value: string): number {
  return parseEventDate(value).getTime();
}
