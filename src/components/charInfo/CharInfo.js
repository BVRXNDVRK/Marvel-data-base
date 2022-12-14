import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import MarvelServise from '../../services/MarvelService';
import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelServise = new MarvelServise();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();
        this.marvelServise
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state,
              skeleton = char || loading || error ? null : <Skeleton/>,
              errorMessage =  error ? <ErrorMessage/> : null,
              spinner =  loading ? <Spinner/> : null,
              content =  !(error || loading || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;  

    const renderComics = () => {
        if (comics.length === 0) {
            return 'Sorry, there are no comics with this character =('
        } else {
            return (
                comics.map((item, i) => {
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                }).splice(0, 10)
            )
        }
    }

    return (
        <>
            <div className="char__basics">
                <img style={{objectFit: `${(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ? 'fill' : 'cover'}` }} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki}className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {renderComics()}
            </ul>
        </>
    )
}

export default CharInfo;