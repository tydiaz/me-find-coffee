import { useRouter } from 'next/router';

const HomeRoute = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <h1>Page: {pid}</h1>;
};

export default HomeRoute;
