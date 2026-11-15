/** Normalise Nigerian numbers to E.164 (+234XXXXXXXXXX). Returns null if invalid. */
export function normalizeNgPhone(input: string): string | null {
  const digits = input.replace(/[\s\-()]/g, "");
  let national: string;
  if (/^\+234\d{10}$/.test(digits)) national = digits.slice(4);
  else if (/^234\d{10}$/.test(digits)) national = digits.slice(3);
  else if (/^0\d{10}$/.test(digits)) national = digits.slice(1);
  else return null;
  if (!/^[789]\d{9}$/.test(national)) return null;
  return `+234${national}`;
}

export function maskPhone(e164: string): string {
  return e164.length < 8 ? "***" : `${e164.slice(0, 7)}***${e164.slice(-2)}`;
}
