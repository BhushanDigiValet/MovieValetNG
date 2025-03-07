import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  imports: [
    FormsModule,
    InputTextModule,

    ButtonModule,
    CommonModule,
    TableModule,
    DropdownModule,
    OverlayPanelModule,
    Dialog,
  ],
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: {
    field: string;
    header: string;
    filter?: boolean;
    filterOptions?: any[];
  }[] = [];
  @Input() showEdit: boolean = true;
  @Input() showBlock: boolean = false;

  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  visible: boolean = false;
  selectedItem: any = {};
  selectedFilters: { [key: string]: any } = {};

  openEditDialog(item: any) {
    this.selectedItem = { ...item };
    this.visible = true;
  }

  get filteredData(): any[] {
    if (!this.data) return [];
    return this.data.filter((item) =>
      Object.keys(this.selectedFilters).every(
        (key) =>
          !this.selectedFilters[key] || item[key] === this.selectedFilters[key]
      )
    );
  }

  applyFilters() {
    console.log('Filters applied:', this.selectedFilters);
  }

  saveChanges() {
    this.save.emit(this.selectedItem);
    this.visible = false;
  }

  deleteUser(item: any) {
    this.selectedItem = item;
    if (this.selectedItem?.id) {
      this.delete.emit(this.selectedItem);
    } else {
      console.error('Error: No valid ID found in selected item');
    }
  }
}
