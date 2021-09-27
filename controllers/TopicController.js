const Topic = require('../models/Topic');

const getAllTopics = async (req, res) => {
  const topics = await Topic.find();
  try {
    return res.status(200).json(topics);
  } catch (error) {
    return res.status(500).json({message: "Couldn't find topics"});
  }
}

const createTopic = async (req, res) => {
  const topic = await Topic.create(req.body);
  try {
    return res.status(201).json(topic);
  } catch (error) {
    return res.status(500).json({message: "Couldn't create the topic"});
  }
}

const updateTopic = async (req, res) => {
  const { _id } = req.params;
  const topic = await Topic.findByIdAndUpdate(_id, req.body, {new: true});
  try {
    return res.status(202).json(topic);
  } catch (error) {
    return res.status(500).json({message: "Couldn't update the topic"});
  }
}

const deleteTopic = async (req, res) => {
  const {_id} = req.params;
  const topicToDelete = await Topic.findByIdAndDelete(_id);
  try {
    return res.json({message: "Topic successfully deleted "});
  } catch (error) {
    return res.status(500).json({message: "Couldn't delete topic"});
  }
}

module.exports = {
  getAllTopics,
  createTopic,
  updateTopic,
  deleteTopic
}