import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import ContactsList from './ContactList/ContactsList';
import Filter from './Filter/Filter';
import InputForm from './Forms/InputForm';

export default function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('Contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
  );

  const [filter, setFilter] = useState('');

  const formSubmitHandler = (name, number) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} already exist in contact list`);
      return;
    }

    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };

    setContacts(prevState => [contact, ...prevState]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const handleDeleteContact = event => {
    setContacts(
      contacts.filter(contact => contact.id !== event.currentTarget.id),
    );
  };

  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="container">
      <div className="formsContainer">
        <InputForm onSubmit={formSubmitHandler} />
      </div>

      <div className="contactsContainer">
        <div className="contacts">
          <h2>Contacts</h2>
          <Filter value={filter} onChange={changeFilter} />
          <ContactsList
            contacts={getVisibleContacts()}
            onClick={handleDeleteContact}
          />
        </div>
      </div>
    </div>
  );
}
