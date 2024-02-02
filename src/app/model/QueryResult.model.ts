import {Launchpad} from "./Launchpad.model";
import {Launch} from "./Launch.model";

export interface QueryResult {
  // docs: Launchpad[] | Launch[],
  docs: any[],
  totalDocs: number,
  limit: number,
  totalPages: number,
  page: number,
  pagingCounter: number,
  hasPrevPage: boolean,
  hasNextPage: boolean,
  prevPage: number,
  nextPage: number
}
