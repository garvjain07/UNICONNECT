const paginate = (query) => {
  const page = Math.max(1, Number(query.page) || 1);
<<<<<<< HEAD
  const limit = Math.min(50, Number(query.limit) || 20);
=======
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 20));
>>>>>>> repo2/main
  const sort = query.sort || 'newest';
  return { page, limit, sort };
};

module.exports = { paginate };
