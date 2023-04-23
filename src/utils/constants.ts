const node = Object.freeze({
  EMPLOYEE: "EMPLOYEE",
  COMPANY: "COMPANY",
});

const relationship = Object.freeze({
  WORKS_FOR: "WORKS_FOR",
  COLLEAGUE: "COLLEAGUE",
});

const code = Object.freeze({
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  BAD_REQUEST_400: 400,
  UNAUTHORIZED_401: 401,
  FORBIDDEN_403: 403,
  NOT_FOUND_404: 404,
  INTERNAL_SERVER_ERROR_500: 500,
});

export { node, relationship, code };
