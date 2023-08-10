import { Component, OnInit } from '@angular/core';
import {EnrolementService} from "../../services/enrolement.service";
import {FormControl, FormGroup} from "@angular/forms";
import { ExamenService } from 'src/app/services/examen.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { EcoleService } from 'src/app/services/ecole.service';

@Component({
  selector: 'app-enrolement-component',
  templateUrl: './enrolement-component.component.html',
  styleUrls: ['./enrolement-component.component.css']
})
export class EnrolementComponentComponent implements OnInit {
  examen = new FormControl('')
  ecole = new FormControl('')
  examenSelect = new FormControl(0)
  ecoleSelect = new FormControl(0)
  enrolements: any = []
  examens: any = []
  ecoles: any = []
  private confirmDeleteModal: any;
  activeEnrol!: any
  selectedEnrolId!: number | undefined;
  isAdmin = false


  enrolementForm = new FormGroup({
    examen: this.examen,
    ecole: this.ecole
  });

  constructor(private ecoleService:EcoleService,private enrolementService: EnrolementService,private examenService:ExamenService,private authenticationService:AuthenticationService,private toastr:ToastrService) {
  }

  ngOnInit(): void {
    //this.getAllEnrol();
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        let isAdmin = false
        console.log(value)
        for (let i = 0; i < value.data[0].roles.length; i++) {
          if(value.data[0].roles[i].name == "ROLE_ADMIN"){
            isAdmin = true;
            this.isAdmin = true;
            break
          }
        }
        if(isAdmin){
          //this.getAllExamPourAdmin()
          this.getAllExam()
        }else {
          let idEcole =value.data[0].informations.id;
          this.getAllEcole(idEcole);
          this.getListExamPerEcol(idEcole)
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })

  }

  loadEnrollment(){
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        let isAdmin = false
        console.log(value)
        for (let i = 0; i < value.data[0].roles.length; i++) {
          if(value.data[0].roles[i].name == "ROLE_ADMIN"){
            isAdmin = true;
            break
          }
        }
        if(isAdmin){
          //this.getAllExamPourAdmin()
          this.getAllEcolThatAreEnrolled()
        }else {
          // let idEcole =value.data[0].informations.id;
          this.getAllEcolThatAreEnrolled()
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }

  //  I NEED THIS
  getAllExam(){
    this.examenService.getAllExam().subscribe(
      (value: any) => {
        this.examens = value;
        this.examenSelect.patchValue(value[0].id)
        this.getAllEcolThatAreEnrolled();
        console.log(this.examens)
      },
      (error: any) => {
        console.log(error.message)
      }
    );
  }

  getAllEcole(idEcole:number|undefined){
    if(idEcole){
      this.ecoleService.getAllEcol().subscribe({
        next:(value) => {
          let newValue:any[]  = [];
          console.log("dammmmmmmmmmmmmmmmmmmmmmm");

            for(let i = 0; i< value.length;i++){
              if(!(value[i].id == idEcole)){
                newValue.push(value[i])
              }
            }
            this.ecoles = newValue;
            console.log(this.ecoles);

            this.ecoleSelect.patchValue(newValue[0].id);
        },
        error:(err) => {
            this.toastr.error(err.message)
        },
      })
    }
  }


  addEnrol() {
    var data = {
      examen: this.examen.value,
      ecole: this.ecole.value,
    }
    console.log(data)
    this.enrolementService.addEnrol(data).subscribe({
      next: (value: any) => {
        console.log('Enrolement ajoutée avec succès !')
        this.getAllEnrol
        this.enrolementForm.reset()

      },
      error: (err) => {
        console.log(err.message)

      }
    })
  }

  editEnrol(id: number | undefined) {
    //@ts-ignore
    this.enrolementService.getEnrolById(id).subscribe(
      (enrol: any) => {
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedEnrolId = id;
        this.examen.setValue(enrol.examen);
        this.ecole.setValue(enrol.ecole);
        console.log(this.enrolementForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditEnrol() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.enrolementForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedEnrol = {
        examen: this.examen.value,
        ecole: this.ecole.value

      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.enrolementService.editEnrol(this.selectedEnrolId, updatedEnrol).subscribe(
        (value: any) => {
          console.log('Enrlement mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.enrolementForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          this.getAllEnrol();
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }


  getAllEnrol() {
    return this.enrolementService.getAllEnrol().subscribe(
      (value: any) => {
        this.enrolements = value;
        console.log(this.enrolements)
      },
      (error: any) => {
        console.log(error.message)
      }
    );
  }

  // I NEED THIS

  getListExamPerEcol(idEcole:number){
    return this.examenService.listExamPerEcol(idEcole).subscribe(
      (value: any) => {
        this.examens = value;
        this.examenSelect.patchValue(value[0].id)
        this.getAllEcolThatAreEnrolled();
        console.log(this.examens)
      },
      (error: any) => {
        console.log(error.message)
      }
    );
  }

  // I NEED THIS

  getAllEcolThatAreEnrolled() {
    return this.enrolementService.getAllEcolThatAreEnrolled(this.examenSelect.value!).subscribe(
      (value: any) => {
        this.enrolements = value;
        console.log(this.enrolements)
      },
      (error: any) => {
        console.log(error.message)
      }
    );
  }


  deleteEnrol(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.enrolementService.deleteEnrol(id).subscribe(
      (value: any) => {
        console.log(value);
        this.getAllEnrol()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveEnrol(enrolement : any) {
    this.activeEnrol={...enrolement}
  }
}
