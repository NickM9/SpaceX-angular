import {Component, ViewChild} from '@angular/core';
import {LaunchpadService} from "../../service/launchpad.service";

import {
  MatCell,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {QueryRequest} from "../../model/QueryRequest.model";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-launchpad-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatTable,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    NgForOf,
    TitleCasePipe,
    MatPaginator,
    MatFormField,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './launchpad-table.component.html',
  styleUrl: './launchpad-table.component.css'
})
export class LaunchpadTableComponent {
  dataSource: any;
  columnsToDisplay: string[] = ["name", "region", "launches"];
  // launchpads: Launchpad[] = [];

  // pagination params
  totalRecords: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  queryRequest: QueryRequest = {
    query: {
      $or: [
        {name: { $regex: "", $options: "i" }},
        {region: { $regex: "", $options: "i" }}
      ]
    },
    options: {
      select: ["name", "region", "launches"],
      page: ++this.pageIndex,
      limit: this.pageSize
    }
  };

  constructor(private service: LaunchpadService) {
  }


  ngOnInit() {
    this.getByParams(this.queryRequest);
  }

  getByParams(queryRequest: QueryRequest) {
    this.service.getByParams(queryRequest).subscribe(value => {
      this.dataSource = new MatTableDataSource(value.docs);
      this.totalRecords = value.totalDocs;
      this.pageSize = value.limit;
      this.pageIndex = --value.page;
    })

  }

  pageChangeEvent(event: PageEvent) {
    this.queryRequest = {
      ...this.queryRequest,
      options: {
        ...this.queryRequest.options,
        page: ++event.pageIndex,
        limit: event.pageSize
      }
    }
    this.getByParams(this.queryRequest);
  }

  filterEvent(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.queryRequest = {
      ...this.queryRequest,
      query: {
        $or: [
          {name: { $regex: filterValue, $options: "i" }},
          {region: { $regex: filterValue, $options: "i" }}
        ]
      }

    }
    this.getByParams(this.queryRequest);
  }

}
