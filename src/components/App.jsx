import { nanoid } from 'nanoid';
import {ContactForm} from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';
import { Container, Title } from './App.styled';

import React, { useState, useEffect} from 'react';

const App = () => {
  const [contacts, setContacts] = useState([
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const savedState = localStorage.getItem('contacts');
    savedState && setContacts(JSON.parse(savedState));
  }, [])
  
  useEffect(() => {
    contacts && localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  
  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const createContact = contact => {
    const isNameExist = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    const isNumberExist = contacts.find(
      ({ number }) => number.toLowerCase() === contact.number.toLowerCase()
    );

    if (isNameExist) {
      return alert(`${contact.name} is already in contacts.`);
    }
    if (isNumberExist) {
      return alert(
        `Number ${contact.number} already exists in contacts with the name ${isNumberExist.name}.`
      );
    }
    
    setContacts(prevContacts => {
      return [
        ...prevContacts,
        {
          id: nanoid(),
          ...contact,
        },
      ];
    });
  };  

  const deleteContact = contactId => {
    setContacts((prevContacts) => {
    return prevContacts.filter(({ id }) => id !== contactId)
  })
  };
 
  const visibleContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );
  const isEmptyContactList = contacts.length === 0;

  return (
    <Container>
      <h1>Phonebook</h1>
      <Notification message="Add number to contacts" />
      <ContactForm createContact={createContact} />

      <Title>Contacts</Title>
      {isEmptyContactList ? (
        <Notification message="Your phonebook is empty" />
      ) : (
        <>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={visibleContacts}
            deleteContact={deleteContact}
          />
          {visibleContacts.length === 0 && (
            <Notification message="Nothing found" />
          )}
        </>
      )}
    </Container>
  );
}

export default App;