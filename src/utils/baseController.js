class BaseController {
  success(res, data = [], message = "success", httpStatus = 200) {
    res.status(httpStatus).send({
      message,
      data,
    });
  }

  error(res, error,message) {
    res.status(error.code || 400).json({
      status: "error",
      message,
    });
  }
}

module.exports = new BaseController();
