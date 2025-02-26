import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    TagModule,
    SelectButtonModule,
    FormsModule,
  ],
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
})
export class EditableTableComponent {
  products = [
    {
      id: 1,
      code: 'P1001',
      name: 'Laptop',
      inventoryStatus: 'In Stock',
      price: 1200,
    },
    {
      id: 2,
      code: 'P1002',
      name: 'Phone',
      inventoryStatus: 'Out of Stock',
      price: 800,
    },
    {
      id: 3,
      code: 'P1003',
      name: 'Tablet',
      inventoryStatus: 'Low Stock',
      price: 500,
    },
  ];

  statuses = [
    { label: 'In Stock', value: 'In Stock' },
    { label: 'Low Stock', value: 'Low Stock' },
    { label: 'Out of Stock', value: 'Out of Stock' },
  ];

  onRowEditInit(product: any) {
    console.log('Edit Init:', product);
  }

  onRowEditSave(product: any) {
    console.log('Edit Save:', product);
  }

  onRowEditCancel(product: any, index: number) {
    console.log('Edit Cancel:', product, index);
  }

  getSeverity(
    status: string
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warn'
    | 'danger'
    | 'contrast'
    | undefined {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warn'; 
      case 'Out of Stock':
        return 'danger';
      default:
        return 'info';
    }
  }
}
