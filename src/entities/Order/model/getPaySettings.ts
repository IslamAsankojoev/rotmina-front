import { Currency } from '@/src/shared'

interface PaySettings {
  txn_currency_code: Currency
  card_number: string
  expire_month: number
  expire_year: number
  card_holder_id: string
  cvv: string
  client: {
    email: string
    address_line_1: string
    address_line_2: string
  }
  items:{
    code: string
    name: string
    unit_price: number
    type: 'I'
    units_number: number
    unit_type: number
    price_type: 'G'
    currency_code: Currency
    to_txn_currency_exchange_rate: 1
  }[],
  auth_3ds_redirect: {
    url: string
    params: {
      key: string
      value: string
    }[]
  }
}

export const getPaySettings = ({
  txn_currency_code,
  card_number,
  expire_month,
  expire_year,
  card_holder_id,
  cvv,
  client,
  items,
  auth_3ds_redirect,
}: PaySettings) => {
  return {
    terminal_name: 'rotmina',
    txn_currency_code: txn_currency_code,
    txn_type: 'debit',
    card_number: card_number,
    expire_month: expire_month,
    expire_year: expire_year,
    card_holder_id: card_holder_id,
    cvv: cvv,
    payment_plan: 1,
    activate_3ds: 'Y',
    force_txn_on_3ds_fail: 'N',
    client: client,
    items: items,
    response_language: 'english',
    user_defined_fields: [
      {
        name: 'company',
        value: 'rotmina',
      },
    ],
    '3ds_settings': {
      force_challenge: 1,
      browser: {
        java_enabled: 0,
        language: 'en-gb',
        color_depth: 24,
        screen_height: 934,
        screen_width: 1255,
        time_zone: 5,
        window_size: '04',
      },
    },
    auth_3ds_redirect: auth_3ds_redirect,
  }
}
