import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  roleList: any;
  editData: any;

  constructor(private builder: FormBuilder, private service: AuthService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog:MatDialogRef<UpdatepopupComponent>,private router: Router) { }

  ngOnInit(): void {
    this.service.getAllRole()
      .subscribe(res => {
        this.roleList = res;
      })
    if (this.data.userCode != null && this.data.userCode != '') {
      this.service.getByCode(this.data.userCode)
        .subscribe(res => {
          this.editData = res;
          this.registerForm.setValue(
            {
              id: this.editData.id,
              name: this.editData.name,
              email: this.editData.email,
              password: this.editData.password,
              gender: this.editData.gender,
              role: this.editData.role,
              isactive: this.editData.isactive
            })
        })
    }
  }

  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });

  updateUser() {
    if(this.registerForm.valid){
      this.service.updateUser(this.registerForm.value.id,this.registerForm.value)
      .subscribe(res=>{
        this.toastr.success('Updated Successfully');
        this.dialog.close();
      })
    }
    else{
      this.toastr.warning('Please Select Role.')

    }
  }

}
