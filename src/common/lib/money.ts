/**
 * Money crosses the wire as a string of minor units (matches the backend's
 * BigInt columns — JSON has no 64-bit integer type, so BigInt gets
 * serialized as a decimal string). Never coerce these to `number`;
 * float64 silently loses precision above 2^53.
 */

export type MinorUnits = string; // e.g. "150000" = 1,500.00 in a 2-decimal currency

const DECIMALS: Record<string, number> = { USD: 2, EUR: 2, JPY: 0, KRW: 0 };

export function formatMoney(amount: MinorUnits, currency: string): string {
  const decimals = DECIMALS[currency] ?? 2;
  const value = BigInt(amount);
  const negative = value < 0n;
  const abs = negative ? -value : value;
  const divisor = 10n ** BigInt(decimals);
  const whole = abs / divisor;
  const fraction = abs % divisor;

  const formattedWhole = new Intl.NumberFormat('en-US').format(whole);
  const fractionStr = decimals > 0 ? '.' + fraction.toString().padStart(decimals, '0') : '';

  return `${negative ? '-' : ''}${formattedWhole}${fractionStr} ${currency}`;
}

export function addMoney(a: MinorUnits, b: MinorUnits): MinorUnits {
  return (BigInt(a) + BigInt(b)).toString();
}

export function subtractMoney(a: MinorUnits, b: MinorUnits): MinorUnits {
  return (BigInt(a) - BigInt(b)).toString();
}

export function isPositive(a: MinorUnits): boolean {
  return BigInt(a) > 0n;
}

export function compareMoney(a: MinorUnits, b: MinorUnits): -1 | 0 | 1 {
  const diff = BigInt(a) - BigInt(b);
  return diff === 0n ? 0 : diff > 0n ? 1 : -1;
}