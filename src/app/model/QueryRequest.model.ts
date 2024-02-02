export interface QueryRequest {
  query: Query,
  options: Options
}

export interface Query {
  "$or": [
    { "name": { "$regex": string, "$options": string } },
    { "region": { "$regex": string, "$options": string } }
  ]
}

export interface Options {
  select: String[],
  page: number,
  limit: number
}
