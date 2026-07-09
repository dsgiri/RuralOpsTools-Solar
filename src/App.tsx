/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import SolarCalculator from "@/pages/SolarCalculator";
import BatteryCalculator from "@/pages/BatteryCalculator";
import PumpSizing from "@/pages/PumpSizing";
import GateSizing from "@/pages/GateSizing";
import PaybackCalculator from "@/pages/PaybackCalculator";
import FAQ from "@/pages/FAQ";
import Assumptions from "@/pages/Assumptions";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="solar-calculator" element={<SolarCalculator />} />
          <Route path="battery-calculator" element={<BatteryCalculator />} />
          <Route path="pump-sizing" element={<PumpSizing />} />
          <Route path="gate-sizing" element={<GateSizing />} />
          <Route path="payback-calculator" element={<PaybackCalculator />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="assumptions" element={<Assumptions />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

