/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Celebrate from '../components/Celebrate';
import { createPrice } from '../lib/api';

const MintPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      setIsLoading(true);
      event.preventDefault();

      // @ts-ignore
      const name = event.target.elements.name.value;
      // @ts-ignore
      const description = event.target.elements.description.value;
      // @ts-ignore
      const symbol = event.target.elements.symbol.value;
      // @ts-ignore
      const image_url = event.target.elements.image.value;

      try {
        const newPrice = await createPrice({
          name,
          description,
          symbol,
          image_url,
          attributes: [],
        });

        // @ts-ignore
        window.initializeNoRamp({
          priceId: newPrice.id,
          testnet: true,

          onSuccess: async (data: any) => {
            console.log('success', data);
            setSuccess(true);
            setIsLoading(false);
          },
          onFailure: (err: any) => {
            console.error(err);
            if (err?.message) {
              alert(err?.message);
            }
          },
          onClose: (data: any) => {
            console.log('closed', data);
            setIsLoading(false);
            setSuccess(false);
          },
          onEvent: console.log,
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.NoRamp.open();
      } catch (e) {
        toast.error('Error creating price');
      }
    },
    []
  );

  return (
    <div className="container flex flex-col items-center justify-center flex-1 gap-8 px-4 mx-auto">
      <p className="text-2xl">Mint your NFT</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-8 m-0 leading-tight"
      >
        <input
          id="name"
          type="text"
          className="px-6 py-4 text-lg font-bold transition duration-200 ease-in-out bg-white border-2 border-white rounded-lg shadow-md"
          placeholder="name"
          required
        />

        <input
          id="description"
          type="text"
          className="px-6 py-4 text-lg font-bold transition duration-200 ease-in-out bg-white border-2 border-white rounded-lg shadow-md"
          placeholder="description"
          required
        />

        <input
          id="symbol"
          type="text"
          className="px-6 py-4 text-lg font-bold transition duration-200 ease-in-out bg-white border-2 border-white rounded-lg shadow-md"
          placeholder="symbol"
          required
        />

        <input
          id="image"
          type="text"
          className="px-6 py-4 text-lg font-bold transition duration-200 ease-in-out bg-white border-2 border-white rounded-lg shadow-md"
          placeholder="image url"
          required
        />

        <button
          className="w-full p-2.5 text-white bg-purple-500 rounded-[6px] hover:bg-opacity-80 transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-opacity-50 "
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Mint now'}
        </button>
      </form>

      {success && <Celebrate />}
    </div>
  );
};

export default MintPage;
