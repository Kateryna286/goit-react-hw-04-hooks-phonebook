import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import ContactsList from './ContactList/ContactsList';
import Filter from './Filter/Filter';
//import Form from './Forms/Form';
import InputForm from './Forms/InputForm';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const formSubmitHandler = (name, number) => {
    console.log('Name:', name);
    console.log('Number:', number);

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

// class OldApp extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   formSubmitHandler = data => {
//     console.log('Data:', data);
//     if (this.state.contacts.some(contact => contact.name === data.name)) {
//       alert(`${data.name} already exist in contact list`);
//       return;
//     }

//     const contact = {
//       id: uuidv4(),
//       name: data.name,
//       number: data.number,
//     };

//     this.setState(prevState => ({
//       contacts: [contact, ...prevState.contacts],
//     }));
//   };

//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter),
//     );
//   };

//   handleDeleteContact = event => {
//     this.setState({
//       contacts: this.state.contacts.filter(
//         contact => contact.id !== event.currentTarget.id,
//       ),
//     });
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('Contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const filteredContacts = this.getVisibleContacts();

//     return (
//       <div className="container">
//         <div className="formsContainer">
//           <InputForm onSubmit={this.formSubmitHandler} />
//         </div>

//         <div className="contactsContainer">
//           <div className="contacts">
//             <h2>Contacts</h2>
//             <Filter value={this.state.filter} onChange={this.changeFilter} />
//             <ContactsList
//               contacts={filteredContacts}
//               onClick={this.handleDeleteContact}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// //export default OldApp;
