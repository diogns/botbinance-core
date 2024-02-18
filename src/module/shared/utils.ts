export function isNumeric(value: string): boolean {
  return /^-?\d+$/.test(value);
}

export function validateNonNullNonEmptyString(obj: any): boolean {
  return obj && typeof obj === 'string' && obj.trim() !== '';
}
