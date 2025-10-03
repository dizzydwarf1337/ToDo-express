class ApiResponse {
  constructor({ isSuccess = true, status = 200, data = null, error = null }) {
    this.isSuccess = isSuccess;
    this.status = status;
    this.data = data;
    this.error = error;
  }

  static Failure(status, error) {
    return new ApiResponse({ isSuccess: false, status, error });
  }

  static Success(status, data) {
    return new ApiResponse({ isSuccess: true, status, data });
  }
}

export default ApiResponse;
