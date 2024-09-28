export function formatPrice(price: number) {
  const formattedPrice = price
    ? price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      signDisplay: 'never',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    : "0,00";

  return formattedPrice;
}

