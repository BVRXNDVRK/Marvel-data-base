import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]),
          [newitemsLoading, setNewitemsLoading] = useState(false),
          [offset, setOffset] = useState(210),
          [charEnded, setCharEnded] = useState(false),
          itemRefs = useRef([]),
          {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewitemsLoading(false) : setNewitemsLoading(true);   
        getAllCharacters(offset)
            .then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;

        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewitemsLoading(newitemsLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended); 
    }

    const onCharClick = (charId) => {
        props.onCharSelected(charId);
    }

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'cover'}
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'}
            }

            return (
                <CSSTransition key={item.id} timeout={500} classNames="char">
                    <li className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}    
                    onClick={() => {
                        onCharClick(item.id)
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={`${item.name}`} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}      
                </TransitionGroup>  
            </ul>
        )
    }


    const items = renderItems(charList),
          spinner = loading && !newitemsLoading ? <Spinner/> : null,
          errorMessage =  error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
            className="button button__main button__long"
            disabled={newitemsLoading}
            style={{'display': charEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;