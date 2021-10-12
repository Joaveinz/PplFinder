import { useEffect, useState } from "react";

import ls from "local-storage";

export const getFavourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFavourites();
  }, []);

  async function fetchFavourites() {
    setIsLoading(true);
    const response = ls.get("favourites");
    setIsLoading(false);
    setFavourites(response);
  }

  return { favourites, isLoading, fetchFavourites };
};

