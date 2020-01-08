const db = require('../models');
const { base64Decode, base64Encode } = require('../services');

exports.id = object => object.id;

exports.name = object => object.name;

exports.user = object => object.getUser();

const determineWhere = after => {
  if (!after) return;
  const { gt } = db.sequelize.Op;
  const createdAt = base64Decode(after);
  return { createdAt: { [gt]: createdAt } };
};

exports.collaboratorsConnection = async (object, args) => {
  const direction = args.orderBy ? args.orderBy.direction : 'ASC';

  const collaborations = await object.getCollaborations({
    limit: args.first,
    order: [['createdAt', direction]],
    where: determineWhere(args.after),
  });

  const collaborators = await Promise.all(
    collaborations.map(collaboration => collaboration.getUser()),
  );

  const pageInfo = {};
  if (collaborations.length) {
    const lastCollaboration = collaborations[collaborations.length - 1];
    pageInfo.endCursor = base64Encode(lastCollaboration.joinedAt.toISOString());
  }

  return { collaborators, edges: collaborations, pageInfo };
};
