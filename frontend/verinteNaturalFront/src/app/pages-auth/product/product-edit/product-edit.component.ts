import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../../services/product-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  arrayProductTypes = [];

  currentProduct = {
    name:'',
    description:'',
    product_type_id:'',
    product_is_by_part:''
  };

  editProductForm =  new FormGroup({
    name: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
    product_type_id: new FormControl(null,[Validators.required]),
    product_is_by_part: new FormControl(null,[Validators.required])
  });

  constructor(
    private productTypeService:ProductTypeService,
    private router:Router,
    private route:ActivatedRoute,
    private productService : ProductService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
