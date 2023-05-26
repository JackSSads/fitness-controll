import { BrowserRouter } from "react-router-dom";

import { AppThemeProvider } from "./shared/contexts";
import { AppRoutes } from "./shared/routes";

export const App = () => {
  return (

    <AppThemeProvider >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter >
    </AppThemeProvider>
  );
}
