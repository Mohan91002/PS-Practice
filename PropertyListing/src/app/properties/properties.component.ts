import { PropertyService } from './../shared/property.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Property } from './properties.model';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent implements OnInit {

  allProperty: any;
  formValue!: FormGroup;
  propertyModelObj: Property = new Property();
  showAdd!: boolean;
  showEdit!: boolean;

  constructor(private fb: FormBuilder, private api: PropertyService) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      pTitle: [''],
      pPrice: [''],
      pLocation: [''],
      pDetails: ['']
    })
    this.getAllProperty();
  }

  clickAddProperty() {
    this.formValue.reset();
    this.showAdd = true;
    this.showEdit = false;
  }

  getAllProperty() {
    this.api.getAllProperty()
      .subscribe((res) => {
        this.allProperty = res;
        console.warn(this.allProperty)
      })
  }

  addProp() {
    this.propertyModelObj.pTitle = this.formValue.value.pTitle;
    this.propertyModelObj.pPrice = this.formValue.value.pPrice;
    this.propertyModelObj.pLocation = this.formValue.value.pLocation;
    this.propertyModelObj.pDetails = this.formValue.value.pDetails;
    this.api.addListing(this.propertyModelObj)
      .subscribe((res) => {
        console.log(res);
        alert("Record Added Successfully");
        let ref = document.getElementById('clear');
        ref?.click()
        this.formValue.reset();
        this.getAllProperty();
      },
        err => {
          alert("something went wrong")
        }

      )
  }

  deleteProperty(data: any) {
    this.api.deleteProperty(data.id)
      .subscribe((res) => {
        alert('property deleted successful');
        this.getAllProperty();
      })
  }



}
