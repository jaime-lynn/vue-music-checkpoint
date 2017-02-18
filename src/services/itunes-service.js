export default {
  getMusicByArtist(artist) {
    var url = '//bcw-getter.herokuapp.com/?url=';
    var url2 = 'https://itunes.apple.com/search?term=' + artist + '&entity=song';
    var apiUrl = url + encodeURIComponent(url2);
    return fetch(apiUrl)
  }
}