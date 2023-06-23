/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import Celebrate from '../components/Celebrate';
import { TRANSFER_CONFIG } from '../config/config';

const TransferPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      setIsLoading(true);
      event.preventDefault();

      try {
        // @ts-ignore
        window.initializeNoRamp({
          priceId: TRANSFER_CONFIG.PRICE_ID,
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
      <p className="text-2xl">Transfer SPL-Token</p>

      <Image
        src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
        alt="USDC logo"
        width={100}
        height={100}
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-8 m-0 leading-tight"
      >
        <button
          className="w-full p-2.5 text-white bg-purple-500 rounded-[6px] hover:bg-opacity-80 transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-opacity-50 "
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Transfer'}
        </button>
      </form>

      {success && <Celebrate />}
    </div>
  );
};

export default TransferPage;
