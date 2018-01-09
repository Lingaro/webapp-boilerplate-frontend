import "./app.scss";

// TODO: remove this
fetch("/api/version")
  .then(resp => resp.text())
  .catch(error => error.message)
  .then(version => document.body.innerHTML = 'Backend ver: ' + version);
