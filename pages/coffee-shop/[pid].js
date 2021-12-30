import Link from 'next/link';
import { useRouter } from 'next/router';

const CoffeeShop = () => {
  const router = useRouter();
  const { pid } = router.query;
  console.log(router.query);
  console.log(pid);

  return (
    <div>
      Coffee Shop Page: {pid}
      <Link href='/'>
        <a>Home</a>
      </Link>
    </div>
  );
};

export default CoffeeShop;
