function capitalizeFirstChar(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function capitalize(s: string) {
  const chunks = s.split(/\s+/);
  return chunks.map(capitalizeFirstChar).join(' ');
}
