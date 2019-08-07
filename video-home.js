const mediaUrls = [
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4',
  'http://techslides.com/demos/sample-videos/small.mp4',
  'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
];

function* mediaSelector (mediaList) {
  let index = 0;
  const mediaListLength = mediaList.length;

  // infinite loop woohoo
  while (index < mediaListLength) {
    // ICI tu peu crée une méthode pure qui prend mediaList et index en argument
    // pour te resortir le bon media en fct de la hauteur du body
    // genre: yield getMediaForCurrentHeight(mediaList, index)
    yield mediaList[index];
    index = (index + 1) % mediaListLength;
  }

}

class videoHome {
  constructor(mediaPlayerElement) {
    console.log(this);
    // this.isHome = !!(document.getElementById('Home') && document.getElementById('Home').length);
    // this.isHome = true;
    this.mediaPlayer = mediaPlayerElement;
    // this.sourcePlayer = videoPlayerElement.children()
    // this.low = 236;
    // this.medium = 540;
    // this.screenHeight = document.body.clientHeight;
    // this.date = new Date();
    // this.actualHour = this.date.getHours();
    // this.actualHour = 0;
    // this.currentVideo = this.actualHour;
    // this.mediasUrl = window.mediasUrl;
    this.mediasUrl = mediaUrls;
    this.currentMedia = null;
    // if (this.isHome) {
    //   this.nextMedia();
    //   this.pauseVideo();
    // }
    this.mediaPlayer.addEventListener('ended', this.nextMedia.bind(this));
    this.mediaPlayer.addEventListener('loadeddata', this.playVideo.bind(this));
    this.getNextMedia = mediaSelector(this.mediasUrl);
    this.nextMedia();
  }

  nextMedia() {
    this.setCurrentMedia();
    this.setVideoSource();
  }

  async playVideo() {
    try {
      await this.mediaPlayer.play();
    } catch (e) {
      console.error(e);
      this.pauseVideo();
    }
  }

  pauseVideo() {
    this.mediaPlayer.pause();
  }

  muteVideo() {
    return this;
  }

  unmuteVideo() {
    return this;
  }

  setVideoSource() {
    // la detection de la hauteur toussa toussa c'est ailleurs

    // if (this.screenHeight <= this.low) {
    //   this.mediaPlayer.src = videoFormat[419];
    // } else if (this.screenHeight <= this.medium) {
    //   this.mediaPlayer.src = videoFormat[960];
    // } else {
    //   this.mediaPlayer.src = videoFormat[1280];
    // }

    this.mediaPlayer.src = this.currentMedia;

    // Le code en dessous n'a rien à faire dans cette méthode.

    // const playPromise = this.mediaPlayer.play();
    //
    // if (playPromise !== undefined) {
    //   playPromise.then(() => {
    //     this.mediaPlayer.play();
    //   }).catch((error) => {
    //     this.mediaPlayer.pause();
    //   });
    // }
    //
    // this.mediaPlayer.addEventListener('ended', () => {
    //   this.prepareNextVideo();
    // });
  }

  setCurrentMedia() {
    this.currentMedia = this.getNextMedia.next().value;
  }
}

export default videoHome;
