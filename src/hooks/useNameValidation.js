import {useEffect, useState} from 'react';

/** custom hook to validate name string */
const useNameValidation = name => {
  const [isNameValid, setIsNameValid] = useState(false);

  useEffect(() => {
    const validateName = nameToValidate => {
      const nameValidationReg = /^[A-Z][-'a-zA-Z]+$/;
      if (!nameValidationReg.test(nameToValidate)) {
        setIsNameValid(true);
      } else {
        setIsNameValid(false);
      }
    };
    validateName(name);
  }, [name]);
  return {isNameValid};
};
export default useNameValidation;
