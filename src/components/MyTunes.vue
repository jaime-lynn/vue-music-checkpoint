<template>
    <div droppable="true" v-on:drop.capture="addSong" ondragover="event.preventDefault()">
        <h3>My Playlist</h3>
        <div v-for="track in myTunes">
            <div class="card horizontal">
                <div class="card-stacked">
                    <div class="card-content">
                        <div class="row">
                            <div class="col s2">
                                <div class="valign">
                                    <img v-if="track.albumArt" :src="track.albumArt">
                                    <img v-if="!track.albumArt" src="http://placehold.it/70x70">
                                </div>
                            </div>
                            <div class="col s7">
                                <h5>{{ track.title }}</h5>
                                <audio controls :src="track.preview"></audio>
                            </div>
                            <div class="col s3">
                                <p><strong>{{ track.artist }}</strong></p>
                                <p>{{ track.collection }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-action">
                        <button class="btn-floating" @click="removeTrack(track)"><i class="fa fa-trash-o"></i></button>
                        <button class="btn-floating" @click="promoteTrack(track)"><i class="fa fa-arrow-up"></i></button>
                        <span>{{ track.votes }}</span>
                        <button class="btn-floating" @click="demoteTrack(track)"><i class="fa fa-arrow-down"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>


</template>

<script>
    import myTunesService from '../services/mytunes-service'

    export default {
        name: 'mytunes',
        data() {
            return {
                myTunes: myTunesService.getTracks()
            }
        },
        methods: {
            removeTrack(track) {
                myTunesService.removeTrack(track);
            },
            promoteTrack(track) {
                myTunesService.promoteTrack(track);
                this.myTunes = this.myTunes.sort(function (a, b) {
                    return b.votes - a.votes
                })
            },
            demoteTrack(track) {
                myTunesService.demoteTrack(track);
                this.myTunes = this.myTunes.sort(function (a, b) {
                    return b.votes - a.votes
                })
            },
            addSong(event) {
                var song = JSON.parse(event.dataTransfer.getData('text/javascript'))
                myTunesService.addTrack(song);
            }
        }
    }

</script>

<style>
h3 {
    text-shadow: black 0.1em 0.1em 0.2em;
    color: white;
    text-align: center;
}
</style>