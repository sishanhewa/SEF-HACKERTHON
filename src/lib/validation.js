// ─── Validation Rules ────────────────────────────────────────

export function validateAidRequest(formData) {
  const errors = {};

  // Victim name
  if (!formData.victim_name || formData.victim_name.trim().length < 2) {
    errors.victim_name = 'Please enter your full name (at least 2 characters)';
  }

  // Contact phone — Sri Lankan format (10 digits starting with 0)
  if (!formData.contact_phone || formData.contact_phone.trim() === '') {
    errors.contact_phone = 'Please enter a contact phone number';
  } else {
    const phone = formData.contact_phone.replace(/[\s-]/g, '');
    const sriLankanPhone = /^0\d{9}$/;
    if (!sriLankanPhone.test(phone)) {
      errors.contact_phone = 'Please enter a valid 10-digit Sri Lankan phone number (e.g. 0771234567)';
    }
  }

  // District
  if (!formData.district || formData.district === '') {
    errors.district = 'Please select your district';
  }

  // Location description
  if (!formData.location_description || formData.location_description.trim().length < 5) {
    errors.location_description = 'Please describe your location (at least 5 characters)';
  }
  
  // Map coordinates
  if (!formData.latitude || !formData.longitude) {
    errors.coordinates = 'Please select your location on the map';
  }

  // Category
  if (!formData.category || formData.category === '') {
    errors.category = 'Please select the type of aid you need';
  }

  // Item description
  if (!formData.item_description || formData.item_description.trim().length < 3) {
    errors.item_description = 'Please describe what you need (at least 3 characters)';
  }

  // Quantity
  if (!formData.quantity_needed || formData.quantity_needed <= 0) {
    errors.quantity_needed = 'Please enter a valid quantity (must be greater than 0)';
  } else if (!Number.isInteger(Number(formData.quantity_needed))) {
    errors.quantity_needed = 'Quantity must be a whole number';
  } else if (formData.quantity_needed > 10000) {
    errors.quantity_needed = 'Quantity cannot exceed 10,000 units';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateDonation(formData) {
  const errors = {};

  if (!formData.donor_name || formData.donor_name.trim().length < 2) {
    errors.donor_name = 'Please enter your name';
  }
  if (!formData.request_id) {
    errors.request_id = 'Please select an aid request';
  }
  if (!formData.item_description || formData.item_description.trim().length < 3) {
    errors.item_description = 'Please describe what you are donating';
  }
  if (!formData.quantity || formData.quantity <= 0) {
    errors.quantity = 'Please enter a valid quantity';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateVolunteer(formData) {
  const errors = {};

  if (!formData.volunteer_name || formData.volunteer_name.trim().length < 2) {
    errors.volunteer_name = 'Please enter your name';
  }
  
  if (formData.contact_phone && formData.contact_phone.trim() !== '') {
    const phone = formData.contact_phone.replace(/[\s-]/g, '');
    const sriLankanPhone = /^0\d{9}$/;
    if (!sriLankanPhone.test(phone)) {
      errors.contact_phone = 'Please enter a valid 10-digit Sri Lankan phone number (e.g. 0771234567)';
    }
  }

  if (!formData.district || formData.district === '') {
    errors.district = 'Please select your district';
  }
  if (!formData.availability || formData.availability === '') {
    errors.availability = 'Please select your availability';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
