import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {QueryResult} from "../model/QueryResult.model";
import {QueryRequest} from "../model/QueryRequest.model";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LaunchpadService {

  baseurl = 'https://api.spacexdata.com/v4/launchpads/query';
  constructor(private http: HttpClient) {

  }

  getByParams(queryRequest: QueryRequest): Observable<QueryResult> {
    return this.http.post<QueryResult>(this.baseurl, queryRequest);
  }

}
