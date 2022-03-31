import React from "react";

import { IPLContextProvider } from "./context/IPLContext";
import MainLayout from "./Layout/Layout";

const App = () => {
  return (
    <IPLContextProvider>
      <MainLayout />
    </IPLContextProvider>
  );
};

export default App;
