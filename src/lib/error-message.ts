export const catchErrorMessage = (error: any): string => {
  /**
   *  in most case, from server the error
   *  throw in apiErrors object
   */
  const data = error.response?.data;

  if (data) {
    if (data.apiErrors) {
      return data.apiErrors[0].message;
    }
    return "Something went wrong";
  } else {
    return "Server error";
  }
};
