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

  return { edges: collaborations };
};
