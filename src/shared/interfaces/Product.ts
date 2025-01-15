import type { meta } from ".";

export interface DataProducts {
    data: Product[];
    meta: meta;
}

export interface DataProduct {
    data: Product;
    message: string;
}


export interface Product {
    Product_ID:                         string;
    Product_Category:                   string;
    Product_Name:                       string;
    Product_Tags:                       string[]|null;
    Product_Images:                     string[];
    Product_Description:                string;
    Product_Availability:               boolean;
    Product_Stock:                      number;
    Product_Ratings:                    ProductRaiting[]|null;
    Product_PromoCodes:                 ProductPromoCode[]|null;
    Product_ShippingMethods:            null;
    Product_PaymentMethodsAvailable:    ProductPaymentMethodsAvailable[];
    Product_SupplierID:                 string;
    Product_Slug:                       string;
}

export interface ProductPaymentMethodsAvailable {
    Product_PaymentMethod:      string;
    Product_DiscountAvailable:  boolean;
    Product_Price:              number;
    Product_Discount:           number;
}

export interface ProductRaiting {
    Product_ClientID:   string;
    Product_Rating:   number;
}

export interface ProductPromoCode{
    Product_PromoCode:  string;
    Product_Discount:   number;
}