const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Nairobi"
});

export function articleDateTime(value: string) {
  return `${dateTimeFormatter.format(new Date(value))} EAT`;
}

export function hasMeaningfulUpdate(publishedAt: string, updatedAt: string) {
  return new Date(updatedAt).getTime() > new Date(publishedAt).getTime() + 60_000;
}
