export const apiMap = {
  // Auth
  postLogin: 'auth/local',
  postRegister: 'auth/local/register',
  deleteLogout: 'auth/local',
  getMe: 'users/me',
  getMeWithAllPopulates:
    'users/me?populate[orders][populate][order_items][populate][variant][populate][images]=*&populate[orders][populate][order_items][populate][variant][populate][color]=*&populate[orders][populate][order_items][populate][variant][populate][size]=*&populate[orders][populate][order_items][populate][variant][populate][product][populate][gallery]=*&populate[orders][populate][shipping_address]=*&populate[orders][populate][billing_address]=*&populate[addresses]=*&status=published',

  // Product
  getProducts: 'products',
  getProduct: 'products/:id',
  postProduct: 'products',
  putProduct: 'products/:id',
  deleteProduct: 'products/:id',
}
