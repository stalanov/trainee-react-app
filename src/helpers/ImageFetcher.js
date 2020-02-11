let url = 'https://en.wikipedia.org/w/api.php';

const params = {
  action: 'query',
  formatversion: 2,
  prop: 'pageimages',
  piprop: 'original',
  pilicense: 'any',
  format: 'json',
  redirects: 1
};

url = url + '?origin=*';
Object.keys(params).forEach(function(key) {
  url += '&' + key + '=' + params[key];
});

export default async function getImageUrl(title) {
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
