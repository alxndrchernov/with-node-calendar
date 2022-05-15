import React from 'react';

class LoginForm extends React.Component {
  handleClick = () => {
    const { handleLoginClick } = this.props;
    handleLoginClick(true);
  }

  render() {
    return (
      <div className="login">
        <form>
          <div>
            <input type="text" title="Введите логин" />
          </div>
          <div>
            <input type="text" title="Введите пароль" />
          </div>
          <button onClick={this.handleClick}> Войти </button>
        </form>
        Sminova Anastasia IVT-41-18
      </div>
    )
  }
}

export default LoginForm;
