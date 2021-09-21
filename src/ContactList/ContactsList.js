import React from 'react';
import './ContactList.css';

function ContactsList({ contacts, onClick }) {
  return (
    <ul className="contactsList">
      {contacts.map(contact => (
        <li key={contact.id} className="item">
          <span className="itemText">
            <span className="itemName">{contact.name}:</span>
            <span className="itemNum">{contact.number}</span>
          </span>

          <button
            id={contact.id}
            type="button"
            onClick={onClick}
            className="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactsList;
