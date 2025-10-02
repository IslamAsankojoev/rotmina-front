export enum Code {
  HE = 'he',
  EN = 'en',
}

export enum Currency {
  GBP = 'GBP',
  CHF = 'CHF',
  EUR = 'EUR',
  USD = 'USD',
  AUD = 'AUD',
  CAD = 'CAD',
  ILS = 'ILS',
}

export type ExchangeRate = {
  currency: Currency,
  rate: number
}