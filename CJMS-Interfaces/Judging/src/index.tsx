// import { ReactDOM } from 'react-dom';
import React, {useState, useEffect } from 'react';
import {Login, CJMS_Application, useToken, comm_service, NavMenu, NavMenuContent } from '@cjms_interfaces/shared';
// import { CJMS_Application } from '@cjms_interfaces/shared';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import "./assets/stylesheets/application.scss";
import Display from './Display';

var navContent:NavMenuContent = {
  navCategories : [
    {
      name: "MainDisplay",
      links: [
        {
          name:"Main Display",
          path:"/",
          linkTo:<Display/>
        }
      ]
    }
  ]
}

function App() {
  return (
    <div className='judging-app'>
      <NavMenu navContent={navContent}/>
    </div>
  );
}

CJMS_Application(App);