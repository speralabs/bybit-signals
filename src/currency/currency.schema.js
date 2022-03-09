// import validator class
const joi = require('joi');

// add object schema
module.exports.addOneRecord = joi.object().keys({
  symbol: joi.string().valid(['BTCUSDT']).required(),
});

// update object schema
module.exports.updateOneRecord = joi.object().keys({
  _id: joi.string().required(),
  symbol: joi.string().valid(['BTCUSDT']),
  rand_id: joi.number(),
});
