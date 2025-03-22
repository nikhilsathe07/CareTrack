// src/types/medication.ts
export interface Medication {
    id: string;
    name: string;
    dosage: string;
    nextDose: string;
    refillsLeft: number;
    expirationDate: string;
  }