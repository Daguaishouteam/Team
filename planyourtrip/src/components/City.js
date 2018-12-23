import {Input} from 'antd';
import React from 'react';
import PropTypes from "prop-types";

const Search = Input.Search;


export class City extends React.Component {

  //the method begin from here
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context);
  }


  //this method is not safe in the future!!!
  handleSearch = (value) => {
    console.log(value)
    this.context.router.history.push("/plan");

  }

  render() {
    return(
      <div className='City'>
      <Search
        placeholder="Input your dream city!!!"
        enterButton="Search"
        size="large"
        onSearch={this.handleSearch}
      />
      </div>
    );
  }
}
