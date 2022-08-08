import React, { FC } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useTypeSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes } from '../router';


const AppRouter: FC = () => {
   const { isAuth } = useTypeSelector(state => state.authReduser)

   return (
      isAuth
         ?
         <Routes>
            {
               privateRoutes.map(route =>
                  <Route
                     path={route.path}
                     element={<route.element />}
                     key={route.path}
                  />
               )
            }
            <Route
               path="*"
               element={<Navigate to="/" replace />}
            />
         </Routes>
         :
         <Routes>
            {
               publicRoutes.map(route =>
                  <Route
                     path={route.path}
                     element={<route.element />}
                     key={route.path}
                  />
               )
            }
            <Route
               path="*"
               element={<Navigate to="/login" replace />}
            />
         </Routes>
   );
}

export default AppRouter;