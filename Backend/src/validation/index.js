class ValidationError extends Error {
  constructor(message, details = []) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
    this.details = details;
  }
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function asStringArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function collect(errors, condition, message) {
  if (condition) errors.push(message);
}

function assertValid(errors, label = 'Validation failed') {
  if (errors.length > 0) {
    throw new ValidationError(label, errors);
  }
}

function validateProject(payload = {}) {
  const errors = [];
  collect(errors, !isNonEmptyString(payload.title), 'title is required');
  collect(errors, !isNonEmptyString(payload.description), 'description is required');

  const tech = asStringArray(payload.tech || payload.tags);
  collect(errors, tech.length === 0, 'tech must include at least one technology');

  if (payload.metrics != null && !Array.isArray(payload.metrics)) {
    errors.push('metrics must be an array');
  }
  if (payload.links != null && typeof payload.links !== 'object') {
    errors.push('links must be an object');
  }
  if (payload.published != null && typeof payload.published !== 'boolean') {
    errors.push('published must be a boolean');
  }

  assertValid(errors, 'Invalid project payload');
  return true;
}

function validateBlog(payload = {}) {
  const errors = [];
  collect(errors, !isNonEmptyString(payload.title), 'title is required');
  collect(
    errors,
    !isNonEmptyString(payload.content) && !isNonEmptyString(payload.excerpt),
    'content or excerpt is required'
  );
  if (payload.tags != null && !Array.isArray(payload.tags) && typeof payload.tags !== 'string') {
    errors.push('tags must be an array or comma-separated string');
  }
  if (payload.published != null && typeof payload.published !== 'boolean') {
    errors.push('published must be a boolean');
  }
  assertValid(errors, 'Invalid blog payload');
  return true;
}

function validateSkill(payload = {}) {
  const errors = [];
  collect(errors, !isNonEmptyString(payload.title), 'title is required');
  const skills = asStringArray(payload.skills);
  collect(errors, skills.length === 0, 'skills must include at least one skill');
  if (payload.published != null && typeof payload.published !== 'boolean') {
    errors.push('published must be a boolean');
  }
  assertValid(errors, 'Invalid skill category payload');
  return true;
}

function validateExperience(payload = {}) {
  const errors = [];
  collect(errors, !isNonEmptyString(payload.role), 'role is required');
  collect(errors, !isNonEmptyString(payload.company), 'company is required');
  collect(errors, !isNonEmptyString(payload.location), 'location is required');
  collect(errors, !isNonEmptyString(payload.startDate), 'startDate is required');

  if (payload.endDate != null && payload.endDate !== '' && !isNonEmptyString(payload.endDate)) {
    errors.push('endDate must be a string or null');
  }
  if (payload.concurrent != null && typeof payload.concurrent !== 'boolean') {
    errors.push('concurrent must be a boolean');
  }

  const bullets = asStringArray(payload.bullets);
  collect(errors, bullets.length === 0, 'bullets must include at least one item');

  if (payload.order != null && Number.isNaN(Number(payload.order))) {
    errors.push('order must be a number');
  }
  if (payload.published != null && typeof payload.published !== 'boolean') {
    errors.push('published must be a boolean');
  }

  assertValid(errors, 'Invalid experience payload');
  return true;
}

/** Soft checks for admin dashboard warnings (do not block save). */
function getProjectWarnings(doc = {}) {
  const warnings = [];
  const tech = asStringArray(doc.tech || doc.tags);
  if (tech.length === 0) warnings.push('missing tech stack');
  if (!isNonEmptyString(doc.description)) warnings.push('missing description');
  if (doc.published && (!Array.isArray(doc.metrics) || doc.metrics.length === 0)) {
    warnings.push('published without metrics');
  }
  return warnings;
}

function getExperienceWarnings(doc = {}) {
  const warnings = [];
  if (!isNonEmptyString(doc.role)) warnings.push('missing role');
  if (!isNonEmptyString(doc.company)) warnings.push('missing company');
  if (!Array.isArray(doc.bullets) || doc.bullets.length === 0) warnings.push('missing bullets');
  return warnings;
}

module.exports = {
  ValidationError,
  asStringArray,
  isNonEmptyString,
  validateProject,
  validateBlog,
  validateSkill,
  validateExperience,
  getProjectWarnings,
  getExperienceWarnings,
};
