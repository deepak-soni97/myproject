import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-mat-chip-list-items',
  templateUrl: './mat-chip-list-items.component.html',
  styleUrls: ['./mat-chip-list-items.component.scss']
})
export class MatChipListItemsComponent {

  name: string;

  selectable = true;
  removable = true;
  addOnBlur = true;
  Fruit:any
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: any[] = [
   
  ];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}


