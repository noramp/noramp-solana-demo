/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from 'next';
import React, { useCallback, useState } from 'react';
import Celebrate from '../components/Celebrate';
import { NORAMP_PRICE_ID } from '../config/config';

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      setIsLoading(true);
      event.preventDefault();
      // @ts-ignore
      window.initializeNoRamp({
        priceId: NORAMP_PRICE_ID,
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
    },
    []
  );

  return (
    <div className="container flex flex-col items-center justify-center flex-1 gap-8 px-4 mx-auto">
      <p className="text-2xl">Transfer SOL</p>

      <form onSubmit={handleSubmit} className="{styles.form}">
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

export default Home;
