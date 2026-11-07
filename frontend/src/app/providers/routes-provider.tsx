import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { MainPage } from "@pages/main";
import { APP_ROUTES } from "@shared/config/routes";

export const RoutesProvider = () => (
  <BrowserRouter>
    <Routes>
      <Route path={APP_ROUTES.MAIN} element={<MainPage />} />

      <Route path="*" element={<Navigate to={APP_ROUTES.MAIN} />} />
    </Routes>
  </BrowserRouter>
);
