import React, { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Adapt_Abil = lazy(() => import("@/pages/AdaptAbli"));
const Basic_Config = lazy(() => import("@/pages/BasicConfig"));
const Basic_work = lazy(() => import("@/pages/BasicWork"));

const Trust_Abil = lazy(() => import("@/pages/TrustAbil"));

const AdapIntro = lazy(() => import("@/pages/AdaptAbli/c-cpns/Intro"));
const AdapNav = lazy(() => import("@/pages/AdaptAbli/c-cpns/Nav"));
const AdapRemote = lazy(() => import("@/pages/AdaptAbli/c-cpns/Remote"));
const AdapVoice = lazy(() => import("@/pages/AdaptAbli/c-cpns/Voice"));

const SelfLearn = lazy(() => import("@/pages/SelfLearn"));
const CollaAware = lazy(() => import("@/pages/CollaAware"));
const AbstrAware = lazy(() => import("@/pages/AbstrAware"));
const Home = lazy(() => import("@/pages/Home"));
const Profile = lazy(() => import("@/pages/Profile"));
const Dataset = lazy(() => import("@/pages/Dataset"));
const PDFviewer = lazy(() => import("@/components/PDFviewer"));
const Results = lazy(() => import("@/pages/Results"));

//路由表映射
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/home" />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/all",
    element: <Home />
  },
  {
    path: "/document",
    element: <Home />
  },
  {
    path: "/standard",
    element: <Home />
  },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      {
        path: "/profile",
        element: <Navigate to="/profile/config" />
      },
      {
        path: "config",
        element: <Basic_Config />
      },
      {
        path: "dataset",
        element: <Dataset />
      },
      {
        path: "basicwork",
        element: <Basic_work />
      },
      {
        path: "adapt",
        element: <Adapt_Abil />,
        children: [
          {
            path: "adapt",
            element: <Navigate to="/profile/adapt/intro" />
          },
          {
            path: "guide",
            element: <AdapIntro />
          },
          {
            path: "navigate",
            element: <AdapNav />
          },
          {
            path: "remote",
            element: <AdapRemote />
          },
          {
            path: "voice",
            element: <AdapVoice />
          }
        ]
      },
      {
        path: "trust",
        element: <Trust_Abil />
      },
      {
        path: "selflearning",
        element: <SelfLearn />
      },
      {
        path: "colawareness",
        element: <CollaAware />
      },
      {
        path: "absawareness",
        element: <AbstrAware />
      },
      {
        path: "result",
        element: <Results />
      }
    ]
  },
  {
    path: "/pdfviewer",
    element: <PDFviewer />
  }
];

export default routes;
