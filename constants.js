const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const OK = 200;
const CREATED = 201;

const handleError = (res, err) => {
  res.status(SERVER_ERROR).send({ message: `Произошла ошибка: ${err.message}` });
};

const handleResult = (res, data) => {
  res.status(OK).json(data);
};

module.exports = {
  BAD_REQUEST, NOT_FOUND, SERVER_ERROR, OK, CREATED, handleError, handleResult,
};
