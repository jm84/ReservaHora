import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private data: any;
  constructor(private http: HttpClient) { }
  public getData() {
    return new Promise(( resolve, reject) => {
      this.http.get('assets/translation/' + navigator.language + '.json').subscribe(data => {
        this.data = data;
        resolve(true);
      }, error => {
        console.error('Error al recuperar las traducciones: ' + error);
        reject(true);
      });
    });

  }

  public getTranslate(word: string){
    return this.data[word];
  }

}
