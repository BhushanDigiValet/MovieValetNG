import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  imports: [
    FormsModule,
    InputTextModule,
    Dialog,
    ButtonModule,
    CommonModule,
    TableModule,
  ],
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: { field: string; header: string }[] = [];
  @Input() showEdit: boolean = true;
  @Input() showBlock: boolean = false;

  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  visible: boolean = false;
  selectedItem: any = {};

  openEditDialog(item: any) {
    this.selectedItem = { ...item };
    this.visible = true;
  }

  saveChanges() {
    this.save.emit(this.selectedItem);
    this.visible = false;
  }
  deleteUser() {
    this.delete.emit(this.selectedItem);
  }
}
