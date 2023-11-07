const path = require("path");
const { HTTPError } = require("../../utils");
const fs = require("fs/promises");
const User = require("../../models/user");

const avatarsPath = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const id = req.user.id;
    if (req.file === undefined) {
      throw HTTPError(400, "Not file provided");
    }
    const { path: tempDir, originalname } = req.file;
    const filename = `${id[0]}_${id[2]}_${originalname}`;
    const resultUpload = path.join(avatarsPath, filename);
    await fs.rename(tempDir, resultUpload);
    const avatarURL = path.join("avatars", filename);
    const user = await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
    return res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = updateAvatar;
