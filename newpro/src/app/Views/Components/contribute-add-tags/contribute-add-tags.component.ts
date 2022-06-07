import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Output, Input, ViewChild, ElementRef, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { SvcMasterDataService } from '@AppServices';
import { pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



@Component({
  selector: 'app-contribute-add-tags',
  templateUrl: './contribute-add-tags.component.html',
  styleUrls: ['./contribute-add-tags.component.scss']
})
export class ContributeAddTagsComponent {
  @Input() selectedTopicTags:any[]=[];
  searchTagItems: any;
  @Output() tagsItemsEmitter: EventEmitter<any> = new EventEmitter<any>();

  name: string;
  selectable = true;
  removable = true;
  addOnBlur = false;
  Fruit: any
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: any[] =[];
  @ViewChild('keywordsInput') keywordsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  ngOnChanges() {
   this.selectedTopicTags.map((row:any)=>{
      this.fruits.push({Id: row.id, TagName: row.tagName});
    }) 
  }
  ngOnInit(): void {
    // this.selectedTopicTags.map((row:any)=>{
    //   this.fruits.push({Id: row.id, TagName: row.tagName});
    // }) 
  }
  constructor(private svcMasterDataService: SvcMasterDataService) {
    // this.item = this.item.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => fruit ? this._filter(fruit) : this.item.slice()));
  }
  onChange(strValue: any): void {
    this.svcMasterDataService.MasterAddTagSearch(strValue.value).subscribe((data: any) => {
      
      this.searchTagItems = data;

    })

  }
  addItemButtonClick(keywordsInput: any) :void{
    const value = (keywordsInput || '').trim();

    if (keywordsInput) {
      this.fruits.push({ Id: 0, TagName: value });
      this.tagsItemsEmitter.emit(keywordsInput)
    }
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.fruits.push({ Id: 0, TagName: value });

      this.tagsItemsEmitter.emit(this.fruits)

    }

    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
      this.tagsItemsEmitter.emit(this.fruits)
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    // var arr : Criminal[] = [];
    this.fruits.push({ TagName: event.option.viewValue });
    this.keywordsInput.nativeElement.value = '';
    this.tagsItemsEmitter.emit(this.fruits)

  }
  empty(ev: string) {
    this.fruits = []
  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.sear.filter(option => option.fruits.toLowerCase().indexOf(filterValue) === 0);

  // }
}


