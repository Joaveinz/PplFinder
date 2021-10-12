import React, { useState, useCallback } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, useHistory } from 'react-router-dom';


const NavBar = () => {
  const [value, setValue] = useState(0);

  const history = useHistory();
  const goHome = useCallback(() => history.push('/'), [history]);
  const goFav = useCallback(() => history.push('/fav'), [history]);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" index={0} onClick={goHome} />
        <Tab label="Favourites" index={1}  onClick={goFav} />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
