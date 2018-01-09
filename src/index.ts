import "./app.scss";
import { version } from "punycode";

// Show versions of backend and frontend. 
// You can safely remove this
Promise.all(['/api/version', '/VERSION'].map(path =>
  fetch(path)
    .then(resp => resp.text())
    .catch(error => error.message)
)).then((versions: string[]) => {
  document.body.innerHTML = `Backend: ${versions[0]}, Frontend: ${versions[1]}`
});
