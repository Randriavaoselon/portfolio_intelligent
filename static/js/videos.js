function toggleMute() {
    var video = document.getElementById("myVideo");
    var btn = document.getElementById("muteBtn");
    
    if (video.muted) {
        video.muted = false;
        btn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        video.muted = true;
        btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}