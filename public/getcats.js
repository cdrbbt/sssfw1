fetch('./cats').then(response => response.json()).then((json) => {
  console.log(json);
  json.forEach((cat) => {
    document.querySelector('#cats').innerHTML += `<li>${cat.name}</li>`;
  });
});
