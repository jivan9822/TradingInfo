import { useRef } from 'react';
import classes from '../HomePage.module.css';

const SearchTickerByName = (props) => {
  const nameRef = useRef();
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClickHandler(e);
    }
  };
  const onClickHandler = (e) => {
    e.preventDefault();
    props.onGetName(nameRef.current.value);
    nameRef.current.value = '';
  };
  return (
    <div className={classes.searchDiv}>
      <input
        type='text'
        placeholder='Enter company name'
        ref={nameRef}
        onKeyDown={onKeyPress}
      />
      <button onClick={onClickHandler}>Search Ticker By Name</button>
    </div>
  );
};
export default SearchTickerByName;
