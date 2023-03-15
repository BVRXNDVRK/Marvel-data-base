import {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './charSearchPanel.scss';

const CharSearchPanel = (props) => {
    const [isFinded, setIsFinded] = useState(null),
          [charName, setCharName] = useState('');

    const findCharacter = (characters, nameFromInput) => {
        setCharName(nameFromInput);
        const charNames = characters.map(item => {return item.name});
        return charNames.find(name => name == nameFromInput) ? true : false;
    }

    return (
        <div class="search__panel">
            <Formik
                initialValues={{ name: '' }}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .required('This field is required!')
                })}
                onSubmit={values => {
                    setIsFinded(findCharacter(props.charactersInList, values.name))
                  }
                }
            >
                <Form>
                    <label className="search__form-label" htmlFor="name">Or find a character by name:</label>

                    <div className="search__form-wrapper">
                        <Field className="search__input" name="name" type="text" placeholder="Enter name"/>

                        <button className="button button__main" type="submit">
                            <div className="inner">Find</div>
                        </button>
                    </div>

                    <ErrorMessage name="name">
                        {msg => <div className="search__input-error">{msg}</div>}
                    </ErrorMessage>

                
                    {isFinded === true || isFinded === null ? null : 
                    <div className="search__form-wrapper">
                        <div className="search__form-text_red">
                            The character was not found. Check the name and try again!
                        </div>
                    </div>}
                    
                    {isFinded === null || isFinded === false ? null : 
                    <div className="search__form-wrapper">
                        <div className="search__form-text_green">There is! Visit {charName} page?</div>
                        <a className="button button__secondary">
                            <div className="inner">To page</div>
                        </a>
                    </div>}
                </Form>
            </Formik>
        </div>
    )
}

export default CharSearchPanel;