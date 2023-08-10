import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from "@angular/forms";
import {AttributionMatiereService} from "../../services/attribution-matiere.service";
import {ExamenService} from "../../services/examen.service";
import {AuthenticationService} from "../../services/authentication.service";
import {ToastrService} from "ngx-toastr";
import {EnrolementService} from "../../services/enrolement.service";
import {MatiereService} from "../../services/matiere.service";
import {EcoleService} from "../../services/ecole.service";

@Component({
  selector: 'app-attribution-matiere-component',
  templateUrl: './attribution-matiere-component.component.html',
  styleUrls: ['./attribution-matiere-component.component.css']
})
export class AttributionMatiereComponentComponent implements OnInit {

  coefficient = new FormControl('')
  //annee = new FormControl('')
  matiere = new FormControl('')
  examen = new FormControl('')
  attributMats: any = []
  private confirmDeleteModal: any;
  activeattMat!: any
  selectedAttMatId!: number | undefined;

  enrolements: any = []
  examens: any = []
  examenSelect = new FormControl(0)
  isAdmin = false
  matieres  :any  = []



  mat = new FormControl('')



  attMatForm = new FormGroup({
    coefficient: this.coefficient,
    //annee: this.annee,
    matiere: this.matiere,
    examen: this.examen
  });



  constructor(private ecoleService : EcoleService,private matiereService:MatiereService,private enrolementService: EnrolementService,private attMatService: AttributionMatiereService,private examenService : ExamenService,private authenticationService:AuthenticationService,private toastr:ToastrService) {

  }

  ngOnInit(): void {
    this.getAllMat()
    this.getAllAttMat()
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
          this.getListExamPerEcol(idEcole)
          this.getAttMatByEcolConn(idEcole)
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })

  }



//ce que j'ai utilisé ..//


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



  getAllMat() {
    this.matiereService.getAllMat().subscribe({
      next:(value:any) =>{
        this.matieres = value;
        this.mat.patchValue(value[0].id)
        console.log(this.matieres)
      },
      error:(err)=>{
        console.log(err.message)

      }

    })
  }



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





/// et la fin ///





  addAttMat() {
    var data = {
      coefficient: this.coefficient.value,
      //annee: this.annee.value,
      matiere: {
        id:this.mat.value
      },
      examen: {
        id:this.examenSelect.value
      },
    }
    console.log(data)
    this.attMatService.addAttMAt(data).subscribe({
      next: (value: any) => {
        console.log('att mat ajoutée avec succès !')
        //this.getAllAttMat()
        this.ngOnInit()
        this.attMatForm.reset()

      },
      error: (err: { message: any; }) => {
        console.log(err.message);

      }
    })
  }

  editAttMat(id: number | undefined) {
    //@ts-ignore
    this.attMatService.getAttMatById(id).subscribe(
      (attMat: any) => {
        console.log(attMat.examen.id)
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedAttMatId = id;
        this.coefficient.setValue(attMat.coefficient);
        this.examenSelect.setValue(attMat.examen.id) ;
        console.log(this.examenSelect.value)
        this.mat.setValue( attMat.matiere.id) ;

        console.log(this.attMatForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditAttMat() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.attMatForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedattMat = {
        coefficient: this.coefficient.value,
       // annee: this.annee.value,
        examen: {id : this.examenSelect.value},
        matiere: {id :this.mat.value},

      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.attMatService.editAttMat(this.selectedAttMatId, updatedattMat).subscribe(
        (value: any) => {
          console.log('attri Mat mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.attMatForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          //this.getAllAttMat();
          this.ngOnInit();
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }



  getAttMatByEcolConn(id:number){
    return this.attMatService.getAttMatByEcolConn(id).subscribe(
      (value: any) => {
        this.attributMats = value;
        console.log(this.attributMats)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }



  getAllAttMat() {
    return this.attMatService.getAllAttMat().subscribe(
      (value: any) => {
        this.attributMats = value;
        console.log(this.attributMats)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  deleteAttMat(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.attMatService.deleteAttMat(id).subscribe(
      (value: any) => {
        console.log(value);
        this.getAllAttMat()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveattMat(attMat : any) {
    this.activeattMat={...attMat}
  }
}


