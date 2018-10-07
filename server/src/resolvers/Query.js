async function feed(parent, args, context, info) {
  const { where, first, skip, orderBy } = args; // destructure input arguments

  const queriedLinks = await context.db.query.links(
    {
      first,
      skip,
      where,
      orderBy
    },
    ` { id } `
  );

  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `;
  const linksConnection = await context.db.query.linksConnection(
    {},
    countSelectionSet
  );

  return {
    count: linksConnection.aggregate.count,
    linkIds: queriedLinks.map(link => link.id)
  };
}

module.exports = {
  feed
};
