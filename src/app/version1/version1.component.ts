import {Component, OnInit, ViewChild} from '@angular/core';
import {PokemonService} from '../pokemon.service';
import {MatTableDataSource} from '@angular/material/table';
import { PokemonDetails } from '../model/PokemonDetails';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-version1',
  templateUrl: './version1.component.html',
  styleUrls: ['./version1.component.css']
})
export class Version1Component implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalCount = 0;
  tableData = new MatTableDataSource();
  pokemonDetails: PokemonDetails[] = [];
  displayedColumns = ['name', 'type', 'hw', 'sigAbility', 'baseExp'];

  constructor(public service: PokemonService) { }

  ngOnInit(): void {
    this.getTableData(0, 10);
  }

  getTableData(offset: number, limit: number): void {
    this.tableData = new MatTableDataSource();
    this.pokemonDetails = [];
    this.service.getPokemonTable(offset, limit).subscribe( res => {
      console.log(res);
      this.totalCount = res.count;
      res.results.forEach(obj => {
        this.service.getPokemonDetails(obj.url).subscribe( response => {
          console.log(response);
          const poke = new PokemonDetails();
          poke.name = response.name;
          response.types.forEach(type => {
            poke.type += type.type.name + ', ';
          });
          poke.type = poke.type.slice(0, -2);
          poke.height = response.height;
          poke.weight = response.weight;
          response.abilities.forEach(abi => {
            poke.sigAbility += abi.ability.name + ', ';
          });
          poke.sigAbility = poke.sigAbility.slice(0, -2);
          poke.baseExp = response.base_experience;
          this.pokemonDetails.push(poke);
          this.tableData = new MatTableDataSource(this.pokemonDetails);
        });
        console.log(this.tableData);
      });
    });
  }

  onPageChange(event: any): void {
    console.log(event);
    this.getTableData(event.pageSize * event.pageIndex, event.pageSize);
  }
}
