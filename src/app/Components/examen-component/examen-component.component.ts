import { Component, OnInit } from '@angular/core';
import {ExamenService} from "../../services/examen.service";
import {FormControl, FormGroup} from "@angular/forms";
import {CycleTypeExamenService} from "../../services/cycle-type-examen.service";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import {EleveService} from "../../services/eleve.service";

@Component({
  selector: 'app-examen-component',
  templateUrl: './examen-component.component.html',
  styleUrls: ['./examen-component.component.css']
})
export class ExamenComponentComponent implements OnInit {

  libele = new FormControl('')
  statut = new FormControl('')
  cycleTypeExamen = new FormControl('')
  annee = new FormControl('')
  ecole = new FormControl('')
  isAdmin : boolean = true
  eleves : any = []
  examens : any = []
  cycleTypeExamens : any = []
  private confirmDeleteModal: any;
  DesactiveExamen! : any
  selectedExamenId!: number | undefined;

  examenForm = new FormGroup({
    libele: this.libele,
    statut: this.statut,
    cycleTypeExamen: this.cycleTypeExamen,
    annee: this.annee,
    ecole: this.ecole

  });
  constructor(private eleveService : EleveService,private examenService : ExamenService,private cycleTypeService:CycleTypeExamenService,private toastr:ToastrService,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
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
          this.getAllExamPourAdmin()
        }else {
          let idExamen =value.data[0].informations.id;
          this.getExamAuCourDuneAnnee(idExamen);
          this.getAllCyclesExam(idExamen);
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }


  getAllExamPourAdmin(){
    return this.examenService.getAllExam().subscribe(
      (value: any) => {
        this.examens = value;
        console.log(this.examens)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }


  getExamAuCourDuneAnnee(idExamen:number) {
    return this.examenService.getExamAuCourDuneAnnee(idExamen).subscribe(
      (value: any) => {
        this.examens = value;
        console.log(this.examens)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  addExam(){
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        var data = {
          libele: this.libele.value,
          statut: false,
          idEcole: value.data[0].informations.id,
          idCycleTypeExamen:this.cycleTypeExamen.value
        }
        console.log(data)
        this.examenService.addExam(data).subscribe({
          next : (value:any) =>{
            console.log('Examen ajoutée avec succès !')
            this.ngOnInit()
            this.examenForm.reset()

          },
          error:(err)=>{
            this.toastr.error(err.message)

          }
        })
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }
  editExam(id: number | undefined) {
    //@ts-ignore
    this.examenService.getExamById(id).subscribe(
      (examen: any) => {
        this.selectedExamenId = id;
        this.libele.setValue(examen.libele);
        console.log(this.examenForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditExam() {
    if (this.examenForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedExam = {
        libele: this.libele.value,
        statut: this.statut.value,
        cycleTypeExamen: this.cycleTypeExamen.value,
        annee: this.annee.value,
        ecole: this.ecole.value

      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.examenService.editExam(this.selectedExamenId, updatedExam).subscribe(
        (value: any) => {
          console.log('Examen mise à jour avec succès !');
          console.log(value)
          this.examenForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          this.ngOnInit();
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }







  getAllExam(id:any) {
    this.examenService.getAllExam().subscribe(
      (value: any) => {
        this.examens = value;
      },
      (error: any) => {
        this.toastr.error(error.message)
      }

    );
  }
  getAllCyclesExam(id:any) {
    return this.cycleTypeService.listtypeExamenPerCycle(id).subscribe(
      (value: any) => {
        this.cycleTypeExamens= value;
        console.log(this.cycleTypeExamens)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  deleteExam(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.examenService.deleteExam(id).subscribe(
      (value: any) => {
        console.log(value);
        this.ngOnInit()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setDesactiveExam(exam : any) {
    this.DesactiveExamen={...exam}
  }


  DesactiverExam(id:number) {
    this.examenService.DesactiverExam(id).subscribe({
      next:(value:any) =>{
        console.log(value)
        this.getAllExam(id)
      },
      error:(err)=>{
        console.log(err.message)
      }

    })
  }

  setActivationExam(exam : any){
  return this.examenService.setActivationExam(exam.id,exam.ecole.id).subscribe(
    (value: any) => {
      console.log(value);
      this.ngOnInit()
    },
    (error: any) => {
      console.log(error.message);
    } )
  }
}


