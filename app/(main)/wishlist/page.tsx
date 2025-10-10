import { Typography } from '@/src/shared'

export default function WishlistPage() {
  return (
    <div className="container py-20">
      <div className="text-center">
        <Typography variant="text_title" className="mb-8">
          Wishlist
        </Typography>
        <Typography variant="text_main" className="text-gray-600">
          Ваш список желаний пуст. Добавьте товары, которые вам нравятся!
        </Typography>
      </div>
    </div>
  )
}
