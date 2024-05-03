class HttpError extends Error {
  constructor(message, httpCode) {
    super(message);
    this.code = httpCode;
  }
}

class Car {
  constructor(brand) {
    this.carName = brand;
  }
  get cnam() {
    return this.carName;
  }
  set cnam(x) {
    this.carName = x;
  }
}

module.exports = { HttpError, Car };
