import {Component, OnInit, ViewChild} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {MatTableDataSource} from '@angular/material/table';
import {PokemonDetails} from '../../model/PokemonDetails';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-version1',
  templateUrl: './version1.component.html'
})
export class Version1Component implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalCount = 0;
  tableData = new MatTableDataSource();
  pokemonDetails: PokemonDetails[] = [];
  displayedColumns = ['name', 'type', 'hw', 'sigAbility', 'baseExp'];

  pokemonName: string = '';
  pokemonType: string = '';

  constructor(public service: PokemonService, private snackbar: MatSnackBar) { }

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
          this.parseResponseIntoTableModel(response)
        });
        console.log(this.tableData);
      });
    });
  }

  searchPokemon(): void {
    if (this.pokemonName != '') {
      this.tableData = new MatTableDataSource();
      this.pokemonDetails = [];
      this.service.searchPokemonByName(this.pokemonName).subscribe(res => {
        console.log(res);
        this.parseResponseIntoTableModel(res);
      });
    } else if (this.pokemonType != '') {
      this.tableData = new MatTableDataSource();
      this.pokemonDetails = [];
      this.service.searchPokemonByType(this.pokemonType).subscribe(res => {
        console.log(res);
        res.pokemon.forEach(poke => {
          this.service.getPokemonDetails(poke.pokemon.url).subscribe(response => {
            this.parseResponseIntoTableModel(response);
          })
        })

      });
    } else {
      this.snackbar.open('Filter by name or type', 'Reset', {duration: 3000});
    }
  }

  onPageChange(event: any): void {
    console.log(event);
    this.getTableData(event.pageSize * event.pageIndex, event.pageSize);
  }

  parseResponseIntoTableModel(response: any) {
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
  }
}
