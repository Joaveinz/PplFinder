import React, { useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import ls from "local-storage";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [countryFilter, setCountryFilter] = useState([]);
  const [favourites, setFavourites] = useState(null);

  const filterCountry = (target) => {
    if (!countryFilter?.includes(target.value) && target.checked) {
      setCountryFilter([...countryFilter, target.value]);
    } else if (!target.checked) {
      setCountryFilter(countryFilter.filter(s => s !== target.value));
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const toggleFavourite = (user) => {
    let currentFavs = ls.get("favourites");
    let ids = currentFavs.map(f => f.login.uuid);
    let newFavs = [];
    if (!ids?.includes(user.login.uuid)) {
      newFavs = [...currentFavs || [], user];
      user.fav = true;
    } else {
      newFavs = currentFavs.filter(u => u.login.uuid !== user.login.uuid);
      user.fav = false;
    }
    ls.set("favourites", newFavs);
    if (window.location.hash == "#/fav") {
      setFavourites(newFavs);
    }
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox onChange={event => filterCountry(event.target)} value="BR" label="Brazil" />
        <CheckBox onChange={event => filterCountry(event.target)} value="AU" label="Australia" />
        <CheckBox onChange={event => filterCountry(event.target)} value="CA" label="Canada" />
        <CheckBox onChange={event => filterCountry(event.target)} value="DE" label="Germany" />
        <CheckBox onChange={event => filterCountry(event.target)} value="US" label="USA" />
      </S.Filters>
      {favourites && (
        <S.List>
          {favourites?.filter(user => {
            if (countryFilter.length) {
              return countryFilter?.includes(user?.nat);
            } else {
              return true;
            }
          }).map((user, index) => {
            return (
              <S.User
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <S.UserPicture src={user?.picture.large} alt="" />
                <S.UserInfo>
                  <Text size="22px" bold>
                    {user?.name.title} {user?.name.first} {user?.name.last}
                  </Text>
                  <Text size="14px">{user?.email}</Text>
                  <Text size="14px">
                    {user?.location.street.number} {user?.location.street.name}
                  </Text>
                  <Text size="14px">
                    {user?.location.city} {user?.location.country}
                  </Text>
                </S.UserInfo>
                <S.IconButtonWrapper isVisible={index === hoveredUserId || user.fav}>
                  <IconButton onClick={event => toggleFavourite(user)}>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>
              </S.User>
            );
          })}
          {isLoading && (
            <S.SpinnerWrapper>
              <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
            </S.SpinnerWrapper>
          )}
        </S.List>
      )}
      {!favourites && (
        <S.List>
          {users?.filter(user => {
            if (countryFilter.length) {
              return countryFilter?.includes(user?.nat);
            } else {
              return true;
            }
          }).map((user, index) => {
            return (
              <S.User
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <S.UserPicture src={user?.picture.large} alt="" />
                <S.UserInfo>
                  <Text size="22px" bold>
                    {user?.name.title} {user?.name.first} {user?.name.last}
                  </Text>
                  <Text size="14px">{user?.email}</Text>
                  <Text size="14px">
                    {user?.location.street.number} {user?.location.street.name}
                  </Text>
                  <Text size="14px">
                    {user?.location.city} {user?.location.country}
                  </Text>
                </S.UserInfo>
                <S.IconButtonWrapper isVisible={index === hoveredUserId || user.fav}>
                  <IconButton onClick={event => toggleFavourite(user)}>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>
              </S.User>
            );
          })}
          {isLoading && (
            <S.SpinnerWrapper>
              <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
            </S.SpinnerWrapper>
          )}
        </S.List>
      )}
    </S.UserList>
  );
};

export default UserList;
