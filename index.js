const express = require('express');
const app = express();
const port = 3000;

// Assume the song started at a specific time
const songStartTime = new Date();  // Song starts when the server starts
const songDuration = 86400; // Song duration in seconds (e.g., 24 hours)

app.get('/current_time', (req, res) => {
    const currentTime = new Date();
    const elapsedTime = (currentTime - songStartTime) / 1000;
    const currentPlaybackTime = elapsedTime % songDuration; // Loop the song if it exceeds duration
    res.json({ time: currentPlaybackTime });
});

app.use(express.static('public')); // Serve static files from the "public" directory

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
