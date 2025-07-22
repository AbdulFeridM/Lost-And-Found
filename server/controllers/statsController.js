import Item from "../models/Item.js";
import User from "../models/User.js";

export const statsController = async (req, res) => {
    const userId = req.query.userId || req.userId;

    const [lost, found, claimed, total] = await Promise.all([
      Item.countDocuments({ status: 'lost' }),
      Item.countDocuments({ status: 'found' }),
      Item.countDocuments({ status: 'claimed' }),
      Item.estimatedDocumentCount(),
    ]);
  
    let userStats = {};
    if (userId) {
      const [userLost, userFound, userClaimed] = await Promise.all([
        Item.countDocuments({ type: 'lost', postedBy: userId }),
        Item.countDocuments({ type: 'found', postedBy: userId }),
        Item.countDocuments({ status: 'claimed', claimedBy: userId }),
      ]);
  
      userStats = { userLost, userFound, userClaimed , userId};
    }
  
    res.json({ posts:userStats.userLost ,  found, claimed, total, ...userStats });
  }


  export const adminStatsController = async (req, res) => {
    const [users, rejected, approved, total, pending] = await Promise.all([
      User.countDocuments(),
      Item.countDocuments({ status: 'rejected' }),
      Item.countDocuments({ status: 'approved' }),
      Item.countDocuments({ status: 'pending' }),
      Item.estimatedDocumentCount(),
    ]);
  
    res.json({ users, rejected, approved, total, pending });
  }