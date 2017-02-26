<template>
  <div class="home">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <div class="row">
      <div class="col s12 m6">
        <my-tunes class="my-tunes"></my-tunes>
      </div>
      <div class="col s12 m6">
        <itunes class="itunes"></itunes>
      </div>
    </div>
  </div>
</template>

<script>
  import Itunes from './Itunes'
  import MyTunes from './MyTunes'

  export default {
    name: 'home',
    components: {
      Itunes,
      MyTunes
    },
    data() {
      return {

      }
    }
  }

  $(function () {
    $("audio").on("play", function () {
      $("audio").not(this).each(function (index, audio) {
        audio.pause();
      });
    });
  });

</script>


<style>
  /**
* YOU SHOULD PROBABLY MAKE THIS LOOK BETTER :)
* BOOTSTRAP IS FOR THE WEAK FLEXBOX IS KING
* -- McCall
**/
  /*.my-tunes{
  display: inline-block;
  min-height: 500px;
  max-width: 50%;
  background: purple;
}

.itunes{
  display: inline-block;
  background: pink;
  min-height: 500px;
  max-width: 45%;
}*/
  
  body {
    padding-top: 20px;
    background: url('../assets/record-player.jpg');
    background-size: cover;
    background-attachment: fixed;
  }
  
  input {
    text-shadow: black 0.1em 0.1em 0.2em;
    color: white;
  }
</style>