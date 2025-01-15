import type { Address } from './';

export interface Client {
    Client_ID: string;
    Client_Status: string;
    Client_RegistrationDate: string;
    Client_Address: Address | null;
    User: string;
}