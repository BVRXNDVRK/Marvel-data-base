import {useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import AppBanner from '../appBanner/AppBanner';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelServise from '../../services/MarvelService';
import './singlePage.scss';

const SingleCharPage = () => {
    const {charId} = useParams(),
          [char, setChar] = useState(null),
          {error, loading, getCharacter, clearError} = useMarvelServise();

    useEffect(() => {
        updateChar();
    }, [charId])      

    const updateChar = () => {
        clearError();

        getCharacter(charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const  errorMessage =  error ? <ErrorMessage/> : null,
           spinner =  loading ? <Spinner/> : null,
           content =  !(error || loading || !char) ? <View char={char}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char;

    return(
        <div className="single-page">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} page`}
                    />
                <title>{name}</title>
            </Helmet>

            <img className="single-page__char-img" src={thumbnail} alt={name}/>

            <div className="single-page__info">
                <h2 className="single-page__name">{name}</h2>
                <p className="single-page__descr">{description}</p>
            </div>

            <Link to="/" className="single-page__back">Back to all</Link>
        </div>
    )
}

export default SingleCharPage;