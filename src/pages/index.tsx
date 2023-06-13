/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import Celebrate from '../components/Celebrate';
import { NORAMP_PRICE_ID } from '../config/config';

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.event === 'noramp:onPayment') {
        console.log('Payment event', event.data);

        const type = event.data?.detail?.type;
        const status = event.data?.detail?.data?.status;

        if (type === 'finished' && status === 'paid') {
          setSuccess(true);
        }
      }
    });
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      setIsLoading(true);
      event.preventDefault();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.initializeNoRamp({
        priceId: NORAMP_PRICE_ID,
        testnet: true,

        onSuccess: async (data: any) => {
          console.log('success', data);
          // setSuccess(true);
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
    },
    []
  );

  return (
    <div className="container flex flex-col items-center justify-center flex-1 gap-8 px-4 mx-auto">
      <p className="text-2xl">Claim your SOL airdrop!</p>

      <form onSubmit={handleSubmit} className="{styles.form}">
        <button
          className="w-full p-2.5 text-white bg-purple-500 rounded-[6px] hover:bg-opacity-80 transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-opacity-50 "
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Claim Now'}
        </button>
      </form>

      {success && <Celebrate />}
    </div>
  );
};

export default Home;
