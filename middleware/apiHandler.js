import ApiResponse from "../utils/apiResponse.js";

export const apiHandler = (response, req, res, next) => {
  if (response instanceof ApiResponse) {
    const status = response.status || (response.isSuccess ? 200 : 400);
    const payload = response.isSuccess
      ? { isSuccess: true, data: response.data }
      : { isSuccess: false, error: response.error };
    res.status(status).json(payload);
  } else {
    next(response);
  }
};
