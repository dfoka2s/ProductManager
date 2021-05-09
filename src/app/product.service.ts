import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


    public getProduct(): Observable<Product[]> { 
        return this.http.get<Product[]>(`${this.apiServiceUrl}/product/all`);
    }

    public addProduct(product: Product): Observable<Product> { 
        return this.http.post<Product>(`${this.apiServiceUrl}/product/add`, product);
    }

    public updateProduct(product: Product): Observable<Product> { 
        return this.http.put<Product>(`${this.apiServiceUrl}/product/update`, product);
    }

    public deleteProduct(productID: number): Observable<void> { 
        return this.http.delete<void>(`${this.apiServiceUrl}/product/delete/${productID}`);
    }
}
