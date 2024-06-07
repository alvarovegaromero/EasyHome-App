export const validateEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
};

export const getCurrentDate = () => {
  const today = new Date();

  const day = ('0' + today.getDate()).slice(-2);
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getFormatedDateForRequests = (date: Date) => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
