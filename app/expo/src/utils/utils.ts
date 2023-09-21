export function amountFormatter(amount: number) {
  return new Intl.NumberFormat().format(amount);
}
