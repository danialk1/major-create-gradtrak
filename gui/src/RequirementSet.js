import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import RequirementCategoriesArray from './RequirementCategoriesArray';
import ResultDisplay from './ResultDisplay';
//https://www.sicara.ai/blog/2018-06-27-custom-nested-validated-forms-with-react please just copy this code
class RequirementSet extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.state = {
      data: {
        id: '',
        name: '',
        parentId: '',
        type: 'major',
        requirementCategories: [{name:'reqCatName', requirements: []}]
      },
    };
  }
  handleFieldChange = (field) => (event) => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
    console.log(field, event.target.value);
    this.setState({ data });
  }
  changeReqCategories = (event) => {
    let data = { ...this.state.data };
    data['requirementCategories'] = event.target.value;
    this.setState({ data });
  }
  showResult = (e)=> {
    e.preventDefault();
    let newState = {...this.state};
    newState.outputData = newState.data;
    this.setState(newState)
  }
  render() {
    const resultComponent = this.state.resultComponent
    console.log(resultComponent);
    return (
      <form>
        <div>
          <label for="id">id: </label>
          <input
            name="id"
            type="text"
            value={this.state.data.id}
            onChange={this.handleFieldChange('id')}
          />
        </div>
        <div>
          <label for="name">name: </label>
          <input
            name="name"
            type="text"
            value={this.state.data.name}
            onChange={this.handleFieldChange('name')}
          />
        </div>
        <div>
          <label for="parentId">parentId: </label>
          <input
            name="parentId"
            type="text"
            value={this.state.data.parentId}
            onChange={this.handleFieldChange('parentId')}
          />
        </div>
        <div>
          <label for="type">type: </label>
          <select
            name="type"
            value={this.state.data.type}
            onChange={this.handleFieldChange('type')}
          >
          <option value="major">major</option>
          <option value="minor">minor</option>
          <option value="other">other</option>
          </select>
        </div>
        <RequirementCategoriesArray
          value={this.state.data.requirementCategories}
          onChange={this.changeReqCategories}
        />
        <button onClick={this.showResult}>Done</button>
        <ResultDisplay output={this.state.outputData}/>
      </form>
  );
  }
}

export default RequirementSet;
