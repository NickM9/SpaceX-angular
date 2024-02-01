import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {QueryResult} from "../model/QueryResult.model";
import {QueryRequest} from "../model/QueryRequest.model";
import {map, Observable, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LaunchpadService {

  baseurl = 'https://api.spacexdata.com/v4/launchpads/query';
  constructor(private http: HttpClient) {

  }

  GetAll(): Observable<QueryResult> {
    const queryRequest: QueryRequest = {
      options: {
        select: ["name", "region", "launches"],
        page: 0,
        limit: 5
      }
    };

    return this.http.post<QueryResult>(this.baseurl, queryRequest);
  }

}
