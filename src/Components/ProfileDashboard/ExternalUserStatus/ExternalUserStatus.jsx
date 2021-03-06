import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from '../../ProfilePicture';
import Status from '../UserProfile/Status';
import USER_TYPES from '../../../Constants/UserTypes';
import MailToButton from '../../MailToButton';

const ExternalUserStatus = ({ name, type, showMail, email }) => (
  <div className="usa-grid-full cdo-container">
    <div className="usa-grid-full cdo-container-inner section-padded-inner-container">
      <div className="profile-picture-container">
        <ProfilePicture />
        <div className="picture-status-container">
          <Status hideText />
        </div>
      </div>
      <div className="cdo-text-container">
        <div className="usa-grid-full">
          <div className="usa-width-one-whole cdo-header">
            {USER_TYPES[type]}
          </div>
          <div className="usa-width-one-whole cdo-name">
            <span className="cdo-name-text">{name}</span>
            { showMail ? <MailToButton email={email} /> : null}
          </div>
        </div>
      </div>
    </div>
  </div>
);

ExternalUserStatus.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['cdo', 'ao', 'hr']).isRequired,
  showMail: PropTypes.bool,
  email: PropTypes.string,
};

ExternalUserStatus.defaultProps = {
  showMail: false,
  email: '',
};

export default ExternalUserStatus;
