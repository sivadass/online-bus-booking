import { useEffect, useContext, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AuthProvider, {
  AuthDispatchContext,
  AuthStateContext,
  checkValidity,
} from "../../contexts/auth";
import CommonProvider, {
  CommonDispatchContext,
  CommonStateContext,
  toggleMenu,
} from "../../contexts/common";
import Loader from "../loader";
import Typography from "../core/typography";
import Header from "./header";
import Footer from "./footer";

const RootWrapper = ({ routesWithoutHeaderFooter }) => {
  const { pathname } = useLocation();
  const { isCheckingValidity } = useContext(AuthStateContext);
  const { isMenuOpen } = useContext(CommonStateContext);
  const dispatch = useContext(AuthDispatchContext);
  const commonDispatch = useContext(CommonDispatchContext);
  const canShowSideBar = !routesWithoutHeaderFooter.includes(pathname);

  useEffect(() => {
    checkValidity(dispatch);
  }, [dispatch]);
  if (isCheckingValidity) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="app-container">
      <Header />
      <Suspense fallback={<Loader />}>
        <div className="main">
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
