import axios from "axios";

const getVehicles = async params => {
	// TODO: implement params
	try {
		const { data } = await axios.get("/getVehicles");

		if (!data.success) {
			return {
				success: false,
				message: data.message
			};
		}
		return {
			success: true,
			vehicles: data.vehicles
		};
	} catch (e) {
		return {
			success: false,
			message: "Error calling getVehicles endpoint"
		};
	}
};

export { getVehicles };

// Example CUSTOM HOOK
/*

----- Custom Hook -----
const useHackerNewsApi = () => {
  const [data, setData] = useState({ hits: [] });
  const [url, setUrl] = useState(
    'http://hn.algolia.com/api/v1/search?query=redux',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const doFetch = () => {
    setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
  };

  return { data, isLoading, isError, doFetch };
}

----- puting to use -----
function App() {
  const [query, setQuery] = useState('redux');
  const { data, isLoading, isError, doFetch } = useHackerNewsApi();

  return (
    <Fragment>
      ...
    </Fragment>
  );
}

*/
