import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    height: ['', [Validators.required, Validators.min(0)]],
    isElectric: [false, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehicleFormComponent>,
    @Inject(MAT_DIALOG_DATA) @Optional() private vehicle ?: Vehicle
  ) { }

  ngOnInit() {
    if (this.vehicle) {
      this.form.patchValue(this.vehicle);
    }
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

}
