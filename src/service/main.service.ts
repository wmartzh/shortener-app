import Joi from "joi";
import ShortUniqueId from "short-unique-id";
import short from "short-uuid";
import dbClient from "./db.client";

const { HOST, PORT } = process.env;
export const createShortSchema = Joi.object({
  url: Joi.string().required(),
  slug: Joi.string().empty(),
});

class MainService {
  async findBySlug(slug: string) {
    const shortData = await dbClient.shorts.findFirst({
      where: {
        slug,
      },
    });
    return shortData;
  }

  async create(data: { url: string; slug?: string }) {
    const slug =
      data.slug ||
      new ShortUniqueId({
        length: 6,
      })();

    await dbClient.shorts.create({
      data: {
        url: data.url,
        slug,
        updateAt: new Date(),
      },
    });

    return {
      short: `http://${HOST}:${PORT}/${slug}`,
      url: data.url,
    };
  }
}

export default new MainService();
