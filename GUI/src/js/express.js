async function submitLogin() {
  const bent = require('bent');
  const post = bent('POST', 200, 'json');

  const user = document.getElementById('usuario').value;
  const passw = document.getElementById('contraseña').value;

  try {
    var response = await post('http://localhost:3000/login', { username: user, password: passw });
  } catch (error) {
    console.error("" + error)
    return;
  }
}

export default submitLogin;