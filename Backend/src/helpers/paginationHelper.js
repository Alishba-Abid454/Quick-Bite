/**
 * Pagination Helper
 * Handles pagination calculations and query building
 */

/**
 * Calculate pagination parameters
 * @param {number} page - Current page (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @param {number} maxLimit - Maximum items per page (default: 100)
 * @returns {object} - { page, limit, skip, take }
 */
const getPaginationParams = (page = 1, limit = 10, maxLimit = 100) => {
  // Parse and validate
  const parsedPage = parseInt(page) || 1;
  let parsedLimit = parseInt(limit) || 10;

  // Ensure limit doesn't exceed max
  if (parsedLimit > maxLimit) {
    parsedLimit = maxLimit;
  }

  // Ensure positive values
  const validPage = Math.max(1, parsedPage);
  const validLimit = Math.max(1, parsedLimit);

  // Calculate skip for MongoDB
  const skip = (validPage - 1) * validLimit;

  return {
    page: validPage,
    limit: validLimit,
    skip,
    take: validLimit,
  };
};

/**
 * Build pagination meta data
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items count
 * @param {string} baseUrl - Base URL for links
 * @param {object} queryParams - Additional query parameters
 * @returns {object} - Pagination metadata
 */
const buildPaginationMeta = (page, limit, total, baseUrl = '', queryParams = {}) => {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  // Build query string for links
  const buildQueryString = (extraParams) => {
    const params = { ...queryParams, ...extraParams };
    const query = Object.entries(params) // Converts object to array of [key, value] pairs
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      //`_` is a convention for "I don't need this variable"
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    return query ? `?${query}` : '';
  };

  const meta = {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrev,
    nextPage: hasNext ? page + 1 : null,
    prevPage: hasPrev ? page - 1 : null,
    from: total > 0 ? (page - 1) * limit + 1 : 0,
    to: total > 0 ? Math.min(page * limit, total) : 0,
  };

  // Add links if baseUrl provided
  if (baseUrl) {
    meta.links = {
      first: `${baseUrl}${buildQueryString({ page: 1, limit })}`,
      last: `${baseUrl}${buildQueryString({ page: totalPages, limit })}`,
      prev: hasPrev ? `${baseUrl}${buildQueryString({ page: page - 1, limit })}` : null,
      next: hasNext ? `${baseUrl}${buildQueryString({ page: page + 1, limit })}` : null,
      current: `${baseUrl}${buildQueryString({ page, limit })}`,
    };
  }

  return meta;
};

/**
 * Build MongoDB pagination query
 * @param {object} query - Mongoose query object
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {object} sort - Sort options
 * @returns {object} - Query with pagination applied
 */
const applyPagination = (query, page = 1, limit = 10, sort = { createdAt: -1 }) => {
  const { skip, take } = getPaginationParams(page, limit);

  return query
    .sort(sort)
    .skip(skip)
    .limit(take);
};

/**
 * Get paginated results with metadata
 * @param {object} model - Mongoose model
 * @param {object} filter - Filter conditions
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {object} sort - Sort options
 * @param {Array} populateFields - Fields to populate
 * @param {object} selectFields - Fields to select
 * @returns {object} - { data, pagination }
 */
const getPaginatedResults = async (
  model,
  filter = {},
  page = 1,
  limit = 10,
  sort = { createdAt: -1 },
  populateFields = [],
  selectFields = null
) => {
  const { skip, take } = getPaginationParams(page, limit);

  // Build query
  let query = model.find(filter);

  // Apply select
  if (selectFields) {
    query = query.select(selectFields);
  }

  // Apply populate
  populateFields.forEach((field) => {
    query = query.populate(field);
  });

  // Apply pagination
  const data = await query
    .sort(sort)
    .skip(skip)
    .limit(take);

  // Get total count
  const total = await model.countDocuments(filter);

  const pagination = buildPaginationMeta(
    parseInt(page),
    parseInt(limit),
    total
  );

  return {
    data,
    pagination,
  };
};

module.exports = {
  getPaginationParams,
  buildPaginationMeta,
  applyPagination,
  getPaginatedResults,
};