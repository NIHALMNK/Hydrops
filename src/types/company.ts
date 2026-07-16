export interface Company {
  name: string;
  legalName: string;
  foundingYear: number;
  description: string;
  contact: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}
