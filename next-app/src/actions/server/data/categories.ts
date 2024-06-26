"use server";

import { tinkApi } from "@/actions/api";
import { connectDB } from "@/lib/connect-db";
import { tinkErrorHandler } from "@/lib/api";
import CategoryModel from "@/database/models/categories";
import { TinkCategories, TinkCategory, TinkResponse } from "@/types/tink";

/**
 * Fetches categories from the database. If no categories are found, it initializes them.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<TinkResponse<TinkCategories>>} - A promise that resolves to a TinkResponse object containing the categories.
 */
const getCategories = async (
  userId: string
): Promise<TinkResponse<TinkCategories>> => {
  try {
    await connectDB();

    const oldCategories = await CategoryModel.find({});

    // TODO: Check if categories are older than 1 day
    if (oldCategories.length === 0) {
      const categories = await initCategories(userId);

      await CategoryModel.insertMany(categories);

      return { data: categories };
    }

    const tinkCategories: TinkCategories = oldCategories.map((category) => {
      return category.toObject();
    });

    return { data: tinkCategories };
  } catch (error) {
    console.log(error);
    return tinkErrorHandler(error, "Error while getting categories");
  }
};

/**
 * Initializes categories by making several API calls to `tinkApi`.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<TinkCategories>} - A promise that resolves to the categories.
 */
const initCategories = async (userId: string): Promise<TinkCategories> => {
  const clientAccessToken = await tinkApi.fetchClientAccessToken(
    "authorization:grant,user:read"
  );
  const userGrantAuthorizationCode =
    await tinkApi.fetchUserGrantAuthorizationCode(
      userId,
      clientAccessToken.access_token,
      "user:read"
    );
  const userAccessToken = await tinkApi.fetchUserAccessToken(
    userGrantAuthorizationCode.code
  );
  const categories: TinkCategories = await tinkApi.fetchCategories(
    userAccessToken.access_token
  );

  return categories;
};

/**
 * Finds a specific category in the database by its ID.
 * @param {string} categoryId - The ID of the category.
 * @returns {Promise<TinkResponse<TinkCategory | null>>} - A promise that resolves to a TinkResponse object containing the category or null if not found.
 */
const findCategoryById = async (
  categoryId: string
): Promise<TinkResponse<TinkCategory | null>> => {
  try {
    await connectDB();

    const category = await CategoryModel.findOne({ id: categoryId });

    if (!category) {
      return { data: null };
    }

    return { data: category.toObject() };
  } catch (error) {
    return tinkErrorHandler(error, "Error while finding category");
  }
};

export { getCategories, findCategoryById };
