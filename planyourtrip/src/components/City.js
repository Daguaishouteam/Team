import {Input, InputNumber } from 'antd';
import React from 'react';
import PropTypes from "prop-types";

const Search = Input.Search;

export class City extends React.Component {

  state= {
    city: localStorage.getItem("city"),
    days: localStorage.getItem("days"),
  };
  tempcity = "null";


  //the method begin from here
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context);
  }


  //this method is not safe in the future!!!
  handleSearch = (value) => {
    localStorage.days = this.state.days;
    localStorage.city = value;
    this.context.router.history.push("/plan");
  }

  onChange = (value) => {
    this.setState({days:value,},() => {
      console.log(this.state.value)
    });
  }

  componentDidMount() {
    this.onChange(3);
  }

  render() {
    return(
      <div className='City'>
          <div> <span>You want to have a </span>
            <span>
              <InputNumber size="default" min={1} max={15} defaultValue={localStorage.getItem("days")} onChange={this.onChange} />
            </span> days trip,
            <div className="AND">
              AND
            </div>
            <div>Your dream city is:</div>
          </div>
      <Search
        placeholder="Input your dream city"
        enterButton="GO!"
        size="large"
        onSearch={this.handleSearch}
      />
      </div>
    );
  }
}
