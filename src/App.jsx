/* eslint-disable import/no-anonymous-default-export */
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Dividends } from "./components/dividends";
import { Roadmap } from "./components/roadmap";
import jsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

export default () => (
  <div>
    <Navigation />
    <Header data={jsonData.Header} />
    <About data={jsonData.About} />
    <Dividends data={jsonData.Dividends} />
    <Roadmap data={jsonData.Roadmap} />
  </div>
);
