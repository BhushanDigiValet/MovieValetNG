import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [
    DropdownModule,
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {
  @Input() piIcon: string = 'pi pi user';
  @Input() dialogTitle: string = 'Add Dialog';
  @Input() title: string = 'Edit Profile';
  @Input() btnName: string = 'Show';
  @Input() description: string = 'Update your information.';
  @Input() fields: {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    options?: { label: string; value: string }[];
  }[] = [];
  @Output() formSubmit = new EventEmitter<any>();

  visible: boolean = false;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const controls: { [key: string]: FormControl } = {};
    this.fields.forEach((field) => {
      controls[field.name] = new FormControl(
        '',
        field.type === 'dropdown' ? Validators.required : []
      );
    });
    this.form = new FormGroup(controls);
  }

  ngOnChanges(): void {
    this.createForm();
  }

  showDialog() {
    this.createForm();
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  save() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      this.visible = false;
    }
  }
}
