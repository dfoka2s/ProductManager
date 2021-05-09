import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public products: Product[];
  public updateProduct: Product;
  public deleteProduct: Product;

  constructor(private productService: ProductService) { }

  ngOnInit(){
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getProduct().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProduct(addForm: NgForm): void{
    document.getElementById('add-product-form').click();
    this.productService.addProduct(addForm.value).subscribe(
      (Response: Product) =>{
        console.log(Response);
        this.getProducts();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }

    );
  }

  public onUpdateProduct(product: Product): void{
   
    this.productService.updateProduct(product).subscribe(
      (Response: Product) =>{
        console.log(Response);
        this.getProducts();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }

    );
  }

  public onDeleteProduct(productId: number): void{
   
    this.productService.deleteProduct(productId).subscribe(
      (Response: void) =>{
        console.log(Response);
        this.getProducts();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }

    );
  }

  public searchProduct(key:string) : void{
    const results : Product[] = []
    for(const product of this.products){
      if(product.name.toLowerCase().indexOf(key.toLowerCase() )!== -1
      || product.description.toLowerCase().indexOf(key.toLowerCase() )!== -1) {
        results.push(product);
      }
    }
    this.products = results;
    if(results.length=== 0 || !key){
      this.getProducts();
    }
  }

  public onOpenModal(product: Product, mode: string) : void {
    const container= document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display ='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addProductModal');
    }

    if(mode === 'update'){
      this.updateProduct= product;
      button.setAttribute('data-target', '#updateProductModal');
    }

    if(mode === 'delete'){
      this.deleteProduct= product;
      button.setAttribute('data-target', '#deleteProductModal');
    }

    container.appendChild(button);
    button.click();
  }
}
