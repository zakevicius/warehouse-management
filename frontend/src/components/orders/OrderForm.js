import React from 'react';
import { Field, reduxForm } from 'redux-form';

class OrderForm extends React.Component {

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                    <Field name="sender" component={this.renderInput} label="Enter Sender" />
                    <button className="ui button primary">Submit</button>
                </form>
            </div>

        );
    }
}

const validate = formValues => {
    const errors = [];

    if (!formValues.sender) {
        errors.title = "Enter sender";
    }

    return errors;
}

export default reduxForm({
    form: 'orderForm',
    validate: validate
})(OrderForm);