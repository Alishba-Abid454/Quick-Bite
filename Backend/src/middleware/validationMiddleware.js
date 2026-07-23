/**
 * Validation Middleware
 * Joi --- Validation library for JavaScript
 * Handles request validation using Joi schemas
 */

const { errorResponse } = require('../helpers/responseHelper');
const { HTTP_STATUS } = require('../utils/constants');

/**
 * Validate request body against a Joi schema
 * @param {Object} schema - Joi validation schema
 * @param {string} source - Request source (body, query, params)
 * @returns {Function} - Middleware function
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      // Get data from request source
      let data;
      switch (source) {
        case 'body':
          data = req.body;
          break;
        case 'query':
          data = req.query;
          break;
        case 'params':
          data = req.params;
          break;
        default:
          data = req.body;
      }

      // Validate against schema
      const { error, value } = schema.validate(data, {
        abortEarly: false, // Return all errors, not just first
        stripUnknown: true, // Remove unknown fields
        errors: {
          wrap: {
            label: '', // Remove quotes around labels
          },
        },
      });

      // If validation fails, return errors
      if (error) {
        const errors = error.details.map((detail) => ({
          field: detail.path.join('.'),
          message: detail.message,
        }));

        return errorResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          'Validation failed',
          errors
        );
      }

      // Replace request data with validated data
      req[source] = value;
/* Before validation:
req.body = {
    name: '  John  ', // Has extra spaces
    email: 'JOHN@EMAIL.COM',
    age: '25' // String instead of number
}
After validation (stripUnknown, sanitize):
req.body = {
    name: 'John', // Trimmed
    email: 'john@email.com', // Lowercase
    age: 25 // Converted to number
}
*/
      next();
    } catch (error) {
      return errorResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        'Validation error',
        error
      );
    }
  };
};

/**
 * Validate request parameters (params, query, body)
 * @param {Object} schemas - Object with schema for each source
 * @returns {Function} - Middleware function
 */
const validateAll = (schemas) => {
  return (req, res, next) => {
    try {
      const errors = [];

      // Validate params
      if (schemas.params) {
        const { error } = schemas.params.validate(req.params, { abortEarly: false });
        if (error) {
          errors.push(...error.details.map(d => ({
            field: `params.${d.path.join('.')}`,
            message: d.message,
          })));
        }
      }

      // Validate query
      if (schemas.query) {
        const { error } = schemas.query.validate(req.query, { abortEarly: false });
        if (error) {
          errors.push(...error.details.map(d => ({
            field: `query.${d.path.join('.')}`,
            message: d.message,
          })));
        }
      }

      // Validate body
      if (schemas.body) {
        const { error, value } = schemas.body.validate(req.body, { abortEarly: false });
        if (error) {
          errors.push(...error.details.map(d => ({
            field: `body.${d.path.join('.')}`,
            message: d.message,
          })));
        } else {
          req.body = value;
        }
      }

      // If errors exist, return them
      if (errors.length > 0) {
        return errorResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          'Validation failed',
          errors
        );
      }

      next();
    } catch (error) {
      return errorResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        'Validation error',
        error
      );
    }
  };
};

/**
 * Sanitize request body (remove dangerous fields)
 * @param {Array} fields - Fields to remove
 * @returns {Function} - Middleware function
 */
const sanitize = (fields = []) => {
  return (req, res, next) => {
    try {
      // Remove sensitive fields from body
      fields.forEach(field => {
        if (req.body && req.body[field]) {
          delete req.body[field];
        }
      });

      // Remove password confirm fields
      if (req.body && req.body.passwordConfirm) {
        delete req.body.passwordConfirm;
      }

      next();
    } catch (error) {
      return errorResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        'Sanitization error',
        error
      );
    }
  };
};
/* Without sanitize:
// User sends extra fields:
{
    name: "John",
    email: "john@email.com",
    password: "MySecret123",
    isAdmin: true, // ← User trying to become admin!
    _id: "fake_id", // ← User trying to change ID!
}
 With sanitize:
const sanitize = ['isAdmin', '_id', 'role'];
// After sanitize:
{
    name: "John",
    email: "john@email.com",
    password: "MySecret123"
}
Dangerous fields removed! */

/**
 * Check if required fields exist
 * @param {Array} fields - Required fields
 * @param {string} source - Request source (body, query, params)
 * @returns {Function} - Middleware function
 */
const requireFields = (fields, source = 'body') => {
  return (req, res, next) => {
    try {
      const data = req[source] || {};
      const missing = fields.filter(field => !data[field]);

      if (missing.length > 0) {
        return errorResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          `Missing required fields: ${missing.join(', ')}`,
          { missing }
        );
      }

      next();
    } catch (error) {
      return errorResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        'Field validation error',
        error
      );
    }
  };
};

/**
 * Pagination validation middleware
 * Adds parsed pagination params to request
 */
const validatePagination = (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));

    req.pagination = {
      page,
      limit,
      skip: (page - 1) * limit,
    };

    next();
  } catch (error) {
    return errorResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Pagination validation error',
      error
    );
  }
};

module.exports = {
  validate,
  validateAll,
  sanitize,
  requireFields,
  validatePagination,
};


/*┌─────────────────────────────────────────────────────────────────┐
│                    REQUEST ARRIVES                             │
│                    POST /api/users                            │
│                    Body: { name: "", email: "invalid" }      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    requireFields()                             │
│  - Check if required fields exist                             │
│  - If missing → 400 Bad Request                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    validate() Middleware                       │
├─────────────────────────────────────────────────────────────────┤
│  1. Get data from source (body, query, params)               │
│  2. Validate against Joi schema                              │
│  3. If errors:                                                │
│     {                                                         │
│       "field": "name", "message": "\"name\" is required"     │
│       "field": "email", "message": "\"email\" must be valid" │
│     }                                                         │
│     422 Unprocessable Entity                                 │
│  4. If valid: replace req.body with validated data          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    sanitize()                                  │
│  - Remove dangerous fields (isAdmin, _id, role)              │
│  - Remove passwordConfirm                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Route Handler                              │
│  - Only clean, validated data reaches here!                  │
│  - Create user safely                                        │
└─────────────────────────────────────────────────────────────────┘ */