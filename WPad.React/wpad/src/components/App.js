import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "../sass/main.scss";
import Header from "./Header/Header";
import Register from "./Authentication/Register";
import BrowseChannels from "./Pages/Browse/BrowseChannels";
import Home from "./Pages/Home/Home";
import EntryPage from "./Pages/Entry/EntryPage";
import UserPage from "./Pages/UserPage/UserPage";
import EditUser from "./Pages/UserPage/EditUser";
import ChannelPage from "./Pages/Channel/ChannelPage";
import EntryRemoveModal from "./Pages/Home/EntryRemoveModal";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user">
          <Route path=":username" element={<UserPage />}></Route>
          <Route path="edit/:username" element={<EditUser />} />
        </Route>
        <Route path="entry/:id" element={<EntryPage />} />
        <Route path="register" element={<Register />} />
        <Route path="channels" element={<BrowseChannels />} />
        <Route path="channels/:id" element={<ChannelPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
