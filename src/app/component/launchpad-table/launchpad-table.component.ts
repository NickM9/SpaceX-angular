import { Component } from '@angular/core';
import {LaunchpadService} from "../../service/launchpad.service";
import {QueryResult} from "../../model/QueryResult.model";
import {Launchpad} from "../../model/Launchpad.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-launchpad-table',
  standalone: true,
  imports: [],
  templateUrl: './launchpad-table.component.html',
  styleUrl: './launchpad-table.component.css'
})
export class LaunchpadTableComponent {

  launchpadQuery: QueryResult = {
    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: 0,
    page: 0,
    pagingCounter: 0,
    prevPage: 0,
    totalDocs: 0,
    totalPages: 0
  };
  dataSource: any;
  launchpads: Launchpad[] = [];

  constructor(private service: LaunchpadService) {
  }

  ngOnInit() {
    this.GetAll();
  }

  GetAll() {
    this.service.GetAll().subscribe(value => {
      this.launchpadQuery = value
      this.dataSource = new MatTableDataSource(this.launchpadQuery.docs);
    })

    console.log()
  }

}
