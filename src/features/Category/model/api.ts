import { api } from "@/src/app";
import { apiMap } from "@/src/shared";
import { CategoryFindOneResponse, CategoryResponse } from "./type";

export const CategoryService = {
  getCategories: (): Promise<CategoryResponse> => api.get(apiMap.getCategories + '?populate=image').json(),
  getCategory: (id: string): Promise<CategoryFindOneResponse> => api.get(apiMap.getCategory.replace(':id', id) + '?populate=image').json(),
  getCategoryBySlug: (slug: string): Promise<CategoryFindOneResponse> => api.get(apiMap.getCategoryBySlug.replace(':slug', slug) + '?populate=image').json(),
}