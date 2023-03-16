import {useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import AppBanner from '../appBanner/AppBanner';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelServise from '../../services/MarvelService';
import './singlePage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams(),
          [comic, setComic] = useState(null),
          {error, loading, getComic, clearError} = useMarvelServise();

    useEffect(() => {
        updateComic();
    }, [comicId])      

    const updateComic = () => {
        clearError();

        getComic(comicId)
            .then(onComicLoaded);
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const  errorMessage =  error ? <ErrorMessage/> : null,
           spinner =  loading ? <Spinner/> : null,
           content =  !(error || loading || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;

    return(
        <div className="single-page">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                    />
                <title>{title}</title>
            </Helmet>

            <img src={thumbnail} alt={title} className="single-page__comic-img"/>

            <div className="single-page__info">
                <h2 className="single-page__name">{title}</h2>
                <p className="single-page__descr">{description}</p>
                <p className="single-page__descr">{pageCount}</p>
                <p className="single-page__descr">Language: {language}</p>
                <div className="single-page__price">{price + "$"}</div>
            </div>

            <Link to="/comics" className="single-page__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;