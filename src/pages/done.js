import Link from "next/link";

//Nextjs backend API endpoint and API token
const API_ENDPOINT = "https://backend-m00k.api.codehooks.io/dev/";
const API_KEY = "3870bfad-706b-4a7c-bbfb-82a431d6d140";

export default function Done() {
  const [load, setLoad] = useState(null);

  useEffect(() => {
    // Call Codehooks backend API
    const fetchData = async () => {
      const response = await fetch(API_ENDPOINT, {
        method: "GET",
        headers: { "x-apikey": API_KEY },
      });
      const data = await response.json();
      // Change application state and reload
      setLoad(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>done list</h1>
      <Link href="/todos">To Do</Link>
    </>
  );
}
