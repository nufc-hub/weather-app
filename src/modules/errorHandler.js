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

  // Function for handling the errors.
  handleErrors(error) {
    if (error.message === 'No data found for the provided query') {
      // Error message user receives.
      this.displayError(
        `No weather data found for that city. Please try another.`
      );
      // Console error message.
      console.error(`TypeError occurred: ${error.message}`);
    }
    if (error instanceof TypeError) {
      // Error message user receives.
      this.displayError(`Oops! Something went wrong. We're on it!`);
      // Console error message.
      console.error(`TypeError occurred: ${error.message}`);
    } else if (error instanceof SyntaxError) {
      // Error message user receives.
      this.displayError(`Oops! Something went wrong. We're on it!`);
      // Console error message.
      console.error(`SyntaxError occurred: ${error.message}`);
    } else {
      // Error message user receives.
      this.displayError(
        `No weather data found for that city. Please try another.`
      );
      // Console error message.
      console.error(`An error has occurred: ${error.message}`);
    }
  }
}

export default ErrorHandler;
