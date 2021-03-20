import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {PokemonService} from '../pokemon.service';
import {MatDialog} from '@angular/material/dialog';
import {PokeDetailsDialogComponent} from './detailsDialog/pokeDetailsDialog.component';

@Component({
  selector: 'app-version2',
  templateUrl: './version2.component.html',
  styleUrls: ['./version2.component.css']
})
export class Version2Component implements OnInit {

  totalCount = 0;
  tableData = new MatTableDataSource();
  displayedColumns = ['name', 'details'];

  constructor(public service: PokemonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTableData(0, 10);
  }

  getTableData(offset: number, limit: number): void {
    this.tableData = new MatTableDataSource();

    this.service.getPokemonTable(offset, limit).subscribe( res => {
      console.log(res);
      this.totalCount = res.count;
      this.tableData = new MatTableDataSource(res.results);
    });
  }

  onDetailsButtonClick(pokeName: string, detailsURL: string): void {
    this.dialog.open(PokeDetailsDialogComponent, {data:
        {name: pokeName, url: detailsURL},
      height: '500px',
      width: '1000px'
    });
  }

  onPageChange(event: any): void {
    console.log(event);
    this.getTableData(event.pageSize * event.pageIndex, event.pageSize);
  }

}
