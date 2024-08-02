import { Component, OnInit } from '@angular/core';
import { HttpdataService } from '../services/httpdata.service';
import { LoadingController } from '@ionic/angular';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  // estaciones=
  //   [{
  //     id:0,
  //     fecha:'',
  //     temperatura:0,
  //     humedad:0,
  //     velocidad_viento:0,
  //     humedad_suelo:0,
  //     id_estacion:0
  //   }]
  

    estaciones: Estacion[] = [];
  
  isLoading = false;

  dataAPI={
    location:{
      name:'',
      region:''
    },

    current:{
      condition:{
        text:'',
        icon:''
      },
      feelslike_c:0,
      wind_dir:'',
      cloud:0,
      temp_c:'',
      last_updated:'',
      precip_mm:''
      
    },

    forecast:{
      forecastday:[{
        day:{
          daily_chance_of_rain: 0,
          maxtemp_c:0,
          mintemp_c:0,
          condition:{
            text:'',
            icon:''
          }
        },
        astro:{
          sunrise:'',
          sunset:''
        },
        date:'',
        date_epoch:'',
        hour:[{
          temp_c:'',
          chance_of_rain:'',
          precip_mm:'',
          humidity:'',
          wind_dir:'',
          pressure_mb:'',
          dewpoint_c:'',
          wind_kph:''

        }]
      }]
    }
    
  }
  

  constructor(private http: HttpdataService,
    private loadingController: LoadingController,
    ) { }

  // ngOnInit() {
  //   console.log("en OnInit");
    
  //   this.getDashInfo();
  // }

  getDashInfo(){
    // console.log("funcion getDashInfo");
    // this.http.getUReg().subscribe(data=> {
    //     data = JSON.stringify(data);
       
    //      this.estaciones=JSON.parse(data.toString());
         
    //     console.log(data);
    //     console.log(this.estaciones);
        
    //     console.log(this.estaciones['0']);
        
        // for(let i=0;i<this.estaciones.length;i++){
        //   if(this.estaciones[i]['id_estacion']===19 ||this.estaciones[i]['id_estacion']===13 || this.estaciones[i]['id_estacion']===21 ||this.estaciones[i]['id_estacion']=== 24){
        //     console.log("entro a if");
            
        //   }//if

        // }//for
        
      //})
    
  }//dashinfo
  async ngOnInit() {
    console.log("ngon del dash");

  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
        message: 'Obteniendo datos...',
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  mostraruUltimosRegistros(data: any) {
    console.log("en mostrar");
    
    console.log(data['Estaciones']);
    console.log("-------------");
    console.log(data['ultimosRegistros']);  
        
    const estaciones = data['Estaciones'];
    const ultimosRegistros = data['ultimosRegistros'];
    
    for (let i = 0; i < 30; i++) {
        const estacion = estaciones[i];
        const ultimoRegistro = ultimosRegistros[estacion['id']]['0'];
        if (estacion['id'] === 19 || estacion['id'] === 13 || estacion['id'] === 21 || estacion['id'] === 24) {

          this.http.getDataApi(estacion['latitud'], estacion['longitud']).subscribe( data => {
                           
                console.log(data);
                data = JSON.stringify(data);
                this.dataAPI = JSON.parse(data.toString());
                console.log(this.dataAPI.forecast.forecastday[0].astro.sunrise);
                console.log(this.dataAPI.forecast.forecastday[0].astro.sunset);
                console.log(this.dataAPI.location.region);
                
                
                this.estaciones.push(
                  {
                    nombre: estacion['nombre'],
                    departamento: this.dataAPI.location.region,
                   
                    temperatura: Math.round(ultimoRegistro['temperatura']),
                    velocidadViento: ultimoRegistro['velocidad_viento'],
                    humedadAmbiente: Math.round(ultimoRegistro['humedad']),
                    humedadSuelo: Math.round(ultimoRegistro['humedad_suelo']),
                    salidaSol: this.dataAPI.forecast.forecastday[0].astro.sunrise,
                    puestaSol: this.dataAPI.forecast.forecastday[0].astro.sunset
                  }
                );
          });
        }
    }
    this.dismiss();
}

async ionViewDidEnter() {
  
    this.present().then(a => {
      console.log('present');
       this.http.getUReg().subscribe((data) => {
        //console.log(data);
        // data = JSON.stringify(data);
        // JSON.parse(data.toString());
        this.mostraruUltimosRegistros(data);
        // console.log(data);
      },
      
      );
  });
  



}

}



interface Estacion {
  nombre: string;
  departamento: string;
 
  temperatura: number;
  velocidadViento: number;
  humedadAmbiente: number;
  humedadSuelo: number;
  salidaSol: any;
  puestaSol: any;
}