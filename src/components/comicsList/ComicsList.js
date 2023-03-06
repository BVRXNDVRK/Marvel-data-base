import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]),
          [newitemsLoading, setNewitemsLoading] = useState(false),
          [offset, setOffset] = useState(210),
          [comicsEnded, setComicsEnded] = useState(false),
          {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewitemsLoading(false) : setNewitemsLoading(true);   
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;

        if(newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewitemsLoading(newitemsLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);    
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'cover'}
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'}
            }

            return (
                <li className="comics__item"
                    key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="item.title" className="comics__item-img" style={imgStyle}/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price ? item.price + "$" : "NOT AVAILABLE"}</div>
                    </Link>
                </li>  
            )
        });

        return (
            <ul className="comics__grid">
                {items}    
            </ul>
        )
    }

    const items = renderItems(comicsList),
          spinner = loading && !newitemsLoading ? <Spinner/> : null,
          errorMessage =  error ? <ErrorMessage/> : null;

    return (        

        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}

            <button 
            className="button button__main button__long"
            disabled={newitemsLoading}
            style={{'display': comicsEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;