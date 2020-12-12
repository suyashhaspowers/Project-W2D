import axios from axios
import google_api from '../../../../config/config'

function handleVideoObjects(data) {
    let videoObjects = [];
    for (const videoIndex in data.items) {
        try {
            const video = data.items[videoIndex];
            if (video.status.privacyStatus) {
                const title = video.snippet.title;
                const thumbnailUrl = video.snippet.thumbnails.standard.url;
                const videoId = video.contentDetails.videoId;
                const videoObject = {
                    title: title,
                    thumbnailUrl: thumbnailUrl,
                    videoId: videoId,
                }
                videoObjects.push(videoObject)
            }
        } catch (err) {
            console.log(err);
        }

    }
    return videoObjects;
}

async function getVideoList(playlistId) {
    if (!playlistId) {
        return null;
    }

    await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
            key: google_api,
            part: "contentDetails, snippet, status, id",
            playlistId: playlistId,
            maxResults: 50,
        }
    })
    .then (function(response) {
        if (response.status === 200) {
            return handleVideoObjects(response.data);
        }
    }) 
    .catch (err => {
        window.log(err);
        return null;
    })
}

async function getPlaylistThumbnailUrl(playlistId) {
    // We also need to find a way to validate whether the link given was a youtube playlist that was public

    if (!playlistId) {
        return null;
    }

    await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
            key: google_api,
            part: "snippet, status, id",
            playlistId: playlistId,
            maxResults: 5,
        }
    })
    .then (function(response) {
        if (response.status === 200) {
            let url = '';
            for (const video in response.data.items) {
                url = response.data.items[video].snippet.thumbnails.standard.url;
                if (url) {
                    return url;
                } 
            }
        }
    }) 
    .catch (err => {
        window.log(err);
        return null;
    })
}