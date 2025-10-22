export const apiMap = {
  // Auth
  postLogin: 'auth/local',
  postSignup: 'auth/local/register',
  deleteLogout: 'auth/local',
  postResetPassword: 'auth/forgot-password',
  postNewPassword: 'auth/reset-password',

  // User
  getMe: 'users/me',
  getMeWithAllPopulates:
    'users/me?populate[orders][populate][order_items][populate][variant][populate][images]=*&populate[orders][populate][order_items][populate][variant][populate][color]=*&populate[orders][populate][order_items][populate][variant][populate][size]=*&populate[orders][populate][order_items][populate][variant][populate][product][populate][gallery]=*&populate[orders][populate][shipping_address]=*&populate[orders][populate][billing_address]=*&populate[addresses]=*&status=published',

  // Product
  getProducts: 'products',
  getProduct: 'products/:id',
  postProduct: 'products',
  putProduct: 'products/:id',
  deleteProduct: 'products/:id',

  // Personal Stylist
  getPersonalStylists: 'personal-stylists',
  getPersonalStylist: 'personal-stylists/:id',
  postPersonalStylist: 'personal-stylists',
  putPersonalStylist: 'personal-stylists/:id',
  deletePersonalStylist: 'personal-stylists/:id',

  // Category
  getCategories: 'categories',
  getCategory: 'categories/:id',

  // Collection
  getCollections: 'collections',
  getCollection: 'collections/:id',

  // Gift Card
  getGiftCards: 'gift-cards',
  getGiftCardByCode: 'gift-cards/code/:id',
}
