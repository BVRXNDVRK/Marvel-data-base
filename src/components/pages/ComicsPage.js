import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const ComicsPage = () => {


    return(
        <>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;