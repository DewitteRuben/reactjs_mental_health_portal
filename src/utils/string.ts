const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const splitCamelCase = (text: string) =>
  text.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

const isValidEmail = (email: string) => emailRegex.test(email);

export { splitCamelCase, isValidEmail };
