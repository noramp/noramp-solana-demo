/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from 'next';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import Celebrate from '../../components/Celebrate';
import { IS_MAINNET } from '../../config/config';
import { createCompressedPrice } from '../../lib/api';

const MintCompressedPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      setIsLoading(true);
      event.preventDefault();

      // @ts-ignore
      const name = event.target.elements.name.value;

      // @ts-ignore
      const symbol = event.target.elements.symbol.value;
      // @ts-ignore
      const metadata = event.target.elements.metadata.value;

      try {
        const newPrice = await createCompressedPrice({
          name,
          symbol,
          metadata_uri: metadata,
        });

        // @ts-ignore
        window.initializeNoRamp({
          priceId: newPrice.id,
          testnet: !IS_MAINNET,

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
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <div className="container flex flex-col items-center justify-center flex-1 gap-8 px-4 mx-auto">
      <p className="text-2xl">Mint Compressed</p>

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
          id="symbol"
          type="text"
          className="px-6 py-4 text-lg font-bold transition duration-200 ease-in-out bg-white border-2 border-white rounded-lg shadow-md"
          placeholder="symbol"
          required
        />

        <input
          id="metadata"
          type="text"
          className="px-6 py-4 text-lg font-bold transition duration-200 ease-in-out bg-white border-2 border-white rounded-lg shadow-md"
          placeholder="metadata uri"
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

export default MintCompressedPage;
