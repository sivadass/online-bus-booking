import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "../../contexts/auth";
import CommonProvider from "../../contexts/common";
import Loader from "../loader";
import Header from "./header";
import Footer from "./footer";

const RootWrapper = () => {
  return (
    <div className="app-container">
      <Header />
      <Suspense fallback={<Loader />}>
        <div className="bg-slate-200 min-h-[calc(100vh-136px)]">
          <Outlet />
        </div>
      </Suspense>
      <Footer />
    </div>
  );
};

function Root(props) {
  return (
    <AuthProvider>
      <CommonProvider>
        <RootWrapper {...props} />
      </CommonProvider>
    </AuthProvider>
  );
}

export default Root;
