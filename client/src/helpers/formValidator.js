import validator from "validator";

const strValidate = (name) => {
  return validator.isLength(name, { min: 4, max: 200 });
};

const urlValidate = (url) => {
  return (
    validator.isURL(url, { require_tld: true, require_protocol: true }) &&
    validator.isLength(url, { min: 6, max: 200 })
  );
};

const dateValidate = (enddate) => {
  const endDate = new Date(enddate);
  const currentDate = new Date();
  return endDate.getTime() > currentDate.getTime();
};

export { dateValidate, strValidate, urlValidate };
