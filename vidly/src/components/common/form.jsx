import { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = { data: {}, errors: {} };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    console.log(errors);
    return errors;
    // return Object.keys(errors).length === 0 ? null : errors; // ? why doesn't the form submit when I return {} instead of null
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} }); // not clean
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    const data = { ...this.state.data };
    data[name] = value;

    this.setState({ data, errors });
  };

  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;

    return (
      <Input
        required
        label={label}
        name={name}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        label={label}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        options={options}
        required
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary mt-2">
        {label}
      </button>
    );
  }
}

export default Form;
