import React from 'react';
import * as CONSTS from '../shared/constants';
import StatsComponents from './index';
import PropTypes from 'prop-types';

export default function Total(props) {

  const { user } = props;

  return (
      <div className={`${CONSTS.APP_CLASS_PREFIX}info`}>
          <StatsComponents.UserInfo 
              className={`${CONSTS.APP_CLASS_PREFIX}userinfo`}
              classPrefix={`${CONSTS.APP_CLASS_PREFIX}userinfo`}
              info={user.info}
          />
          <StatsComponents.AnimeStats 
              className={`${CONSTS.APP_CLASS_PREFIX}info_animeStats`}
              stats={user.info.anime_stats}
              type="anime"
          />
          <StatsComponents.MangaStats  
              className={`${CONSTS.APP_CLASS_PREFIX}info_mangaStats`}
              stats={user.info.manga_stats}
              type="manga"
          />
          <StatsComponents.Scores  
              className={`${CONSTS.APP_CLASS_PREFIX}info_animeScores`}
              stats={user.animelist}
              type="anime"
              title="Anime Scores Distribution"
          />
          <StatsComponents.Scores 
              className={`${CONSTS.APP_CLASS_PREFIX}info_mangaScores`}
              stats={user.mangalist}
              type="manga"
              title="Manga Scores Distribution"
          />
          <StatsComponents.Timeline
            classPrefix={`${CONSTS.APP_CLASS_PREFIX}info_animeTimeline`}
            list={user.animelist}
            title="Anime Timeline"
          >
          </StatsComponents.Timeline>
          <StatsComponents.Timeline
            classPrefix={`${CONSTS.APP_CLASS_PREFIX}info_mangaTimeline`}
            list={user.mangalist}
            title="Manga Timeline"
          >
          </StatsComponents.Timeline>
      </div>
  );
}

Total.propTypes = {
    user: PropTypes.object.isRequired,
};