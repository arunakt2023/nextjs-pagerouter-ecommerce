import Image from 'next/image';
import styles from '../styles/page.module.css';
import Banner from '../Components/Banner/Banner';
import HomeProducts from '../Components/HomeProducts/HomeProducts';
import CategoryOnHome from '../Components/CategoryOnHome/CategoryOnHome';

const Home = () => {
  return (
    <>
      <CategoryOnHome />
      <Banner />
      <HomeProducts />
    </>
  );
};

export default Home;