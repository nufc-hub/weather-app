class ErrorHandler {
  constructor(errorElement) {
    // Get the error message element.
    this.errorElement = document.getElementById(errorElement);
  }

  // Function for displaying error message.
  displayError(errorMessage) {
    // Set the error message element text content.
    this.errorElement.textContent = errorMessage;
  }

  // Function for clearing the error message.
  clearError() {
    this.errorElement.textContent = '';
  }
}

export default ErrorHandler;
