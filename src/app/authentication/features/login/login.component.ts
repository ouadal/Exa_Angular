import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl('',[Validators.required])
  password = new FormControl('',[Validators.required])

  constructor(private authenticationService:AuthenticationService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    let loginModel:any = {
      username:this.username.value,
      password:this.password.value
    }

    this.authenticationService.login(loginModel).subscribe({
      next:(value)=>{
        this.authenticationService.setUserInformations(value);
        this.authenticationService.getMyInformations().subscribe({
          next:(informations:any)=>{
            this.authenticationService.setRoles(informations.data[0].roles);
            let isAdmin = false;
            for (let i = 0; i < informations.data[0].roles.length; i++) {
              if(informations.data[0].roles[i].name == 'ROLE_ADMIN'){
                isAdmin = true
                break
              }
            }
            if(isAdmin){
              this.router.navigateByUrl('/template/Annee');
            }else{
              this.router.navigateByUrl('/template/Examen');
            }

            this.toastr.success('Connexion réussie');
          },
          error:(err)=>{
            this.toastr.error(err.message);
          }
        });
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })

  }

}
