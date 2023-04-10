import Link from "next/link";
import { useRouter } from "next/router";

export default function Id() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <p>To do for id # {id}</p>
      <Link href="/todos">To Do</Link>
    </div>
  );
}

// const [load, setLoad] = useState(null);

// useEffect(() => {
//   // Call Codehooks backend API
//   const fetchData = async () => {
//     const response = await fetch(API_ENDPOINT, {
//       method: "GET",
//       headers: { "x-apikey": API_KEY },
//     });
//     const data = await response.json();
//     // Change application state and reload
//     setLoad(false);
//   };
//   fetchData();
// }, []);
