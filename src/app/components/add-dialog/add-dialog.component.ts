import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextarea } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    InputTextarea,
    CalendarModule,
  ],
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit, OnChanges {
  @Input() piIcon: string = 'pi pi-user';
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
    required?: boolean; // ✅ Added required field for validation
  }[] = [];

  @Output() formSubmit = new EventEmitter<any>();

  visible: boolean = false;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields'] && !changes['fields'].firstChange) {
      this.createForm();
    }
  }

  showDialog() {
    this.createForm(); // Ensures the form is always fresh
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
  createForm() {
    const controls: { [key: string]: any } = {};

    this.fields.forEach((field) => {
      if (field.type === 'array') {
        // ✅ Properly initializing as an array of FormGroups
        controls[field.name] = new FormArray([]);
      } else {
        controls[field.name] = new FormControl(
          '',
          field.required ? Validators.required : []
        );
      }
    });

    this.form = this.fb.group(controls);
  }

  addArrayItem(fieldName: string) {
    const arrayControl = this.form.get(fieldName) as FormArray;

    // ✅ Instead of empty strings, add a new FormGroup with 'name' & 'image' fields
    arrayControl.push(
      this.fb.group({
        name: ['', Validators.required],
        image: ['', Validators.required],
      })
    );

    console.log('Updated Star Cast:', arrayControl.value); // Debugging
  }

  removeArrayItem(fieldName: string, index: number) {
    const arrayControl = this.form.get(fieldName) as FormArray;
    arrayControl.removeAt(index); // ✅ Allow removal even when one item is left
  }
  getFormArray(fieldName: string): FormArray {
    return this.form.get(fieldName) as FormArray;
  }
}
