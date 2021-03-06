import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';

const FIELDS = [
  { label: "Survey Title", name: "title"},
  { label: "Subject Line", name: "subject"},
  { label: "Email Body", name: "body"},
  { label: "Recipient List", name: "list"}
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, field => {
      return (
        <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name} />
      )
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
        {this.renderFields()}
        <Link to="/surveys" className="red btn-flat left white-text">CANCEL</Link>
        <button type="submit" className="teal btn-flat right white-text">NEXT <i className="material-icons right">done</i></button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, ({ name }) => {
    if(!values[name]){
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default  reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
