import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpdataService } from '../services/httpdata.service';
import { LoadingController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-consulta-datos',
  templateUrl: './consulta-datos.page.html',
  styleUrls: ['./consulta-datos.page.scss'],
})
export class ConsultaDatosPage implements OnInit {
  isLoading = false;
  id: number;
  paramsSubscription: Subscription;

  estaciones1: Estacion[] = [];

  salidaSol: string;
  puestaSol: string;

  estacion=[{
    id:0,
    fecha:'',
    luz:0,
    temperatura:0,
    humedad:0,
    humedad_suelo:0,
    velocidad_viento:0,


  }]

  estaciones={
    id:0,
    nombre:'',
    ubicacion:'',
    depto:''
  }
  
  tempertatura: number;
  velocidadViento: number;
  humedadAmbiente: number;
  humedadSuelo: number;
  nombreEstacion: string;
  departamento: string;
  municipio: string;
  descripcionMunicipio: string;
  registrosGraficoViento: any[] = [];
  leyenda: string;
  loading: any;

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
  
      // const temperatura: number = data['ultimoRegistro']['0']['TE

estacionSubscription: Subscription;

  constructor(private http: HttpdataService,private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController, private router: Router

  ) { }

  ngOnInit() {
    console.log('ng on init');
      
   
      this.present().then(a => {
                console.log('presented');
                this.paramsSubscription = this.activatedRoute.params.subscribe(params => {
                console.log(params);
                this.id = params['id'];
                
                this.obtenerDatosEstacion(params['id']);
            });
        });
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

  async obtenerDatosEstacion(id: number){
    console.log("id"+id);

    this.estacionSubscription=this.http.consulta(id).subscribe(data=>{
      data = JSON.stringify(data);
        this.estacion = JSON.parse(data.toString());        
         //console.log(this.estacion[0]); 
      
    })

    this.http.getDataEst(id).subscribe(
      (data) => {
        data = JSON.stringify(data);
        this.estaciones = JSON.parse(data.toString());
         console.log(this.estaciones); 
        })

        


    //this.dismiss();
  }

  mostraruUltimosRegistros(data: any,id: number) {
    console.log("en mostrar");
    
    console.log(id);
    console.log("-------------");
    console.log(data['ultimosRegistros']);  
        
    const estaciones1 = data['Estaciones'];
    const ultimosRegistros = data['ultimosRegistros'];
    
    for (let i = 0; i < 30; i++) {
     
        const estacion = estaciones1[i];
        const ultimoRegistro = ultimosRegistros[estacion['id']]['0'];
        if (estacion['id'] == id) {
          console.log("en if?");
          

          this.http.getDataApi(estacion['latitud'], estacion['longitud']).subscribe( data => {
                           
                console.log(data);
                data = JSON.stringify(data);
                this.dataAPI = JSON.parse(data.toString());
                console.log(this.dataAPI.forecast.forecastday[0].astro.sunrise);
                console.log(this.dataAPI.forecast.forecastday[0].astro.sunset);
                console.log(this.dataAPI.location.region);
                this.salidaSol=this.dataAPI.forecast.forecastday[0].astro.sunrise;
                this.puestaSol=this.dataAPI.forecast.forecastday[0].astro.sunset;
                
                
                this.estaciones1.push(
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
  
    
      console.log('present');
       this.http.getUReg().subscribe((data) => {
        //console.log(data);
        // data = JSON.stringify(data);
        // JSON.parse(data.toString());
        this.mostraruUltimosRegistros(data,this.id);
        // console.log(data);
      },
      
      );
  
  

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