import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BIDDER_LIST } from '../../../Constants/PropTypes';
import { scrollToTop } from '../../../utilities';
import BidderPortfolioList from '../BidderPortfolioList';
import PaginationWrapper from '../../PaginationWrapper/PaginationWrapper';
import Alert from '../../Alert/Alert';

class BidderPortfolioContainer extends Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
  }
  onPageChange(q) {
    scrollToTop();
    this.props.queryParamUpdate(q);
  }
  render() {
    const { bidderPortfolio, pageSize, pageNumber } = this.props;
    const noResults = bidderPortfolio.results.length === 0;
    return (
      <div className="usa-grid-full user-dashboard">
        <BidderPortfolioList results={bidderPortfolio.results} />
        {
           // if there's no results, don't show pagination
           !!bidderPortfolio.results && !!bidderPortfolio.results.length &&
           // finally, render the pagination
           <div className="usa-grid-full react-paginate">
             <PaginationWrapper
               totalResults={bidderPortfolio.count}
               pageSize={pageSize}
               onPageChange={this.onPageChange}
               forcePage={pageNumber}
             />
           </div>
        }
        {
          noResults &&
          <div className="usa-width-two-thirds">
            <Alert title="You have no clients within this search criteria." messages={[{ body: 'Try broadening your search.' }]} />
          </div>
        }
      </div>
    );
  }
}

BidderPortfolioContainer.propTypes = {
  bidderPortfolio: BIDDER_LIST.isRequired,
  pageSize: PropTypes.number.isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
};

export default BidderPortfolioContainer;