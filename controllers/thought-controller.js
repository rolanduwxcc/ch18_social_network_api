const { Thought, User, Reaction } = require('../models');
const { db } = require('../models/User');

const thoughtController = {
    //--------------------------CREATE A THOUGHTS
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            console.log(_id);
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({ message: 'No user with that id!' });
                return;
            }
            res.json(dbUser);
        })
        .catch(err => res.status(500).json(err));
    },
    //-------------------------------RETRIEVE THOUGHTS
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(404).json(err));
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //---------------------------------UPDATE THOUGHTS
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id '});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    },
    //--------------------------------DELETE THOUGHTS
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.json(404).json({ message: 'No thought with this id!' });
            }
            res.json(deletedThough);
        }) 
        .catch(err => res.json(err));
    },
    //-------------------------------CREATE A REACTION
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'ABORT - No thought with this ID!' })
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err)); 
    },
    //----------------------------------DELETE A REACTION
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }    

};

module.exports = thoughtController;

