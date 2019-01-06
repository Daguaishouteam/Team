import React from 'react';
import { Radio, Input } from 'antd';


const RadioGroup = Radio.Group;

export class ResultList extends React.Component {
  state = {
    value: 1,
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  componentDidMount() {
    console.log("DidMount",this.props.dataSource);
  }

  render() {
    console.log("resultList dataSource",this.props.dataSource);
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <RadioGroup onChange={this.onChange} value={this.state.value}>
        <Radio style={radioStyle} value={1}>{this.props.dataSource.formatted_address}</Radio>
      </RadioGroup>
    );
  }
}