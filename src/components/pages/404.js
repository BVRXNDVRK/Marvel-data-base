import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Page404 = () => {
    return(
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="404 error page"
                    />
                <title>Error 404</title>
            </Helmet>

            <ErrorMessage />

            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '5%'}}>Page doesn't exist</p>

            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '44px', 'marginTop': '50px'}} to="/">
                Back to main page
            </Link>
        </div>
    )
}

export default Page404;