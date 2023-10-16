const Contact = require("../models/contactModel");

exports.getContacts = async (filter, user) => {
  const { _id: owner } = user;

  const findOptions = filter.favorite
    ? { owner, favorite: filter.favorite }
    : { owner };

  const paginationPage = filter.page ? +filter.page : 1;
  const paginationLimit = filter.limit ? +filter.limit : 20;
  const docsToSkip = (paginationPage - 1) * paginationLimit;

  const result = await Contact.find(findOptions)
    .populate("owner", "email")
    .skip(docsToSkip)
    .limit(paginationLimit);

  return result;
};
