import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(new JWTAuthGuard())
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProduct(
  @Body('title') producTitle:string,
  @Body('description') productDescription:string,
  @Body('price') productPrice:number, ) {
      console.log(producTitle,productDescription,productPrice,"Firsttt")
    const res= await this.productService.insertProduct(producTitle,productDescription,productPrice);
    return {result:res}
}

    @Get()
   async getAllProducts(){
        const product= await this.productService.getProducts();
        return product
    }

    @Get(':id')
    async getSingleProduct(@Param('id') productId:string){
        const product= await this.productService.getSingleProduct(productId);
        return product
    }
    @Patch(':id')
    async updateProduct(
    @Param('id') productId:string,
    @Body('title') producTitle:string,
    @Body('description') productDescription:string,
    @Body('price') productPrice:number,){
        const product=await this.productService.updateProduct(productId,producTitle,productDescription,productPrice);
        return product
        }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId:string){
       const product= await this.productService.deleteProduct(prodId);
        return product
    }
}
