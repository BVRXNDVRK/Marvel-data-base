import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './charSearchPanel.scss';

const CharSearchPanel = () => {
    return (
        <div class="search__panel">
            <Formik
                initialValues={{ name: '' }}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .required('This field is required!')
                })}
                onSubmit={values => {
                    console.log(values);
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
                </Form>
            </Formik>
        </div>
    )
}

export default CharSearchPanel;