export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }

  static notFound(message: string): ApiError {
    return new ApiError(404, message);
  }

  static badRequest(message: string): ApiError {
    return new ApiError(400, message);
  }

  static internal(message: string): ApiError {
    return new ApiError(500, message);
  }
}
