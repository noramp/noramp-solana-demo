import axios from 'axios';

export type SolanaMintNFTData = {
  name: string;
  description: string;
  symbol: string;
  attributes: Attribute[];
  image_url: string;
};

export type Attribute = {
  trait_type: string;
  value: string;
};

export const createPrice = async (nftData: SolanaMintNFTData) => {
  const response = await axios.post('/api/prices', nftData, {
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
  });

  return response.data;
};

export type SolanaMintCompressedNFTData = {
  name: string;
  symbol: string;
  metadata_uri: string;
};

export const createCompressedPrice = async (
  nftData: SolanaMintCompressedNFTData
) => {
  const response = await axios.post('/api/compressed/prices', nftData, {
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
  });

  return response.data;
};
