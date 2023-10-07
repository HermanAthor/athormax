export function movieDurationfunction(runtime) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
}
