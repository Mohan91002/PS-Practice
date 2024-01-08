import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PropertyService {

  constructor(private http: HttpClient) { }

  addListing(data: any) {
    return this.http.post('http://localhost:3000/properties', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAllProperty() {
    return this.http.get('http://localhost:3000/properties')
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateProperty(data: any, id: number) {
    return this.http.put('http://localhost:3000/properties' + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteProperty(id: number) {
    return this.http.delete('http://localhost:3000/properties' + id)
      .pipe(map((res: any) => {

      }))
  }
}
