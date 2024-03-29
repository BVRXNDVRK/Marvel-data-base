import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp(),
          _apiBase = 'https://gateway.marvel.com:443/v1/public/',
          _apiKey = 'apikey=3c1882048fcfada973c9af7f9092e203',
          _baseOffset = '210';
 
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);     
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        let descr = '';

        if (char.description.length === 0) {
            descr = 'Sorry, there is no character description =(';
        } else if (char.description.length > 216) {
            descr = `${char.description.slice(0, 213)} ...`;
        } else {
            descr = char.description;
        }

        return {
            id: char.id,
            name: char.name,
            description: descr,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }

    }

    const _transformComics = (comics) => {
        
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'Sorry, there is no comic description =(',
            pageCount: comics.pageCount ? comics.pageCount + " p." : 'Sorry, there is no information about the number of pages =(',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price
        }
    }

    return {getAllCharacters, 
            getCharacter,
            getAllComics, 
            getComic, 
            clearError, 
            process,
            setProcess}
}

export default useMarvelService;