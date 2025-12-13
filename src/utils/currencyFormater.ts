export function currencyFormater(
  value: number | string | null | undefined,
  withPrefix: boolean = true,
): string {
  if (value === null || value === undefined || value === '') {
    return withPrefix ? 'Rp 0,00' : '0,00';
  }

  const number = Number(value);

  if (isNaN(number)) {
    return withPrefix ? 'Rp 0,00' : '0,00';
  }

  return (
    (withPrefix ? 'Rp ' : '') +
    number.toLocaleString('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
