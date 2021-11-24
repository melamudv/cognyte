import {Component, OnInit, ViewChild} from '@angular/core';
import {TableVirtualScrollDataSource} from 'ng-table-virtual-scroll';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort, Sort} from '@angular/material/sort';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import * as _ from 'lodash';
import {ILatLng} from './models/latlng.model';
import {DataService} from './core/data.service';
import {IData} from './models/data.model';

interface ISort {
  direction: boolean;
  active: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cognyte';
  selectedData: IData = null;
  displayedColumns: string[] = ['select', 'position' , 'ID', 'Date', 'Param1', 'Param2', 'Param3', 'Param4', 'Param5', 'Param6', 'Param7', 'Param8', 'Param9'];
  dataSource = new TableVirtualScrollDataSource<IData>();
  selection = new SelectionModel<IData>(false, []);
  sortBy: ISort = {
    active: '',
    direction: true
  };
  sortDirection: any;
  loading: boolean = false;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.setDefaultSort();
    this.loading = true;
    this.dataService.getData().subscribe((res: IData[]) => {
      res.forEach((el: IData, index) => {
        el.position = index;
      });
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }
  setDefaultSort(): void{
    this.sort.sort({
        id: 'ID',
        start: 'asc',
        disableClear: true
      }
    );
  }
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isSelectedRow(row: IData): void{
    if (this.selection.isSelected(row)){
      this.selectedData = row;
    }

  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position}`;
  }

  sortData(sort: Sort): void {
    this.sortBy.active = sort.active;
    this.sortBy.direction = sort.direction === 'asc' ? true : false;
    this.sortDirection = sort.direction;
  }

  onLatLng(latLng: ILatLng): void{
    const data = _.orderBy(this.dataSource.data, [this.sortBy.active], this.sortDirection);
    const position = data.find(e => e.position === latLng.position)?.position;
    const selectedIndex = data.findIndex(elem => position === elem.position);
    if (selectedIndex > -1){
      this.viewPort.scrollToIndex(selectedIndex);
      this.selection.clear();
      this.selection.select(data[selectedIndex]);
      this.checkboxLabel(data[selectedIndex]);
    }
  }

}
