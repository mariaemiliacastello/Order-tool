export class Data{
    public cpforcnpj:string;
    public name:string;
    public CEP:string;
    public product:string;
    public orderNumber:number;
    public orderDate:string;
    public price: number;
    public deliveryDate: string;
    public deliveryFee: number;
    public finalPrice: number;
    public pricewithoutdiscount: number;

    constructor() {
        this.cpforcnpj = "";
        this.name = "";
        this.CEP = "";
        this.product = "";
        this.orderNumber = 0;
        this.orderDate = "";
        this.price = 0;
        this.deliveryDate = ""
        this.deliveryFee = 0;
        this.finalPrice = 0;
        this.pricewithoutdiscount = 0;
    }
}
export class Client{
    public cpforcnpj:string;
    public name:string;


    constructor() {
        this.cpforcnpj = "";
        this.name = "";
    }
} 