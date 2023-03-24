import {useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';
import useMarvelServise from '../../services/MarvelService';
import './singlePage.scss';

const SingleCharPage = () => {
    const {charId} = useParams(),
          [char, setChar] = useState(null),
          {getCharacter, clearError, process, setProcess} = useMarvelServise();

    useEffect(() => {
        updateChar();
    }, [charId])      

    const updateChar = () => {
        clearError();

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed')); 
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, View, char)} 
        </>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail} = data;

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