import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

import Cointeiner from 'components/Cointeiner/Cointeiner';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contact = JSON.parse(localStorage.getItem("my-contacts"))
    return contact ? contact : [];
  })
  const [filter, setFilter] = useState('')

  useEffect(() => {                                               // першим аргументом ми передаємо колбек функцію в середині якої є логіка
    localStorage.setItem("my-contacts", JSON.stringify(contacts)) // всередині неї ми робимо логіку ми сохраняємо наші контакти (localStorage.setItem ) , "my-contacts" це назва хриниліща
  }, [contacts])     // другий аргумент масив змінних, при зміні будь-якого  буде запускатися ефект і виконуватися callback ,тобто щось змінилося в [contacts] запуститьяс 1 функція де запише зміни які відбулися в contactsю

  const isDublication = (name) => {
    const normalizeName = name.toLowerCase()
    const nameContact = contacts.find(({ name }) => {
      return (normalizeName === name.toLowerCase())
    })
    return Boolean(nameContact)
  }

  const addContact = ({ name, number }) => {
    if (isDublication(name)) {
      return alert(`${name} is already in contacts!`)
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(3),
        name,
        number,
      }
      return [...prevContacts, newContact]
    })
  }

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id))    //повертаються всі книги крім теї на якому висить id на яку ми нажали 
  }

  const onHendleFilter = ({ target }) => setFilter(target.value)

  const getFilteredContact = () => {
    if (!filter) return contacts;
    const normalizedFilter = filter.toLocaleLowerCase();
    const result = contacts.filter(({ name }) => {
      return (name.toLocaleLowerCase().includes(normalizedFilter))
    })
    return result
  }

  const filterContacts = getFilteredContact();

  return (

    <Cointeiner>
      <h2>Phonebook</h2>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter onHendleFilter={onHendleFilter} />
      <ContactList contacts={filterContacts} deleteContact={deleteContact} />
    </Cointeiner>

  )

}
export default App

// useEffect(callback, deps) приймає два аргументи:
// callback - функція, усередині якої виконується вся логіка ефекту. Наприклад, запити на сервер, завдання обробників подій на документ і т.п.
// залежності - масив змінних, при зміні будь-якого з яких, буде запускатися ефект і виконуватися callback. Це може бути стан, пропси або будь-яке локальне значення всередині компонента.
// setItem(key, value) – сохранить пару ключ/значение.
// getItem(key) – получить данные по ключу key.