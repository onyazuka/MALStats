import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function UserInfo(props) {
  const {image_url, username, gender, birthday, location, joined, last_online} = props.info;
  const { className, classPrefix } = props;
  return (
    <div className={className}>
      <div className={`${classPrefix}_container`}>
        <img
          alt={`${username}'s avatar`} 
          className={`${classPrefix}_avatar`} 
          src={image_url}
        />
        <p className={`${classPrefix}_username`}><span>Username: </span>{username ? username : "-"}</p>
        <p className={`${classPrefix}_gender`}><span>Gender: </span>{gender ? gender : "-"}</p>
        <p className={`${classPrefix}_birthday`}><span>Birthday: </span>{birthday ? birthday.substr(0, 10) : "-"}</p>
        <p className={`${classPrefix}_location`}><span>Location: </span>{location ? location : "-"}</p>
        <p className={`${classPrefix}_joined`}><span>Joined: </span>{joined ? joined.substr(0,10) : "-"}</p>
        <p className={`${classPrefix}_lastOnline`}><span>Last seen: </span>{last_online ? last_online.substr(0,10) : "-"}</p>
      </div>
    </div>
  )  
}

UserInfo.propTypes = {
  info: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  classPrefix: PropTypes.string.isRequired,
};

const StyledUserInfo = styled(UserInfo)`
  font-family: sans-serif;
  & p {
    font-size: .8rem;
  }
  & span {
    font-size: .8rem;
    font-weight: bold;
    font-family: cursive;
  };
  & img {
    max-width: 100%;
    box-shadow: 0 0 1px 1px grey;
  }

  text-align: center;
`;

export default StyledUserInfo;