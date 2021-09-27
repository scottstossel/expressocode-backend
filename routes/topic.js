const express = require('express');
const router = express.Router();

const {getAllTopics, createTopic, updateTopic, deleteTopic} = require('../controllers/TopicController');

router.get('/', getAllTopics);

router.post('/topic', createTopic);

router.put('/topic/:id', updateTopic);

router.delete('/topic/:id', deleteTopic);