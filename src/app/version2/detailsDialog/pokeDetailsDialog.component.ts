import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PokemonService} from '../../pokemon.service';

@Component({
  selector: 'app-poke-details-dialog',
  templateUrl: './pokeDetailsDialog.component.html'
})
export class PokeDetailsDialogComponent {

  type = '';
  weight = '';
  height = '';
  abilities = '';
  doubleFrom = '';
  doubleTo = '';
  halfFrom = '';
  halfTo = '';
  noFrom = '';
  noTo = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string, url: string },
              private service: PokemonService) {
    this.service.getPokemonDetails(data.url).subscribe(res => {
      console.log(res);
      this.weight = res.weight;
      this.height = res.height;
      res.types.forEach(type => {
        this.type += type.type.name + ', ';
        this.service.getPokemonDetails(type.type.url).subscribe(resType => {
          console.log(resType);
          resType.damage_relations.double_damage_from.forEach(df => {
            this.doubleFrom += df.name + ', ';
          });
          resType.damage_relations.double_damage_to.forEach(dt => {
            this.doubleTo += dt.name + ', ';
          });
          resType.damage_relations.half_damage_from.forEach(hf => {
            this.halfFrom += hf.name + ', ';
          });
          resType.damage_relations.half_damage_to.forEach(ht => {
            this.halfTo += ht.name + ', ';
          });
          resType.damage_relations.no_damage_from.forEach(nf => {
            this.noFrom += nf.name + ', ';
          });
          resType.damage_relations.no_damage_to.forEach(nt => {
            this.noTo += nt.name + ', ';
          });
        });
      });
      res.abilities.forEach(ability => {
        this.abilities += ability.ability.name + ', ';
      });


      this.type = this.type.slice(0, -2);
      this.abilities = this.abilities.slice(0, -2);
      this.doubleFrom = this.doubleFrom.slice(0, -2);
      this.doubleTo = this.doubleTo.slice(0, -2);
      this.halfFrom = this.halfFrom.slice(0, -2);
      this.halfTo = this.halfTo.slice(0, -2);
      this.noFrom = this.noFrom.slice(0, -2);
      this.noTo = this.noTo.slice(0, -2);
      console.log(this.type);
      console.log(this.halfTo);
    });
  }
}
