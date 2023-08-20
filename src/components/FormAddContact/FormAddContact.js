// FormAddContact.js
import React from 'react';
import useFormFields from 'hooks/useFormFields';
import { useGetContactsQuery, useAddContactMutation } from 'redux/contacts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import s from './FormAddContact.module.css';

export default function FormAddContact() {
  const {
    state: name,
    setState: setName,
  } = useFormFields('');

  const {
    state: number,
    setState: setNumber,
  } = useFormFields('');

  const [addContact, { isLoading }] = useAddContactMutation();
  const { data } = useGetContactsQuery('', {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const handleSubmit = evt => {
    evt.preventDefault();
    const contactData = { name, number };
    const nameToAdd = contactData.name.toLowerCase(); // Convert to lowercase

    if (data?.some(contact => contact.name.toLowerCase() === nameToAdd)) {
      alert(`${nameToAdd} is already in your contacts`);
      return;
    }

    addContact(contactData)
      .unwrap()
      .then(() => {
        formReset();
      })
      .catch(error => {
        console.error('An error occurred:', error);
        // Handle error case, possibly show a message to the user
      });
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      {/* Your input fields */}
      <button className={s.btn} type="submit">
        <PersonAddIcon className={s.addContactIcon} color="inherit" />
        {isLoading ? 'Adding...' : 'Add contact'}
      </button>
    </form>
  );
}
