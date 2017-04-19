import React, {
  cloneElement,
  Component,
  PropTypes
} from 'react';

const propTypes = {
  actions: PropTypes.shape({
    authentication: PropTypes.shape({
      register: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  children: PropTypes.node,
  location: PropTypes.shape({
    query: PropTypes.shape({
      next: PropTypes.string
    }).isRequired
  }).isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  })
};

class Register extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const values = Array.prototype.reduce.call(this.registerForm.elements, (memo, element) => {
      if (element.name && element.value) {
        memo[element.name] = element.value;
      }

      return memo;
    }, {});
    values.confirm_success_url = `${window.location.origin}/registration-confirmed`;

    return this.props.actions.authentication
      .register(values)
      .then(() => this.transitionToNextPage());
  }

  transitionToNextPage() {
    const query = { ...this.props.location.query };

    if (query.next) {
      delete query.next;
    }

    this.props.router.replace({
      query,
      pathname: this.props.location.query.next || '/'
    });
  }

  render() {
    return (
      <form ref={(form) => { this.registerForm = form; }} onSubmit={this.handleSubmit}>
        <label htmlFor="email">
          Email
          <input name="email" type="text" />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" type="password" />
        </label>
        <label htmlFor="password_confirmation">
          Password Confirmation
          <input name="password_confirmation" type="password" />
        </label>
        {this.props.children &&
          cloneElement(this.props.children, this.props)}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

Register.propTypes = propTypes;

export default Register;
