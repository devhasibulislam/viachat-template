/* external import */
const cloudinary = require("cloudinary").v2;

/* remove image from cloudinary */
async function remove(public_id) {
  await cloudinary.uploader.destroy(public_id);
}

module.exports = remove;
