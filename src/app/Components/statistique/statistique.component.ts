import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
// @ts-ignore
 import {Chart,registerables} from "chart.js";
import {ExamenService} from "../../services/examen.service";
import {EcoleService} from "../../services/ecole.service";
import {MoyenneService} from "../../services/moyenne.service";
import {ToastrService} from "ngx-toastr";
import {AttributionMatiereService} from "../../services/attribution-matiere.service";
import {FormControl} from "@angular/forms";
import {SessionService} from "../../services/session.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

// juste pour afficher le select de session et de examen //
  idExam!: number;
  idSession!: number;
  ecoles : any = []
  see: boolean=false;
  examens : any = []
  moyennes : any = []
  sessions : any = []
  sessionSelect = new FormControl(0)
  examenSelect = new FormControl(0)
  attributMats: any = []
  attributMatSelect = new FormControl(0)
  isAdmin = false;

  constructor( private authenticationService: AuthenticationService,private sessionService : SessionService,private attMatService : AttributionMatiereService ,private examenService:ExamenService,private ecoleService:EcoleService,private moyenneService : MoyenneService,private toastr: ToastrService , ) {
  }


  ngOnInit(): void {
    this.verifiy()
    this.listeDesEcoleAunExam()
    this.renderChart();

    this.reloadData()

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
          this.loadAllTestNumber1(idEcole);
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)}
      })

  }

  renderChart() {
    const myChart = new Chart("CV", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'

          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }




  verifiy(){
    this.see = true;
    //this.genererMoy();
  }

  listeDesEcoleAunExam(){
    return this.ecoleService.listeDesEcolesLorsDunExamen(this.idExam).subscribe(
      (value: any) => {
        this.ecoles = value;
      }, (error: any) => {
        console.log(error.message)
      }
    )
  }

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


  // genererMoy(){
  //   this.see=true
  //   return this.moyenneService.genererMoy(this.idExam,this.idSession).subscribe(
  //     (value: any) => {
  //       this.moyennes = value;
  //       //this.getAllMoyenne();
  //       //this.attribuerMention();
  //       //this.getMoyForAllEcolRang()
  //       this.toastr.success("Calcule éffectué avec succes...", "Succès")
  //       this.see = false;
  //
  //     },
  //     (error: any) => {
  //       console.log(error.message)
  //       this.see = false;
  //     }
  //
  //   );
  // }

  // getAllMoyenne() {
  //   this.moyenneService.getMoyenneAll(this.idExam,this.idSession).subscribe({
  //     next:data =>{
  //       this.moyennes = data;
  //     }
  //   })
  // }


  reloadData() {
    this.examenService.getStatisques(this.idExam,this.idSession).subscribe(

      res =>console.log(res)
      //   let hashMapData = res[''].map((re:any) => re.ecoles);
      //   hashMapData = res[''].map((re:any) => re.ecoles);
      //   hashMapData = res[''].map((re:any) => re.ecoles);
      // }
      // next:(value:any)=>{let hashMapData: any[] = [];
      // value.data.forEach(response:any)=>{
      //   this.labels.push(response.ecoles)
      //     data.push(response.datasets.data)
      //   }}

    )
  }
}
