export class Product {
   id: number; 
   name: any;
   Model: any;
   price: any;
   stock_quantity: any;
   create_date: any;
   update_date: any;
   Description: any;
   Discount: any;
   discount_price: any;
   status: any;
   constructor(
      id: number,
      name: any,
      Model: any,
      price: any,
      stock_quantity: any,
      create_date: any,
      update_date: any,
      Desciption: any,
      Discount: any,
      discount_price: any,
      status: any,
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

  // Setter cho id (number)

  // Setter cho name (string)
  set Name(value: any) {
    this.name = value;
  }

  // Setter cho Model (string)
  set model(value: string) {
    this.model = value;
  }

  // Setter cho price (number)
  set Price(value: number) {
    this.price = value;
  }

  // Setter cho stock quantity (number)
  set Stock_quantity(value: number) {
    this.stock_quantity = value;
  }

  // Setter cho create date (Date)
  set Create_date(value: Date) {
    this.create_date = value;
  }

  // Setter cho update_date (Date)
  set Update_date(value: Date) {
    this.update_date = value;
  }

  // Setter cho Description (string)
  set description(value: string) {
    this.description = value;
  }

  // Setter cho Discount (number)
  set discount(value: number) {
    this.discount = value;
  }

  // Setter cho discount_price (number)
  set Discount_price(value: number) {
    this.discount_price = value;
  }

  // Setter cho status (string)
  set Status(value: string) {
    this.status = value;
  }
}
