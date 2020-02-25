export default async function getImageUrl(title) {
  let url = 'https://en.wikipedia.org/w/api.php?origin=*';

  const params = {
    action: 'query',
    formatversion: 2,
    prop: 'pageimages',
    piprop: 'original',
    pilicense: 'any',
    format: 'json',
    redirects: 1
  };

  Object.keys(params).forEach(function(key) {
    url += '&' + key + '=' + params[key];
  });

  url += '&titles=' + title;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(response => {
      return response.query.pages[0].original.source;
    })
    .catch(error => {
      console.log(error);
    });
}
