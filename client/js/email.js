const btn = document.getElementById('button');

var formName = document.getElementById("from_name");
var errorName = document.getElementById("name-error");
var formText = document.getElementById("message");
var errorText = document.getElementById("message-error")
var formEmail = document.getElementById("email_id");
var errorEmail = document.getElementById("email-error");


document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_o6r7lvb';

    checkName(formName.value);
    checkMessage(formText.value);
    checkEmail(formEmail.value);

    if (checkName(formName.value) && checkMessage(formText.value) && checkEmail(formEmail.value)){
      emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Enviar';
        alert('Se envió su mensaje');
      }, (err) => {
        btn.value = 'Enviar';
        alert(JSON.stringify(err));
      });
    }

    else{
      btn.value = 'Enviar';
    }
});


function checkName(name){
  var msjErrorName = 'El nombre no puede estar vacío';

  if(isEmpty(name)){
    errorName.innerText = msjErrorName;
    return false;
  }
  else{
    errorName.innerText = '';
    return true;
  }
}

function checkMessage(msj){
  var msjErrorMsj = 'Debe escribir su mensaje';

  if (isEmpty(msj)){
    errorText.innerText = msjErrorMsj;
    return false;
  }
  else{
    errorText.innerText = '';
    return true;
  }
}

function checkEmail(email){
  var msjErrorEmailEmpty = "El email no puede estar vacío";
  var msjErrorEmailEmail = "Debe colocar un email válido";

  if(isEmpty(email)){
    errorEmail.innerText = msjErrorEmailEmpty;
    return false;
  }
  else if(!esEmail(email)){
    errorEmail.innerText = msjErrorEmailEmail;
    return false;
  }
  else{
    errorEmail.innerText = '';
    return true;
  }
}

const isEmpty = (cadena) => {
  return (cadena.length == 0 || cadena == ' ')?true : false;
}

function esEmail(cadena){
  let regex = new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}');
  return regex.test(cadena);
}