import { Component, OnInit } from '@angular/core';
import {FormControl,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CycleService } from 'src/app/services/cycle.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  username = new FormControl('',[Validators.required]);
  password = new FormControl('',[Validators.required]);
  nomEcole = new FormControl('',[Validators.required]);
  email = new FormControl('',[Validators.required]);
  telephone = new FormControl('',[Validators.required]);
  adresse = new FormControl('',[Validators.required]);
  cycleSelect = new FormControl(0,[Validators.required]);
  cycles:any[] = [];
  constructor(private authenticationService:AuthenticationService,private toastr:ToastrService,private cycleService:CycleService,private router:Router) {
    this.telephone = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$") // Expression régulière pour autoriser uniquement les chiffres
    ]);
  }

  ngOnInit(): void {
    this.loadCycle()
  }

  register(){
    let registerModel:any = {
      username:this.username.value,
      password:this.password.value,
      nom:this.nomEcole.value,
      email:this.email.value,
      telephone:this.telephone.value,
      adresse:this.adresse.value,
      cycle:{
        id:this.cycleSelect.value
      },
    }

    this.authenticationService.register(registerModel).subscribe({
      next:(value:any)=>{
        this.toastr.success(value.message),
        this.router.navigateByUrl(`/authentication/login`)
      },
      error:(err)=>{
        this.toastr.error("Un utilisateur avec ce nom d'utilisateur ou cet adresse mail est deja enregistré")
      }
    })
  }

  loadCycle(){
    this.cycleService.getAllCycle().subscribe({
      next:(value:any)=>{
        this.cycles = value
        this.cycleSelect.patchValue(value[0].id)
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }


}
