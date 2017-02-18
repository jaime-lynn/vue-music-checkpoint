<template>
    <div>
        <!--<audio id="preview" :src="previewUrl" ></audio>-->
        <div class="container">
            <div class="row">
                <form @submit.prevent="getTracks()">
                    <div class="col s11">
                        <input type="text" placeholder="Artist or Song Name" v-model="query">
                    </div>
                    <div class="col s1">
                        <button class="waves-effect waves-light btn" type="submit"><i class="fa fa-search"></i></button>
                    </div>
                </form>
            </div>
        </div>

        <h3 v-if="!tracks[1]">Search for an Artist or Song!</h3>
        <div v-for="track in tracks">
            <div draggable="true" @click="setTrack(track)" v-on:dragstart.capture="moving" class="card horizontal">
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
                        <button class="btn-floating" @click="addTrack(track)"><i class="fa fa-plus"></i></button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import itunesService from '../services/itunes-service'
    import myTunesService from '../services/mytunes-service'

    export default {
        name: 'itunes',
        data() {
            return {
                query: '',
                tracks: [],
                currentTrack: {},
                previewUrl: ''
            }
        },
        methods: {
            getTracks() {
                itunesService.getMusicByArtist(this.query)
                    .then(res => {
                        res.json().then(tracks => {
                            console.log(tracks)
                            this.tracks = tracks.results.map(function (song) {
                                return {
                                    title: song.trackName,
                                    albumArt: song.artworkUrl60,
                                    artist: song.artistName,
                                    collection: song.collectionName,
                                    price: song.collectionPrice,
                                    preview: song.previewUrl,
                                    id: song.trackId
                                }
                            })
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            addTrack(track) {
                myTunesService.addTrack(track);
                console.log(myTunesService.getTracks())
            },
            setTrack(track) {
                this.currentTrack = track;
            },
            moving(event) {
                console.log(this.currentTrack)
                event.dataTransfer.setData('text/javascript', JSON.stringify(this.currentTrack))
            }
            // playTrack(url) {
            //     debugger
            //     console.log(this.$refs.preview);
            //     var audio = document.getElementById('preview');
            //     if (this.previewUrl === url) {
            //         // this.$refs.preview.pause();
            //         audio.pause();
            //         this.previewUrl = ''
            //     } else {
            //         audio.src = url;
            //         console.log(this.$refs.preview);
            //         // this.$refs.preview.play().then(function () {
            //         //     console.log('Your song is playing');
            //         // })
            //         //     .catch(err => {
            //         //         console.log(err)
            //         //     });
            //         audio.play();
            //     }
            // }
        }
    }

</script>

<style>

</style>