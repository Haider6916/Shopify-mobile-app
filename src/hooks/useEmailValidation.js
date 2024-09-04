import {useEffect, useState} from 'react';

/** custom hook to validate a email */
const useEmailValidation = email => {
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    const validateEmail = emailToValidate => {
      const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailReg.test(emailToValidate)) {
        setIsEmailValid(true);
      } else {
        setIsEmailValid(false);
      }
    };
    validateEmail(email);
  }, [email]);
  return isEmailValid;
};
export default useEmailValidation;
