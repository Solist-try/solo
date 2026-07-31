import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  AuthProvider,
  RedirectIfAuthed,
  RequireAuth,
} from "./auth";
import { AppLayout } from "./components/AppLayout";
import { SafetyProvider } from "./modules/safety";
import { Login } from "./pages/Auth/Login";
import { Onboarding } from "./pages/Auth/Onboarding";
import { Signup } from "./pages/Auth/Signup";
import {
  Community,
  DesignSystem,
  Events,
  Home,
  Messages,
  Mission,
  Profile,
  Resources,
  Safety,
  Settings,
  Toolkit,
} from "./pages";

export default function App() {
  return (
    <AuthProvider>
      <SafetyProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<RedirectIfAuthed />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="onboarding" element={<Onboarding />} />
              <Route element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="community" element={<Community />} />
                <Route path="resources" element={<Resources />} />
                <Route path="events" element={<Events />} />
                <Route path="messages" element={<Messages />} />
                <Route path="toolkit" element={<Toolkit />} />
                <Route path="mission" element={<Mission />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="safety" element={<Safety />} />
                <Route path="design-system" element={<DesignSystem />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SafetyProvider>
    </AuthProvider>
  );
}
