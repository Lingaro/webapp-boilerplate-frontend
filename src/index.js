import "./app.scss";

fetch("/api/version")
  .then(resp => resp.text())
  .catch(error => JSON.stringify(error))
  .then(version => document.body.innerHTML = 'Backend ver: '+version);
