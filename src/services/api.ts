// src/services/api.ts
import { Medication } from '../types/medication';

const MEDICATIONS_KEY = 'medications';
const RENEWAL_REQUESTS_KEY = 'renewalRequests';

interface RenewalRequest {
  id: string;
  medicationId: string;
  medicationName: string;
  requestedAt: string;
}

const getStoredMedications = (): Medication[] => {
  const stored = localStorage.getItem(MEDICATIONS_KEY);
  return stored ? JSON.parse(stored) : [
    { id: '1', name: 'Aspirin', dosage: '1 pill', nextDose: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), refillsLeft: 2, expirationDate: '2025-06-01' },
    { id: '2', name: 'Ibuprofen', dosage: '2 pills', nextDose: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), refillsLeft: 0, expirationDate: '2025-04-01' },
  ];
};

const getStoredRenewalRequests = (): RenewalRequest[] => {
  const stored = localStorage.getItem(RENEWAL_REQUESTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

let medications: Medication[] = getStoredMedications();
let renewalRequests: RenewalRequest[] = getStoredRenewalRequests();

const saveMedications = () => {
  localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(medications));
};

const saveRenewalRequests = () => {
  localStorage.setItem(RENEWAL_REQUESTS_KEY, JSON.stringify(renewalRequests));
};

export const fetchMedications = async (): Promise<Medication[]> => {
  return medications;
};

export const addMedication = async (med: Omit<Medication, 'id'>): Promise<Medication> => {
  const newMed = { ...med, id: Date.now().toString() };
  medications.push(newMed);
  saveMedications();
  return newMed;
};

export const updateMedication = async (id: string, updatedMed: Partial<Medication>): Promise<Medication> => {
  const index = medications.findIndex((m) => m.id === id);
  if (index === -1) throw new Error('Medication not found');
  medications[index] = { ...medications[index], ...updatedMed };
  saveMedications();
  return medications[index];
};

export const deleteMedication = async (id: string): Promise<void> => {
  medications = medications.filter((m) => m.id !== id);
  saveMedications();
};

export const requestRenewal = async (medicationId: string): Promise<void> => {
  const med = medications.find((m) => m.id === medicationId);
  if (!med) throw new Error('Medication not found');
  renewalRequests.push({
    id: Date.now().toString(),
    medicationId,
    medicationName: med.name,
    requestedAt: new Date().toISOString(),
  });
  saveRenewalRequests();
};

export const fetchRenewalRequests = async (): Promise<RenewalRequest[]> => {
  return renewalRequests;
};

export const deleteRenewalRequest = async (id: string): Promise<void> => {
  renewalRequests = renewalRequests.filter((r) => r.id !== id);
  saveRenewalRequests();
};