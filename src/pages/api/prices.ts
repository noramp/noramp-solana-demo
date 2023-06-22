import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { MINT_CONFIG } from '../../config/config';

export const createPrice = async (appId: string, createPriceDto: unknown) => {
  return axios
    .post(`/prices/${appId}`, createPriceDto, {
      baseURL: process.env.NORAMP_API_URL,
      headers: {
        Authorization: `Bearer ${process.env.NORAMP_API_KEY}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description, symbol, attributes, image_url } = req.body;
  try {
    const newPrice = await createPrice(MINT_CONFIG.APP_ID, {
      amount: 1,
      currency: 'usd',
      trigger_id: MINT_CONFIG.TRIGGER_ID,
      trigger_data: {
        params_data: {
          name,
          description,
          symbol,
          attributes,
          image_url,
        },
      },
    });

    res.statusCode = 200;

    res.json(newPrice.data);
  } catch (error: any) {
    console.log(error.response.data);
    console.log(error.message);
    res.statusCode = 500;
    res.json({ error: error.message });
  }
}
