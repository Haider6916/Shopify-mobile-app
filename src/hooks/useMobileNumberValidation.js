import {useEffect, useState} from 'react';

/** custom hook to validate phone number */
const usePhoneNumberValidation = mobileNumber => {
  const validationRegex = /^[0-9\b]+$/;
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(false);

  useEffect(() => {
    const validateMobileNumber = number => {
      const {length} = number;
      if (
        length > 9 &&
        length <= 15 &&
        Number(number) !== 0 &&
        validationRegex.test(number)
      ) {
        setIsMobileNumberValid(true);
      } else {
        setIsMobileNumberValid(false);
      }
    };
    validateMobileNumber(mobileNumber);
  }, [mobileNumber]);
  return isMobileNumberValid;
};
export default usePhoneNumberValidation;
