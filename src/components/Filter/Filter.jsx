import css from 'components/Filter/Filter.module.css'
 import PropTypes from "prop-types";
const Filter=({onHendleFilter})=>{
  return  (
<div className={css.filterWrapper}>
			<label className={css.label}>Find contacts by name
			<input className={css.input} type='text' name='filter' onChange={onHendleFilter}/>
      </label>
      
		</div>

  )
}
Filter.prototype={
  onHendleChange:PropTypes.func.isRequired,
 }
export default Filter