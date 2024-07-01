const Category = require("./models/category");
const slugify = require("slugify");

const generateSlugs = async () => {
  try {
    const categories = await Category.findAll();
    for (const category of categories) {
      category.slug = slugify(category.name);
      await category.save();
    }
    console.log("Slugs generated successfully.");
  } catch (err) {
    console.error("Error generating slugs:", err);
  }
};

generateSlugs();
