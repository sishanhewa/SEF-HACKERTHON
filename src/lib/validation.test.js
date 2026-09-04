import { describe, it, expect } from 'vitest';
import { validateDonation, validateVolunteer } from './validation';

describe('Validation - Donation Form', () => {
  it('fails if donor name is empty', () => {
    const data = {
      donor_name: '',
      item_description: 'Rice',
      quantity: 10,
      request_id: '123'
    };
    const { isValid, errors } = validateDonation(data);
    expect(isValid).toBe(false);
    expect(errors.donor_name).toBeDefined();
  });

  it('fails if quantity is less than 1', () => {
    const data = {
      donor_name: 'John',
      item_description: 'Rice',
      quantity: 0,
      request_id: '123'
    };
    const { isValid, errors } = validateDonation(data);
    expect(isValid).toBe(false);
    expect(errors.quantity).toBeDefined();
  });

  it('passes with valid donation data', () => {
    const data = {
      donor_name: 'John Doe',
      item_description: '10kg Rice',
      quantity: 5,
      request_id: 'uuid-123'
    };
    const { isValid, errors } = validateDonation(data);
    expect(isValid).toBe(true);
    expect(Object.keys(errors).length).toBe(0);
  });
});

describe('Validation - Volunteer Form', () => {
  it('validates correct Sri Lankan phone numbers', () => {
    const validData = {
      volunteer_name: 'Jane Doe',
      contact_phone: '0771234567', // Exactly 10 digits starting with 0
      district: 'Colombo',
      availability: 'weekends'
    };
    const { isValid, errors } = validateVolunteer(validData);
    expect(isValid).toBe(true);
    expect(errors.contact_phone).toBeUndefined();
  });

  it('fails if phone number is not 10 digits or does not start with 0', () => {
    const invalidData1 = {
      volunteer_name: 'Jane Doe',
      contact_phone: '771234567', // Missing 0
      district: 'Colombo',
      availability: 'weekends'
    };
    const { isValid: isValid1, errors: errors1 } = validateVolunteer(invalidData1);
    expect(isValid1).toBe(false);
    expect(errors1.contact_phone).toBeDefined();

    const invalidData2 = {
      volunteer_name: 'Jane Doe',
      contact_phone: '07712345678', // 11 digits
      district: 'Colombo',
      availability: 'weekends'
    };
    const { isValid: isValid2, errors: errors2 } = validateVolunteer(invalidData2);
    expect(isValid2).toBe(false);
    expect(errors2.contact_phone).toBeDefined();
  });
});
