const express = require('express');
const router = express.Router();
const {validateJwt} = require('../middlewares/processJwt');

const {getAllTopics, createTopic, deleteTopic, updateTopic, getTopic} = require('../controllers/TopicController');

router.get('/', getAllTopics);

router.get('/topic/:id', getTopic);

router.post('/topic', validateJwt, createTopic);

router.put('/topic/:id', validateJwt, updateTopic);

router.delete('/topic/:id', validateJwt, deleteTopic);

module.exports = router;