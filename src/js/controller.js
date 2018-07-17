window.controller = {};


// función para validar mail
window.controller.validateLogin = (email, password) => {
  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  // según campos vacíos
  if (email.length === 0 || password.length === 0) {
    return {
      valid: false,
      message: 'No debe dejar campos vacíos'
    };
    // según formato de email
  } else if ((emailRegex.test(email)) === false) {
    return {
      valid: false,
      message: 'Debe ingresar un mail valido'
    };
    // según password mayor a 6 caracteres
  } else if (password.length < 6) {
    return {
      valid: false,
      message: 'La contraseña debe contener minimo 6 caracteres'
    };
  };

  return {
    valid: true,
    message: ''
  };
};


// función llegada mail y password, valida y registra o envia mensaje 
window.controller.register = () => {
  let makeMail = document.getElementById('makeMail').value;
  let makePassword = document.getElementById('makePassword').value;

  // llama a función de validado mail y password
  const isValid = window.controller.validateLogin(makeMail, makePassword);

  // llama a función de registro en firebase
  if (isValid.valid) {
    window.data.register(makeMail, makePassword);
    alert('Cuenta creada');
  } else {
    alert(isValid.message);
  }
};


// función para hacer login
window.controller.ingress = () => {
  let connectMail = document.getElementById('connectMail').value;
  let connectPassword = document.getElementById('connectPassword').value;
  console.log(connectMail, connectPassword);

  // llama a ingress en firebase
  window.data.ingress(connectMail, connectPassword);

  // hacer un if con observador si es valido va a muro 
};

window.onload = () => {
  window.data.activeUser();
};