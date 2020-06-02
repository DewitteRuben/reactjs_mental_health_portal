import _ from "lodash";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const splitCamelCase = (text: string) =>
  text.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

const capitalizeCamelCase = (text: string) => {
  return splitCamelCase(text)
    .map((string) => _.capitalize(string))
    .join(" ");
};

const isValidEmail = (email: string) => emailRegex.test(email);

export { splitCamelCase, isValidEmail, capitalizeCamelCase };
