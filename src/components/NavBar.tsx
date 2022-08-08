import React, { FC } from 'react';
import { Layout, Menu, Row } from "antd"
import { useNavigate } from 'react-router-dom';
import { RoteNames } from '../router';
import { useTypeSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const NavBar: FC = () => {
   const navigate = useNavigate()
   const { logout } = useActions()
   const { isAuth, user } = useTypeSelector(state => state.authReduser)


   return (
      <Layout.Header>
         <Row justify='end'>
            {
               isAuth
                  ?
                  <>
                     <div style={{ color: '#fff' }}>
                        {user.username}
                     </div>
                     <Menu theme='dark' mode='horizontal' selectable={false}>
                        <Menu.Item onClick={logout} key={1}>Выйти</Menu.Item>
                     </Menu>
                  </>
                  :
                  <Menu theme='dark' mode='horizontal' selectable={false}>
                     <Menu.Item onClick={() => navigate(RoteNames.LOGIN)} key={1}>Логин</Menu.Item>
                  </Menu>
            }
         </Row>
      </Layout.Header>
   );
}

export default NavBar;