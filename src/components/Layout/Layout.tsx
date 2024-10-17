import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header className='header'>заголовок</header>
      <main className='main'>
        <Outlet/>
      </main>
    </>
  );
};

export default Layout;