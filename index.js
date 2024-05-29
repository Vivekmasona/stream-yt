const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let audioStatus = 'stop'; // Initial status of the audio player
let audioUrl = ''; // Initial URL of the audio
let audioVolume = 100; // Initial volume level (0 to 100)

// Endpoint to control play, pause, stop, and specific volume levels
app.post('/control', (req, res) => {
    const { action, volume } = req.body;

    if (action) {
        // Update the audioStatus based on the action received
        if (action === 'play') {
            audioStatus = 'play';
        } else if (action === 'pause') {
            audioStatus = 'pause';
        } else if (action === 'stop') {
            audioStatus = 'stop';
        }
    }

    if (volume !== undefined) {
        // Update the audioVolume based on the volume received
        const validVolumes = [0, 20, 40, 60, 80, 100];
        if (validVolumes.includes(volume)) {
            audioVolume = volume;
        } else {
            return res.status(400).json({ status: 'Invalid volume value' });
        }
    }

    res.json({ status: 'Action received', action, volume: audioVolume });
});

// Endpoint to get the current audio status
app.get('/audio-status', (req, res) => {
    res.json({ status: audioStatus });
});

// Endpoint to update the audio URL
app.post('/update-url', (req, res) => {
    const { url } = req.body;
    audioUrl = url;
    res.json({ status: 'URL updated' });
});

// Endpoint to get the current audio URL
app.get('/current-url', (req, res) => {
    res.json({ url: audioUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

