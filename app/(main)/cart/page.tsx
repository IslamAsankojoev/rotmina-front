import { Typography } from '@/src/shared'

export default function CartPage() {
  return (
    <div className="container py-20">
      <div className="text-center">
        <Typography variant="text_title" className="mb-8">
          Корзина
        </Typography>
        <Typography variant="text_main" className="text-gray-600">
          Ваша корзина пуста. Добавьте товары для оформления заказа!
        </Typography>
      </div>
    </div>
  )
}
