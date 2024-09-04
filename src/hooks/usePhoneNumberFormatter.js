import {useEffect, useState} from 'react';

/** custom hook to formate phn number */
const usePhoneNumberFormatter = phoneNumber => {
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(null);

  useEffect(() => {
    const formatPhoneNumber = () => {
      let phone = phoneNumber?.substring(0, 3);
      phone =
        phone &&
        phone +
          ' ' +
          phoneNumber
            ?.substring(3)
            .match(/.{1,4}/g)
            ?.join(' ');
      setFormattedPhoneNumber(phone);
    };

    formatPhoneNumber();
  }, [phoneNumber]);

  return formattedPhoneNumber;
};

export default usePhoneNumberFormatter;
