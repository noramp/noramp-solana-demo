import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { COMPRESSED_CONFIG, MINT_CONFIG } from '../../../config/config';

export const createCompressedPrice = async (
  appId: string,
  createPriceDto: unknown
) => {
  console.log('APIKEY: ', process.env.NORAMP_API_KEY);
  console.log('UIR: ', process.env.NORAMP_API_URL);
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
  const { name, symbol, metadata_uri } = req.body;
  try {
    const newPrice = await createCompressedPrice(COMPRESSED_CONFIG.APP_ID, {
      amount: 1,
      currency: 'usd',
      trigger_id: COMPRESSED_CONFIG.TRIGGER_ID,
      trigger_data: {
        params_data: {
          name,
          symbol,
          metadata_uri,
          tree_address: COMPRESSED_CONFIG.TREE_ADDRESS,
          collection: {
            mint_address: COMPRESSED_CONFIG.MINT_ADDRESS,
            metadata_account_address:
              COMPRESSED_CONFIG.METADATA_ACCOUNT_ADDRESS,
            master_edition_account_address:
              COMPRESSED_CONFIG.MASTER_EDITION_ACCOUNT_ADDRESS,
          },
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
