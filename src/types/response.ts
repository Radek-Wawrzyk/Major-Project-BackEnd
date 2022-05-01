interface PaginationResponse {
  totalCount: number;
  totalPages: number;
  limit: number;
  page: number;
  data: any[];
}

export { PaginationResponse };
