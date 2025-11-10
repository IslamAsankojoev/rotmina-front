import { Product } from "./types"

export const getProductTitle = (product: Product) => {
  return product.title + ' ' + product.titleHE
}

export const getProductDescription = (product: Product) => {
  return product.description + ' ' + product.descriptionHE
}