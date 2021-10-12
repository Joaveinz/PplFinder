import React, { useState } from "react";
import axios from "axios";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const { users, isLoading } = usePeopleFetch();
  const [value, setValue] = React.useState("");
  const [realUsers, setRealUsers] = useState(null);
  const [isLoading2, setIsLoading] = useState(true);

  const getUsers = async (page) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await axios.get(`https://randomuser.me/api/?results=25&page=${page}`)
      .then(resp => {
        if (realUsers) {
          setRealUsers([...realUsers, ...resp.data.results]);
        } else {
          setRealUsers([...users, ...resp.data.results]);
        }

        setIsLoading(false);
      });
  };

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        {!realUsers && (
          <UserList users={users} isLoading={isLoading} onChange={getUsers} />
        )}
        {realUsers && (
          <UserList users={realUsers} isLoading={isLoading2} onChange={getUsers} />
        )}

      </S.Content>
    </S.Home>
  );
};

export default Home;
