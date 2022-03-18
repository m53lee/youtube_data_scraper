//Reference: https://awesomecoding.co/posts/tutorial-using-youtube-javascript-api

const {
    YOUTUBE_API_KEY
} = require('./config.js');
const fetch = require('node-fetch');
const express = require('express');
const app = express();

// Fetches the video Id of the youtube video
async function fetch_id(keyword) {
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&q=${keyword}`;
    const res = await fetch(youtubeUrl);
    const data = await res.json();
    return data.items[0].id.videoId;
};

app.get('/:keyword', (req, res) => {
    fetch_id(req.params.keyword).then((data) => {
        if (data === null) {
            res.status(404).json({
                'Error': 'The track/artist was not found on YouTube'
            })
        } else {
            res.status(200).json({
                'videoId': data
            })
        }
    })
});

// Listen to the App Engine-specified port, or 8000 otherwise
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});