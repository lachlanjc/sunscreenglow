# sunscreenglow

A solar-powered website: you can only see the content when a solar panel is receiving enough illumination to boot up an Arduino to connect to Wi-Fi and upload the amount of voltage it’s receiving to [Adafruit IO](https://io.adafruit.com/). The website then checks the voltage every second and displays the content if the latest reading is within 15 seconds.

[Read more →](https://notebook.lachlanjc.com/2023-05-04_nrg_solar_project)

[View the simulated site →](https://sunscreenglow.vercel.app/simulation)

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm i
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Arduino

The Arduino code lives in `arduino/`. You’ll need to install the Adafruit IO Arduino library.
