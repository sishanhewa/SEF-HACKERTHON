import { describe, it, expect } from 'vitest';
import { calculatePriority, calculateResourceGap, calculateFulfillmentPercentage, determineStatus } from './helpers';

describe('Helpers - Priority Calculation', () => {
  it('assigns critical priority for high quantity medicine', () => {
    // category_weight: medicine=5. score = 5 * min(50, 100) = 250 -> critical (>=200)
    expect(calculatePriority('medicine', 50)).toBe('critical');
  });

  it('assigns high priority for moderate water requests', () => {
    // category_weight: water=4. score = 4 * 30 = 120 -> high (>=100)
    expect(calculatePriority('water', 30)).toBe('high');
  });

  it('assigns low priority for small other requests', () => {
    // category_weight: other=1. score = 1 * 10 = 10 -> low (<40)
    expect(calculatePriority('other', 10)).toBe('low');
  });
});

describe('Helpers - Math and Status calculations', () => {
  it('calculates the resource gap correctly', () => {
    expect(calculateResourceGap(100, 40)).toBe(60);
    expect(calculateResourceGap(100, 120)).toBe(0); // Cannot be negative
  });

  it('calculates fulfillment percentage', () => {
    expect(calculateFulfillmentPercentage(100, 25)).toBe(25);
    expect(calculateFulfillmentPercentage(200, 100)).toBe(50);
    expect(calculateFulfillmentPercentage(100, 150)).toBe(100); // Caps at 100
  });

  it('determines request status based on fulfillment', () => {
    expect(determineStatus(100, 0)).toBe('unfulfilled');
    expect(determineStatus(100, 50)).toBe('partial');
    expect(determineStatus(100, 100)).toBe('fulfilled');
    expect(determineStatus(100, 120)).toBe('fulfilled');
  });
});
