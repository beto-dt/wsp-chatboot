const { textTrack } = require('../controllers/textTrackController');

module.exports = (app) => {
    app.post('/api/textTrack', textTrack );
}