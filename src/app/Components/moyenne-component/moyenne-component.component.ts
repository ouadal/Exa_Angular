import { Component, OnInit } from '@angular/core';
import {MoyenneService} from "../../services/moyenne.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import { InscriptionService } from 'src/app/services/inscription.service';
import { ExamenService } from 'src/app/services/examen.service';
import { SessionService } from 'src/app/services/session.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import {AttributionMatiereService} from "../../services/attribution-matiere.service";
import {NoteService} from "../../services/note.service";


@Component({
  selector: 'app-moyenne-component',
  templateUrl: './moyenne-component.component.html',
  styleUrls: ['./moyenne-component.component.css']
})
export class MoyenneComponentComponent implements OnInit {

  moyenneTotale = new FormControl('')
  inscription = new FormControl('')
  examen = new FormControl('')
  session = new FormControl('')
  moyennes : any = []
  inscriptions : any = []
  examens : any = []
  sessions : any = []
  isAdmin = false
  sessionSelect = new FormControl(0)
  examenSelect = new FormControl(0)
  attributMatSelect = new FormControl(0)
  attributMats: any = []
  private confirmDeleteModal: any;
  activeMoy! : any
  selectedMoyId!: number | undefined;

  moyenneForm = new FormGroup({
    moyenneTotale: this.moyenneTotale,
    inscription: this.inscription,
    examen: this.examen,
    session: this.session,






  })

  constructor(private noteService : NoteService,private attMatService : AttributionMatiereService,private toastr: ToastrService ,private authenticationService: AuthenticationService ,private moyenneService : MoyenneService,private inscriptionService : InscriptionService,private examenService : ExamenService, private sessionService : SessionService) { }

  ngOnInit(): void {
    //this.genererMoy(idExamen,idSession)
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
          this.getAllMoy()
        }else {
          let idEcole =value.data[0].informations.id;
          //this.getListExamPerEcol(idEcole)
          this.loadAllTestNumber1(idEcole);
          //this.getAttMatByEcolConn(idEcole)
          //let examenSelect =value.data[0].informations.id;
          //let sessionSelect =value.data[0].informations.id;
          //let attributMatSelect =value.data[0].informations.id;
          //this.findNotePerExamAttribSess(examenSelect,sessionSelect,attributMatSelect)
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }



  reloadDataMat(){
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
          this.getAllMoy()
        }else {
          let idEcole =value.data[0].informations.id;
          this.genererMoy()
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }


  // GENERER MOYENNE //




  loadAllTestNumber1(idEcole:number){
    return this.examenService.listExamPerEcol(idEcole).subscribe(
      (value: any) => {
        this.examens = value;
        this.examenSelect.patchValue(value[0].id)
        this.attMatService.getAttMatByEcolConnAndExamen(idEcole,this.examenSelect.value!).subscribe(
          (value1: any) => {
            this.attributMats = value1;
            this.attributMatSelect.patchValue(value1[0].id)
            console.log(this.attributMats)
            this.sessionService.getAllSession().subscribe(
              (value2: any) => {
                this.sessions = value2;
                this.sessionSelect.patchValue(value2[0].id)
                //this.getAllEcolThatAreEnrolled();
                this.getMoyForAllEcolRang()
                console.log(this.sessions)
              },
              (error: any) => {
                console.log(error.message)
              }
            );
          },
          (error: any) => {
            console.log(error.message)
          }

        );
        //this.getAllEcolThatAreEnrolled();
        console.log(this.examens)
      },
      (error: any) => {
        console.log(error.message)
      }
    );
  }

  genererMoy(){
    return this.moyenneService.genererMoy(this.examenSelect.value!,this.sessionSelect.value!).subscribe(
         (value: any) => {
           this.moyennes = value;
           this.getMoyForAllEcolRang()
           console.log(this.moyennes)
         },
         (error: any) => {
           console.log(error.message)
         } ,(error: any) => {
           console.log(error.message)
         }

       );
  }


  getMoyForAllEcolRang(){
    return this.moyenneService.getMoyForAllEcolRang(this.examenSelect.value!,this.sessionSelect.value!).subscribe(
        (value: any) => {
          this.moyennes = value;
          console.log(this.moyennes)
        },
        (error: any) => {
          console.log(error.message)
        }

      );
  }



  // genererMoyenne(){
  //   return this.moyenneService.genererMoy(idExamen,idSession).subscribe(
  //     (value: any) => {
  //       this.moyennes = value;
  //       console.log(this.moyennes)
  //     },
  //     (error: any) => {
  //       console.log(error.message)
  //     }
  //
  //   );
  //
  // }





  addMoy(){
    var data = {
      moyenneTotale: this.moyenneTotale.value,
      inscription: this.inscription.value,
      examen: this.examen.value,
      session: this.session.value,
    }
    console.log(data)
    this.moyenneService.addMoy(data).subscribe({
      next : (value:any) =>{
        console.log('Cycle ajoutée avec succès !')
        this.getAllMoy()
        this.moyenneForm.reset()

      },
      error:(err)=>{
        console.log(err.message)

      }
    })
  }
  editMoy(id: number | undefined) {
    //@ts-ignore
    this.moyenneService.getMoyById(id).subscribe(
      (moyenne: any) => {
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedMoyId = id;
        this.moyenneTotale.setValue(moyenne.moyenneTotale);
        this.inscription.setValue(moyenne.inscription);
        this.examen.setValue(moyenne.examen);
        this.session.setValue(moyenne.session);
        console.log(this.moyenneForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditMoy() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.moyenneForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedMoy = {
        moyenneTotale: this.moyenneTotale.value,
       inscription: this.inscription.value,
        examen:this.examen.value,
       session: this.session.value,

      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.moyenneService.editMoy(this.selectedMoyId, updatedMoy).subscribe(
        (value: any) => {
          console.log('Moyenne mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.moyenneForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          this.getAllMoy();
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }









  getAllMoy() {
    return this.moyenneService.getAllMoy().subscribe(
      (value: any) => {
        this.moyennes = value;
        console.log(this.moyennes)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  deleteMoy(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.moyenneService.deleteMoy(id).subscribe(
      (value: any) => {
        console.log(value);
        this.getAllMoy()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveMoy(moyenne : any) {
    this.activeMoy={...moyenne}
  }
}

