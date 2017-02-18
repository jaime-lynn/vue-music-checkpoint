import Vue from 'vue'

let myTunes = {}

let myTracks = []
// THESE ARE SIMPLE HELPER FUNCTIONS TO KEEP YOUR MYTUNES IN LOCAL STORAGE
// WE WILL EVENTUALLY BE REPLACING THESE GUYS BUT NOT TODAY :)
// NOTICE HOWEVER THAT THESE FUNCTIONS ARE NOT GOING TO BE EXPORTED BECAUSE 
// THE COMPONENT SHOULD NEVER BE RESPONSIBLE FOR ACTUALLY CALLING saveMytunes
// PERHAPS YOU SHOULD HAVE THE LIST SAVED WHENEVER IT MUTATES ***CHANGES***
function saveMytunes() {
  localStorage.setItem('myTracks', JSON.stringify(myTracks))
}

function loadMytunes() {
  myTracks = JSON.parse(localStorage.getItem('myTracks')) || []
}

// function idExists(trackId){
//   if(myTracks.id == trackId){
//     return true
//   } else {
//     return false
//   }
// }

loadMytunes()

export default {
  getTracks() {
    return myTracks.sort(function(a, b){
      return b.votes - a.votes
    })
   },
  addTrack(track) {
    // OCCASIONALLY YOU WILL RUN INTO ISSUES WHERE VUE WILL BE
    // UNAWARE THAT A CHANGE HAS OCCURED TO YOUR DATA
    // TO ELIMINATE THIS PROBLEM YOU CAN USE 
    // Vue.set(myTunes, track.id, track)
    // myTracks.forEach(myTrack => {
    //   if(myTrack.id == track.id){
    //     return console.log('That track is already in your playlist')
    //   }
    // })
try{

    for(var i = 0; i < myTracks.length; i++){
      if(myTracks[i].id === track.id){
        // return console.log('That track si already on your palylist')
        return Materialize.toast('That track is already on your playlist', 2000);
      }
    }
    track.votes = 0;
    myTracks.push(track);
    // myTunes[track.id].votes = 0;
    myTracks.sort(function(a, b){
      return b.votes - a.votes
    })
    saveMytunes()
}catch(e){
  console.log(e)
}
    // YOU CAN READ MORE ABOUT VUE.SET HERE
    // https://vuejs.org/v2/api/#Vue-set
   },
  removeTrack(track) {
    Vue.delete(myTunes, track.id)
    let index = myTracks.indexOf(track)
    myTracks.splice(index, 1);
    saveMytunes()
   },
  promoteTrack(track) {
    let index = myTracks.indexOf(track);
    myTracks[index].votes += 1;
    // myTunes[track.id].votes += 1;
    saveMytunes();
   },
  demoteTrack(track) {
    let index = myTracks.indexOf(track);
    myTracks[index].votes -= 1;
    // myTunes[track.id].votes -= 1;
    saveMytunes();
   }
}