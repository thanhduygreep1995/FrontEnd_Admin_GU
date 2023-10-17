export class Product {
   id: number; 
   name: string;
   Model: string;
   price: number;
   stock_quantity: number;
   create_date: string;
   update_date: string;
   Description: string;
   Discount: number;
   discount_price: string;
   status: string;
   constructor(
      id: number,
      name: string,
      Model: string,
      price: number,
      stock_quantity: number,
      create_date: string,
      update_date: string,
      Desciption: string,
      Discount: number,
      discount_price: string,
      status: string,
    ) {
      this.id = id;
      this.name = name;
      this.Model = Model;
      this.price = price;
      this.stock_quantity = stock_quantity;
      this.create_date = create_date;
      this.update_date = update_date;
      this.Description = Desciption;
      this.Discount = Discount;
      this.discount_price = discount_price;
      this.status = status;
    }
}