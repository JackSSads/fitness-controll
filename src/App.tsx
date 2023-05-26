import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./shared/routes";

export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
