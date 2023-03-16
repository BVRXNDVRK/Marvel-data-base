import {useState} from 'react';
import {Helmet} from 'react-helmet';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchPanel from "../charSearchPanel/CharSearchPanel";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null),
          [charactersInList, setCharactersInList] = useState({});

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    const onCharListUpdated = (charList) => {
        setCharactersInList(charList);
    }

    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information portal</title>
            </Helmet>

            <ErrorBoundary>
                <RandomChar/>   
            </ErrorBoundary>

            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} onCharListUpdated={onCharListUpdated} charId={selectedChar}/>
                </ErrorBoundary>

                <div class="char__content-wrapper">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <CharSearchPanel charactersInList={charactersInList}/>
                    </ErrorBoundary>
                </div>

            </div>
            
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;