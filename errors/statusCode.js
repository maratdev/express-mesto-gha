const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT_ERROR = 409;
const SERVER_ERROR = 500;
const OK = 200;
const CREATED = 201;

const handleResult = (res, data) => {
  res.status(OK).json(data);
};

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  OK,
  UNAUTHORIZED,
  CREATED,
  FORBIDDEN,
  CONFLICT_ERROR,
  handleResult,
};
