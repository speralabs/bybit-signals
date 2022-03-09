// import validator class
const joi = require('joi');
// import json web token library
const jwt = require('jsonwebtoken');
// import json web token secret
const formidable = require('formidable');
const fileConfig = require('../config/fileConfig');
const { secret } = require('../config');
// import response class
const response = require('../services/responseService');
// import permission class
const permission = require('../services/accessMapper');

// import formidable

// validate token
const getTokenFromHeader = (req) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

/**
 * validate the API request body according to the schema defined and validate the token
 * @returns validation Status
 * @param {*} schema , header tokens
 */
module.exports.validateBodyWithToken = (schema, grantedArray) => {
  return (req, res, next) => {
    try {
      // validate the API request body according to the schema defined
      joi.validate(req.body, schema);

      // verify token and check the expiration time.
      const decoded = jwt.verify(getTokenFromHeader(req), secret);
      permission.validity(decoded.role, granted_array);
      next();
    } catch (error) {
      return response.customError(error, res);
    }

    // verify token and check the expiration time.
    jwt.verify(getTokenFromHeader(req), secret, async (err, decoded) => {
      if (err) {
        return response.customError('Invalid Token', res);
      }
      try {
        const output = await permission.validity(decoded.role, grantedArray);
        next();
        return output;
      } catch (error) {
        return response.customError(error, res);
      }
    });
    return result;
  };
};

/**
 * Validate the query parameters in the API request
 * @param schema
 * @returns {Function}
 */
module.exports.validateQueryParameters = (schema) => {
  return (req, res, next) => {
    try {
      // Validate the API request's query parameters according to the schema defined
      joi.validate(req.query, schema);
      next();
    } catch {
      return response.customError(result.error.details[0].message, res);
    }
    next();
    return result;
  };
};

/**
 * validate the API request body according to the schema defined
 * @returns validation Status
 * @param {*} schema
 */
module.exports.validateBody = (schema) => {
  return (req, res, next) => {
    let result;
    try {
      // validate the API request body according to the schema defined
      result = joi.validate(req.body, schema);
    } catch {
      return response.customError(result.error.details[0].message, res);
    }
    next();
    return result;
  };
};
/**
 * validate the API request header
 * @returns validation Status
 * @param grantedArray
 */
module.exports.validateHeader = (grantedArray) => {
  return (req, res, next) => {
    // eslint-disable-next-line consistent-return
    return jwt.verify(getTokenFromHeader(req), secret, async (err, decoded) => {
      if (err) {
        return response.customError('Invalid Token', res);
      }
      try {
        await permission.validity(decoded.role, grantedArray);
        next();
      } catch (error) {
        return response.customError(error, res);
      }
    });
  };
};

/**
 * validate form data
 * @returns validation Status
 * @param {*} schema
 */
module.exports.validateFormData = (schema) => async (req, res, next) => {
  const form = formidable({
    maxFileSize: fileConfig.maxFileSize,
  });
  const formFields = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return response.customError(`${err}`, res);
      }

      resolve({ fields, files });
      return null;
    });
  });

  const data = {
    ...formFields.fields,
    ...formFields.files,
  };

  Object.entries(data).forEach((entry) => {
    const key = entry[0];
    try {
      data[key] = JSON.parse(data[key]);
    } catch (error) {
      // continue regardless of error
    }
  });

  const result = schema.validate(data);

  if (result.error) {
    return response.customError(result.error.details[0].message, res);
  }
  req.body = data;
  next();
  return null;
};

/**
 * Validate route parameters
 * @param schema
 * @returns {function(...[*]=)}
 */
module.exports.validateRouteParameters = function (schema) {
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    const result = schema.validate(req.params);
    if (result.error) {
      return response.customError(result.error.details[0].message, res);
    }

    next();
  };
};
