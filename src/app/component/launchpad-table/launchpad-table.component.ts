import {Component, ViewChild} from '@angular/core';
import {LaunchpadService} from "../../service/launchpad.service";
import {QueryResult} from "../../model/QueryResult.model";
import {Launchpad} from "../../model/Launchpad.model";
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
    MatPaginator
  ],
  templateUrl: './launchpad-table.component.html',
  styleUrl: './launchpad-table.component.css'
})
export class LaunchpadTableComponent {

  totalRecords = 0;
  pageSize = 5;
  pageIndex = 0;

  dataSource: any;
  columnsToDisplay: string[] = ["name", "region", "launches"];
  // launchpads: Launchpad[] = [];

  defaultQueryRequest: QueryRequest = {
    options: {
      select: ["name", "region", "launches"],
      page: ++this.pageIndex,
      limit: this.pageSize
    }
  };

  constructor(private service: LaunchpadService) {
  }


  ngOnInit() {
    this.getByParams(this.defaultQueryRequest);
  }

  getByParams(queryRequest: QueryRequest) {
    this.service.getByParams(queryRequest).subscribe(value => {
      this.dataSource = new MatTableDataSource(value.docs);
      this.totalRecords = value.totalDocs;
      this.pageSize = value.limit
      this.pageIndex = --value.page
    })

  }

  pageChangeEvent(event: PageEvent) {
    const queryRequest: QueryRequest = {
      ...this.defaultQueryRequest,
      options: {
        ...this.defaultQueryRequest.options,
        page: ++event.pageIndex,
        limit: event.pageSize
      }
    }
    this.getByParams(queryRequest);
  }

}
