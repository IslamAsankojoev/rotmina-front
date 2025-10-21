import { api } from "@/src/app";
import { apiMap } from "@/src/shared";
import { CategoryResponse } from "./type";

export const CategoryService = {
  getCategories: (): Promise<CategoryResponse> => api.get(apiMap.getCategories + '?populate=image').json(),
  getCategory: (id: string): Promise<CategoryResponse> => api.get(apiMap.getCategory.replace(':id', id) + '?populate=image').json(),
}