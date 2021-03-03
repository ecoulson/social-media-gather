export default class APIError {
  constructor(message) {
    this.message = message;
  }

  data() {
    return {
      metadata: {
        success: false,
        type: "Error",
      },
      data: {
        message: this.message,
      },
    };
  }
}
