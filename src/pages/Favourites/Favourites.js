import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { getFavourites } from "hooks";
import * as S from "./style";


const Favourites = () => {
  const { favourites, isLoading } = getFavourites();

  return (
    <S.Favourites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder 222
          </Text>
        </S.Header>
        <UserList users={favourites} isLoading={isLoading} />
      </S.Content>
    </S.Favourites>
  );
};

export default Favourites;
