class ServerError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
    this.message = message;
  }
}

module.exports = ServerError;
