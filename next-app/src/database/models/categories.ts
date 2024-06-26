import mongoose from "mongoose";
import { TinkCategory } from "@/types/tink";

interface MongoCategory extends mongoose.Document, Omit<TinkCategory, "id"> {}

interface MongoCategoryMethods {}

const CategorySchema = new mongoose.Schema<MongoCategory, MongoCategoryMethods>(
  {
    id: {
      type: String,
      required: [true, "Category ID is required"],
    },
    defaultChild: {
      type: Boolean,
      required: [true, "Default child is required"],
    },
    code: {
      type: String,
      required: [true, "Code is required"],
    },
    parent: {
      type: String || null,
    },
    primaryName: {
      type: String || null,
    },
    searchTerms: {
      type: String || null,
    },
    secondaryName: {
      type: String || null,
    },
    sortOrder: {
      type: Number,
      required: [true, "Sort order is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    typeName: {
      type: String,
      required: [true, "Type name is required"],
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel =
  mongoose.models.category || mongoose.model("category", CategorySchema);

export default CategoryModel as mongoose.Model<
  MongoCategory,
  MongoCategoryMethods
>;
