"use client";
import { useState, useEffect } from "react";
import AnimatedNumbers from "react-animate-number-ticker";
import "react-animate-number-ticker/dist/index.css";

interface Value {
  value: string;
  created_at: string;
}

function getRelativeTime(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return (
      <>
        <AnimatedNumbers number={seconds.toString()} /> second
        {seconds === 1 ? (
          <span className="invisible" aria-hidden>
            s
          </span>
        ) : (
          "s"
        )}
        {" ago"}
      </>
    );
  }
}

function OnlineStatus({
  onlineRecently,
  latest,
}: // time
  {
    onlineRecently: boolean;
    latest: Value;
    time: number;
  }) {
  const date = latest?.created_at;
  return (
    <>
      {onlineRecently ? "Updated" : "Last online"}&nbsp;
      <time dateTime={date}>{getRelativeTime(date)}</time>
    </>
  );
}

const decimals = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function Capacity({ latest }: { latest: string }) {
  // analog input is 0-1023, 3.3V, 2x voltage divider
  const volts = (Number(latest) / 1023) * 3.3 * 2;
  return <AnimatedNumbers number={Number(decimals.format(volts))} />;
}

export default function Home() {
  // re-render every second
  const [time, setTime] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Array<Value>>([]);

  useEffect(() => {
    const launch = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    const addData = setInterval(() => {
      setTime(Date.now());
      // get random number between 900 and 1200
      setData((vals) => [
        {
          value: (Math.random() * 1023).toString(),
          created_at: new Date().toISOString(),
        },
        ...vals,
      ]);
    }, 4000);
    const tick = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => {
      clearTimeout(launch);
      clearInterval(addData);
      clearInterval(tick);
    };
  }, []);

  const latest = data?.[0];

  const onlineRecently = !isLoading && data.length > 1;

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 transition-colors duration-1000 ${onlineRecently ? "light" : "dark"
        }`}
    >
      <div className="dark" hidden />
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {onlineRecently ? "Online now" : "Connect to solar to activate."}
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none tabular-nums">
          {isLoading ? (
            "…"
          ) : (
            <OnlineStatus
              onlineRecently={onlineRecently}
              latest={latest}
              time={time}
            />
          )}
        </div>
      </div>

      <div className="font-display tabular-nums text-8xl relative flex place-items-center  before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:rounded-full after:translate-x-1/3 after:bg-gradient-conic after:from-amber-400 after:via-orange-300 after:to-orange-400 after:animate-pulse after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-orange-700 before:dark:opacity-10 after:dark:from-amber-900 after:dark:opacity-40 before:lg:h-[360px]">
        {onlineRecently ? (
          <>
            <Capacity latest={latest?.value} /> &nbsp;
            <span className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-transparent dark:text-inherit">
              volts
            </span>
          </>
        ) : null}
      </div>

      <div
        className={`w-100 transition-opacity duration-1000 ${onlineRecently ? "opacity-100" : "opacity-0"
          }`}
      >
        <header className="flex items-baseline text-left w-100 mb-3 gap-3">
          <div className="pl-5">
            <h2 className="opacity-50 font-display uppercase">Past work</h2>
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 opacity-50 text-sm"
              href="https://lachlanjc.com"
            >
              by @lachlanjc
            </a>
          </div>
          <hr className="border-bottom border-gray-200 dark:border-neutral-800 w-100 flex-grow mt-1" />
        </header>
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="https://solar-optimism.vercel.app/"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-normal`}>
              Solar Optimism{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &rarr;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Why solar power makes the case for optimism about climate change.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-normal`}>
              2010 vs 2020 in Solar{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &rarr;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              A physical data visualization about the falling cost of solar
              power.
            </p>
          </a>

          <a
            href="https://edu.lachlanjc.com/2023-04-19_nrg_measurement_project"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-normal`}>
              Box of Rocks{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &rarr;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Researching the potential of solar-powered thermal batteries.
            </p>
          </a>

          <a
            href="https://decarbonize-the-game.vercel.app/about"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-normal`}>
              Decarbonize: The Game{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &rarr;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              A game where you’re in control of the energy grid—try scaling
              solar early.
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
