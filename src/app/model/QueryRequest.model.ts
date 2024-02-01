export interface QueryRequest {
  query?: Query,
  options: Options
}

export interface Query {
  name: String,
  region: String
}

export interface Options {
  select: String[],
  page: number,
  limit: number
}
