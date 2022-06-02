import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import {
  isAuthenticatedSelector,
  isAuthenticatingSelector,
} from "@/store/slices/admin/adminSlice";
import { RootState } from "@/store/store";
import { isClient } from "@/utils/commonUtil";

// eslint-disable-next-line react/display-name
const withAuth = (WrappedComponent: React.FC) => (props: any) => {
  // this hoc only supports client side rendering.
  if (isClient()) {
    const router = useRouter();
    const { route } = router;
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const isAuthenticating = useSelector(isAuthenticatingSelector);

    // is fetching session (eg. show spinner)
    if (isAuthenticating) {
      return null;
    }

    // If user is not logged in, return login component
    if (route !== "/admin/login" && route !== "/admin/register") {
      if (!isAuthenticated) {
        router.push(`/admin/login`);
        return null;
      }
    } else {
      if (isAuthenticated) {
        router.push(`/admin`); // default page after login
        return null;
      }
    }

    // If user is logged in, return original component
    return <WrappedComponent {...props} />;
  }

  return null;
};

export default withAuth;