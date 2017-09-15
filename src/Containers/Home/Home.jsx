import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { filtersFetchData } from '../../actions/filters';
import { homePagePositionsFetchData } from '../../actions/homePagePositions';
import HomePage from '../../Containers/HomePage/HomePage';
import { FILTERS_PARENT, EMPTY_FUNCTION, HOME_PAGE_POSITIONS } from '../../Constants/PropTypes';
import { DEFAULT_HOME_PAGE_POSITIONS } from '../../Constants/DefaultProps';
import { PUBLIC_ROOT } from '../../login/DefaultRoutes';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proficiency: {},
      qString: null,
      searchText: { value: '' },
    };
  }

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(PUBLIC_ROOT);
    } else {
      this.getFilters();
      this.props.homePagePositionsFetchData();
    }
  }

  onChildSubmit(e) {
    this.props.onNavigateTo(e);
  }

  getFilters() {
    const { items } = this.props;
    this.props.fetchData(items);
  }

  render() {
    const { onNavigateTo, items, homePagePositions,
      homePagePositionsHasErrored, homePagePositionsIsLoading } = this.props;
    return (
      <div>
        <HomePage
          onNavigateTo={onNavigateTo}
          filters={items.filters}
          homePagePositions={homePagePositions}
          homePagePositionsHasErrored={homePagePositionsHasErrored}
          homePagePositionsIsLoading={homePagePositionsIsLoading}
        />
      </div>
    );
  }
}

Home.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  fetchData: PropTypes.func,
  items: FILTERS_PARENT,
  isAuthorized: PropTypes.func.isRequired,
  homePagePositionsFetchData: PropTypes.func,
  homePagePositions: HOME_PAGE_POSITIONS,
  homePagePositionsHasErrored: PropTypes.bool,
  homePagePositionsIsLoading: PropTypes.bool,
};

Home.defaultProps = {
  items: { filters: [] },
  fetchData: EMPTY_FUNCTION,
  hasErrored: false,
  isLoading: true,
  homePagePositionsFetchData: EMPTY_FUNCTION,
  homePagePositions: DEFAULT_HOME_PAGE_POSITIONS,
  homePagePositionsHasErrored: false,
  homePagePositionsIsLoading: true,
};

const mapStateToProps = state => ({
  items: state.filters,
  hasErrored: state.filtersHasErrored,
  isLoading: state.filtersIsLoading,
  homePagePositions: state.homePagePositions,
  homePagePositionsHasErrored: state.homePagePositionsHasErrored,
  homePagePositionsIsLoading: state.homePagePositionsIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchData: items => dispatch(filtersFetchData(items)),
  homePagePositionsFetchData: () => dispatch(homePagePositionsFetchData()),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
