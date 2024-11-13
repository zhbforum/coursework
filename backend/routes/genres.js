const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

router.get('/', genresController.getAllGenres);
router.get('/:genreId', genresController.getGenreById);
router.post('/', genresController.addGenre);
router.put('/:genreId', genresController.updateGenre);

module.exports = router;
