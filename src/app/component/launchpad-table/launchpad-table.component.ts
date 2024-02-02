import {Component} from '@angular/core';
// import {Component, ChangeDetectorRef, ViewChildren, QueryList} from '@angular/core';
// import {  OnInit, ViewChild } from '@angular/core';
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
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {QueryRequest} from "../../model/QueryRequest.model";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Launchpad} from "../../model/Launchpad.model";
import {Launch} from "../../model/Launch.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {LaunchService} from "../../service/launch.service";

@Component({
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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
    MatFormFieldModule,
    NgIf
  ],
  selector: 'app-launchpad-table',
  standalone: true,
  styleUrl: './launchpad-table.component.css',
  templateUrl: './launchpad-table.component.html'
})
export class LaunchpadTableComponent {
  launchpadsSource: any;
  launchersSource: any;
  columnsToDisplay: string[] = ["name", "region"];
  launchesDisplayedColumns = ["success", "details", "links.wikipedia"];
  launchpads: Launchpad[] = [];
  launches: Launch[] = [];
  expandedElement !: Launchpad;

  // pagination params
  totalRecords: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  launchpadsQueryRequest: QueryRequest = {
    query: {
      $or: [
        {name: { $regex: "", $options: "i" }},
        {region: { $regex: "", $options: "i" }}
      ]
    },
    options: {
      select: ["id", "name", "region", "launches"],
      page: ++this.pageIndex,
      limit: this.pageSize,
      pagination: true
    }
  };

  constructor(private launchpadService: LaunchpadService, private launchService: LaunchService) {
  }


  ngOnInit() {
    this.getLaunchPadsByParams(this.launchpadsQueryRequest);
  }

  getLaunchPadsByParams(queryRequest: QueryRequest) {
    this.launchpadService.getByParams(queryRequest).subscribe(value => {
      this.launchpads = value.docs
      this.launchpadsSource = new MatTableDataSource(this.launchpads);
      this.totalRecords = value.totalDocs;
      this.pageSize = value.limit;
      this.pageIndex = --value.page;
    })

  }

  getLaunchesByParams(queryRequest: QueryRequest) {
    this.launchService.getByParams(queryRequest).subscribe(value => {
      this.launches = value.docs
      this.launchersSource = new MatTableDataSource(this.launches);
      console.log()
    })

  }

  pageChangeEvent(event: PageEvent) {
    this.launchpadsQueryRequest = {
      ...this.launchpadsQueryRequest,
      options: {
        ...this.launchpadsQueryRequest.options,
        page: ++event.pageIndex,
        limit: event.pageSize
      }
    }
    this.getLaunchPadsByParams(this.launchpadsQueryRequest);
  }

  filterEvent(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.launchpadsQueryRequest = {
      ...this.launchpadsQueryRequest,
      query: {
        $or: [
          {name: { $regex: filterValue, $options: "i" }},
          {region: { $regex: filterValue, $options: "i" }}
        ]
      }

    }
    this.getLaunchPadsByParams(this.launchpadsQueryRequest);
  }

  toggleRow(element: Launchpad) {
    console.log()
    this.expandedElement = element
    const launchersQueryRequest: QueryRequest = {
      query: {
        _id: {
          $in: element.launches
        }
      },
      options: {
        select: ["success", "details", "links.wikipedia"],
        pagination: false
      }
    }
    this.getLaunchesByParams(launchersQueryRequest);
    console.log()
    // element.addresses && (element.addresses as MatTableDataSource<Address>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    // this.cd.detectChanges();
    // this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).sort = this.innerSort.toArray()[index]);
  }

}
