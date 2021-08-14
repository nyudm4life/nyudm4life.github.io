var client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8'
})

var options = {
    appid: '6b8146ce098f4a5784d84d051349620e',
    uid: null,
    channel: null,
}

var localTracks = {
    videoTrack : null,
    audioTrack : null,
}

async function join(){

    options.uid = await client.join(options.appid,options.channel,null,null)

    localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
    localTracks.videoTrack.play("local-player")
    
}

$("#join-form").submit(async function(e){
    e.preventDefault();

    options.channel = $("#channel").val();

    try{
        join();
    }catch (e){
        console.error(e)
    }finally{
        $("#join").attr("disabled", true)
        $("#leave").attr("disabled", false)
    }

})

async function leave(){

    for(trackName in localTracks){
        var track = localTracks[trackName];
        if (track) {
            track.stop();
            track.close();
            localTracks.trackName = undefined;
        }
    }

    $("#join").attr("disabled", false)
    $("#leave").attr("disabled", true)

    await client.leave();
}

$('#leave').click(function(e){
    leave();
})