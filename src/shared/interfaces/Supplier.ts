import type { Address } from './';

export interface Supplier {
    Supplier_ID: string;
    Supplier_Status: string;
    Supplier_CollectionMethod: {
        Supplier_AccountNumber: string;
        Supplier_CardNumber: string;
        Supplier_BankName: string;
        Supplier_NameAccount: string;
    };
    Supplier_Address: Address | null;
    Supplier_RegistrationDate: string;
    User: string;
}