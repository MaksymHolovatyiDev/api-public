export interface IGetAllNewsQueryParams {
  searchTerm: string
  publishedBefore: string
  publishedAfter: string
  page: number
  limit: number
}
