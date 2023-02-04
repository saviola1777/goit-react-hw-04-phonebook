import PropTypes from "prop-types";
import css from "components/ContactForm/ContactForm.module.css"
 import inititalState from 'components/ContactForm/inititalState'  //зберігається обєкт з даними який ми будемо передавати в useState де є name:'' , number:'',
import { useState } from "react"

const ContactForm =({addContact})=>{                             //створюємо компонент у вигляді колбек функції куди передаємо проп ({addContact})
const [state , setState] = useState({...inititalState})          //створюємо Хук useState де state це наш стейт setState метод для зміни стейту useState({...inititalState}) там дані

 const onHendleChange = ({target})=>{                          //функція при зміні нашого інпуті тобто  те що ми записуємо ({target}) це те саме що e.target обєкт на якому від подія
  const{name ,value}=target ;                                  //деструктуризація 
  setState(prevState=>{                                        //зміна нашого стейту де [name] - це назва нашого name в інпуті два інпута з назвою name і number 
    return {...prevState ,[name]:value}                        //name: значення що ми впишемо в інпут з назвою нейм number:все що впишемо в інпут з назвою намбер
  })
 }

 const onHendleSubmit = (e) => {                 
    e.preventDefault();                          
    addContact({name ,number})                               //в наш проп передали дані зі стейту тут можна було писати state.name но  нижче провів деструктуризацію
    setState({...inititalState})
   }

   const{name ,number}=state                                     //деструктуризуємл щоб в value не писати state.name state.number а просто value={name} value={namber}
   
    return (

      <div className={css.wrapper}>
        <form onSubmit={onHendleSubmit} className={css.form}>
          <label className={css.name}> Name
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={onHendleChange}

            /> </label>
          <label className={css.name}>Number
            <input
              className={css.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={onHendleChange}
            />
          </label>
          <button className={css.button} type="submit">Add contact</button>

        </form>
      </div>
    )

}
ContactForm.Prototype = {
  addContact: PropTypes.func.isRequired,
}

export default ContactForm;



