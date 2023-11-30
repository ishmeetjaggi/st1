const { urlencoded } = require("express");
const Trainer = require("../model/Trainer");
const Review = require("../model/review");

const getAllReviews = async (req, res, next) => {
  let reviews;
  try {
    reviews = await Review.find();
  } catch (err) {
    console.log(err);
  }

  if (!reviews) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ reviews });
};



const addReview = async (req, res, next) => {
    const { content, rating, author, createdAt} = req.body;
    let review;
    try {
      review = new Review({
        content,
        rating,
        author,
        createdAt,
      });
        await review.save();
    } catch (err) {
    console.log(err);
    }

  if (!review) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({ review });
};

const updateReview = async (req, res, next) => {
  const id = req.params.id;
  const { content, rating, author, createdAt} = req.body;
  let review;
  try {
    review = new Review({
      content,
      rating,
      author,
      createdAt,
    });
    review = await review.save();
  } catch (err) {
    console.log(err);
  }
  if (!review) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ review });
};


const deleteReview = async (req, res, next) => {
    const id = req.params.id;
    try {
      const review = await Review.findByIdAndDelete(id);
      if (!review) {
        return res.status(404).json({ message: "Unable to find " });
      }
      return res.status(200).json({ message: "successfully deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
};


exports.getAllReviews = getAllReviews;
exports.addReview = addReview;

exports.updateReview = updateReview;
exports.deleteReview = deleteReview;