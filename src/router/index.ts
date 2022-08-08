import React from "react";
import Event from "../pages/Event";
import Login from "../pages/Login";

export interface IRoute {
   path: string;
   element: React.ComponentType;
}

export enum RoteNames {
   LOGIN = '/login',
   EVENT = '/'
}

export const publicRoutes: IRoute[] = [
   { path: RoteNames.LOGIN, element: Login }
]

export const privateRoutes: IRoute[] = [
   { path: RoteNames.EVENT, element: Event }
]