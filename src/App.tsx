import { BrowserRouter } from "react-router-dom";

import "./shared/components/forms/TranslationYup";

import { AppDrawerProvider, AppThemeProvider } from "./shared/contexts";
import { AppRoutes } from "./shared/routes";
import { MenuDrawer } from "./shared/components";


export const App = () => {
  return (

    <AppThemeProvider >
      <AppDrawerProvider >

        <BrowserRouter>
        
          <MenuDrawer>
            <AppRoutes />
          </MenuDrawer>

        </BrowserRouter >

      </AppDrawerProvider>
    </AppThemeProvider>
  );
};
