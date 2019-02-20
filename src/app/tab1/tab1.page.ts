import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  frase : any;
  letrasBinary : any;
  registroLog : any;
  fraseArray : any; //Guarda la frase en un array por letra
  auxLog : any; // muestra el resultado en la vista
  auxfrase : any; // muestra el resultado en el destino
  mi_frase : String;
  mi_fraseA : String;
  mi_fraseB : String;
   destino : String;

   constructor() {

      this.letrasBinary = {
         '!' : '100001',
         '"' : '100010',
         '#' : '100011',
         '$' : '100100',
         '%' : '100101',
         '&' : '100110',
         '(' : '101000',
         ')' : '101001',
         '*' : '101010',
         '+' : '101011',
         ',' : '101100',
         '-' : '101101',
         '.' : '101110',
         '/' : '101111',
         '0' : '110000',
         '1' : '110001',
         '2' : '110010',
         '3' : '110011',
         '4' : '110100',
         '5' : '110101',
         '6' : '110110',
         '7' : '110111',
         '8' : '111000',
         '9' : '111001',
         ':' : '111010',
         ';' : '111011',
         '<' : '111100',
         '=' : '111101',
         '>' : '111110',
         '?' : '111111',
         '@' : '1000000',
         'A' : '1000001',
         'B' : '1000010',
         'C' : '1000011',
         'D' : '1000100',
         'E' : '1000101',
         'F' : '1000110',
         'G' : '1000111',
         'H' : '1001000',
         'I' : '1001001',
         'J' : '1001010',
         'K' : '1001011',
         'L' : '1001100',
         'M' : '1001101',
         'N' : '1001110',
         'O' : '1001111',
         'P' : '1010000',
         'Q' : '1010001',
         'R' : '1010010',
         'S' : '1010011',
         'T' : '1010100',
         'U' : '1010101',
         'V' : '1010110',
         'W' : '1010111',
         'X' : '1011000',
         'Y' : '1011001',
         'Z' : '1011010',
         '[' : '1011011',
         ']' : '1011101',
         '^' : '1011110',
         '_' : '1011111',
         '`' : '1100000',
         'a' : '1100001',
         'b' : '1100010',
         'c' : '1100011',
         'd' : '1100100',
         'e' : '1100101',
         'f' : '1100110',
         'g' : '1100111',
         'h' : '1101000',
         'i' : '1101001',
         'j' : '1101010',
         'k' : '1101011',
         'l' : '1101100',
         'm' : '1101101',
         'n' : '1101110',
         'o' : '1101111',
         'p' : '1110000',
         'q' : '1110001',
         'r' : '1110010',
         's' : '1110011',
         't' : '1110100',
         'u' : '1110101',
         'v' : '1110110',
         'w' : '1110111',
         'x' : '1111000',
         'y' : '1111001',
         'z' : '1111010',
         '{' : '1111011',
         '|' : '1111100',
         '}' : '1111101',
         '~' : '1111110',
      }

      this.mi_frase = "1 que le dice una IP a otra? que tramas?";

      console.log("Longitud de la frase: "+this.mi_frase.length);

      let res = this.mi_frase.split(" ");

      this.fraseArray = [];
      res.forEach(element => {   

         for (let index = 0; index < element.length; index++) {

            let letra = element.charAt(index);
            this.fraseArray.push(letra);     
         }     

      });
      
   }

   simulacion(destino){
      
      this.destino = destino;

      this.auxfrase=[];
      //guardar frase escrita en un array
      for (let index = 0; index < this.frase.length; index++) {
         this.auxfrase.push(this.frase.charAt(index));
      }


      this.mi_fraseA = "";
      this.mi_fraseB = "";

      this.registroLog = [];
      let res = this.frase.split(" ");
      let D = 1; //datagrama
      let t = 1; // tramas
      let e = 0; // errores
      let y = 0; // exitos
      let indexLetra = 0;

      res.forEach(element => {   

         this.registroLog.push(" INICIO DataGrama "+D);

         for (let index = 0; index < element.length; index++) {

            let letra = element.charAt(index);
            var binario = this.valorBinario(letra);  
            
            if (this.fraseArray[indexLetra]!=letra) {
               this.registroLog.push(letra+" - D"+D+"P"+index+" -- "+binario+"-----> NK");
               e++;
            }else{
               this.registroLog.push(letra+" - D"+D+"P"+index+" -- "+binario+"-----> YS" );
               y++;
            }
                   
            indexLetra++;
            t++;
         }

         this.registroLog.push(" FIN DataGrama "+D);
         this.registroLog.push("**************************");
         D++;         

      });

      this.registroLog.push(" RESUMEN");
      this.registroLog.push(" Total datagramas "+(D-1));
      this.registroLog.push(" Total tramas "+(t-1));
      this.registroLog.push(" Total exitosos "+y);
      this.registroLog.push(" Total errores "+e);

      //recorre el array de respuesta y lo muestra con un retraso de milisegundos
      for (let j = 0; j < this.registroLog.length; j++) {

         var letra_destino=this.auxfrase[j];

        this.motrarResultado(this.registroLog[j],j,letra_destino);
      }
      
   }
  
   //variable para mostrar resultado en la vista con un retraso de milisegundos
   motrarResultado(res,j,letra){

      this.auxLog = [];
      console.log(this.auxLog);

      setTimeout(() => {
         this.auxLog.push(res);
         console.log(res);

         if (this.destino=="A") {
            if (letra!=undefined) {
               this.mi_fraseA=this.mi_fraseA+letra;
            }
           
         }else if (this.destino=="B") {
            if (letra!=undefined) {
               this.mi_fraseB=this.mi_fraseB+letra;
            }
         }
      },200*(j+1));

   }

   valorBinario(letra_){

      for(var clave in this.letrasBinary) {

         if (clave===letra_) {
            return this.letrasBinary[clave];
         }
      }

      return 0;
   }

}
