// ─── Priority Calculation ────────────────────────────────────
// Priority is determined by category urgency and quantity needed.
// Life-critical items (medicine, water) score higher.

const CATEGORY_WEIGHTS = {
  medicine: 5,
  water: 4,
  food: 4,
  shelter: 3,
  clothing: 2,
  other: 1,
};

export function calculatePriority(category, quantityNeeded) {
  const categoryWeight = CATEGORY_WEIGHTS[category] || 1;
  const score = categoryWeight * Math.min(quantityNeeded, 100);

  if (score >= 200) return 'critical';
  if (score >= 100) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

// ─── Resource Gap ────────────────────────────────────────────
// Remaining Requirement = Requested Quantity - Assigned Quantity

export function calculateResourceGap(quantityNeeded, quantityFulfilled) {
  return Math.max(0, quantityNeeded - quantityFulfilled);
}

export function calculateFulfillmentPercentage(quantityNeeded, quantityFulfilled) {
  if (quantityNeeded <= 0) return 100;
  return Math.min(100, Math.round((quantityFulfilled / quantityNeeded) * 100));
}

// ─── Status Determination ────────────────────────────────────
// Unfulfilled: nothing received yet
// Partial: some but not all received
// Fulfilled: all received

export function determineStatus(quantityNeeded, quantityFulfilled) {
  if (quantityFulfilled <= 0) return 'unfulfilled';
  if (quantityFulfilled >= quantityNeeded) return 'fulfilled';
  return 'partial';
}

// ─── Priority Display Config ─────────────────────────────────

export const PRIORITY_CONFIG = {
  critical: { label: 'Critical', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', icon: '🔴' },
  high: { label: 'High', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)', icon: '🟠' },
  medium: { label: 'Medium', color: '#eab308', bg: 'rgba(234, 179, 8, 0.15)', icon: '🟡' },
  low: { label: 'Low', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)', icon: '🟢' },
};

export const STATUS_CONFIG = {
  unfulfilled: { label: 'Unfulfilled', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' },
  partial: { label: 'Partially Fulfilled', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
  fulfilled: { label: 'Fulfilled', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
};

export const CATEGORY_CONFIG = {
  food: { label: 'Food', icon: '🍚', color: '#f59e0b' },
  water: { label: 'Water', icon: '💧', color: '#3b82f6' },
  medicine: { label: 'Medicine', icon: '💊', color: '#ef4444' },
  clothing: { label: 'Clothing', icon: '👕', color: '#8b5cf6' },
  shelter: { label: 'Shelter', icon: '🏠', color: '#06b6d4' },
  other: { label: 'Other', icon: '📦', color: '#6b7280' },
};

// ─── Sri Lankan Districts (flood-prone areas first) ──────────

export const SRI_LANKAN_DISTRICTS = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
  'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
  'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
  'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
  'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya',
];

// ─── Dashboard Stats Aggregation ─────────────────────────────

export function calculateDashboardStats(requests) {
  const total = requests.length;
  const critical = requests.filter(r => r.priority === 'critical').length;
  const fulfilled = requests.filter(r => r.status === 'fulfilled').length;
  const partial = requests.filter(r => r.status === 'partial').length;
  const unfulfilled = requests.filter(r => r.status === 'unfulfilled').length;
  const totalNeeded = requests.reduce((sum, r) => sum + (r.quantity_needed || 0), 0);
  const totalFulfilled = requests.reduce((sum, r) => sum + (r.quantity_fulfilled || 0), 0);

  return {
    total,
    critical,
    fulfilled,
    partial,
    unfulfilled,
    totalNeeded,
    totalFulfilled,
    fulfillmentRate: total > 0 ? Math.round((fulfilled / total) * 100) : 0,
  };
}

// ─── Time Formatting ─────────────────────────────────────────

export function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
