import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.scss']
})
export class MultiselectDropdownComponent implements OnInit {
  @Input() selectedItems: any = [];
  @Input() isMultiple: boolean = true;
  @Input() disabled: boolean = false;
  @Input() groupByKey: string = '';
  @Input() items: any = [];
  @Input() bindLabel: string = 'title'
  @Input() searchable: boolean = false;
  @Input() closeOnSelect: boolean = true;
  @Input() clearable: boolean = false;
  @Input() placeholder: string = '';

  @Output() onChangeEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private cdr: ChangeDetectorRef) {


  }

  onSearchInDropdown(event: any) {
    return event.target.value;
  }
  ngOnInit(): void {

  }
  onChange(eventVal: any) {
    if (eventVal && !eventVal.target) {
      this.onChangeEmitter.emit(eventVal);
    }
  }
  ngAfterViewChecked() {

    this.cdr.detectChanges();
  }

  ngOnChanges(changes: any) {
    if (changes.items && this.isMultiple) {
      let selItemIds = (this.selectedItems || []).map((row: any) => row.id);
      this.selectedItems = changes.items.currentValue.filter((x: any) => selItemIds.indexOf(x.id) > -1)
      //this.onChangeEmitter.emit(this.selectedItems);
    }
    // else if (changes.items && !this.isMultiple && this.selectedItems) {
    //   debugger;
    //   if (changes.items.currentValue.findIndex((x: any) => x.id == this.selectedItems.id) < 0) {
    //     this.selectedItems = null;
    //     this.onChangeEmitter.emit(null);
    //   }
    // }
  }
}
