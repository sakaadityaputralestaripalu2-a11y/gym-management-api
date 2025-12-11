function parsePagination(query) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy || 'createdAt';
  const order = (query.order || 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc';
  const search = query.search || null;
  return { page, limit, skip, sortBy, order, search };
}

function buildListResponse({ success = true, message = '', data = [], totalRecords = 0, page = 1, limit = 10 }) {
  return {
    success,
    message,
    data,
    pagination: {
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      limit
    }
  };
}

module.exports = { parsePagination, buildListResponse };
