import { request, HttpMethods } from "@utils/request";
import { BOOKS_API_GET } from "./books-constants";
import { Book } from "./books-types";

export const getAll = async (
  search?: string,
  limit?: number
): Promise<Book[]> => {
  const { data } = await request({
    url: BOOKS_API_GET,
    method: HttpMethods.GET,
    params: { search, limit },
  });
  return data;
};
