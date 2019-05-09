import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const MenuList = ({ programmers, removeProgrammer }) => (
  <Fragment>
    <div className="leftContainer">
      <ul>
        {programmers.map(programmer => (
          <li key={programmer.id}>
            <div>
              <img className="Avatar" src={programmer.avatar} />
              <div className="programmerInfo">
                <h2>{programmer.name}</h2>
                <h3>{programmer.login}</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  removeProgrammer(programmer);
                }}
              >
                Rem
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </Fragment>
);

export default MenuList;
