import './App.css';
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      history: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3001/phones")
      .then(res => res.json())
      .then(
        (result) => {
          let phoneArr = [];
          result.forEach(element => {
            phoneArr.push(element.phone);
          });
          this.setState(prevState => ({
            history: phoneArr
          }))
        }
      )
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = { "phone": this.element.value };
    fetch("http://localhost:3001/phones", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState(prevState => ({
            array: [...prevState.array, {"Number": this.element.value, "Result": JSON.stringify(result)}],
            history: [...prevState.history, this.element.value]
          }))
        }
      )
  }

  handleDropdownChange(event) {
    event.preventDefault();
    this.element.value = event.target.value;
  }

  render() {
    return (
      <div className="main">
        <form onSubmit={this.handleSubmit}>
          <label>
            Phone: 
            <input type="number" required ref={el => this.element = el} />
          </label>
          <br />
          <label>
            History:
            <select name="history" onChange={this.handleDropdownChange}>
              {this.state.history.map((val, i) => 
                <option key={i} value={val}>
                  {val}</option>
              )}
            </select>
          </label>
          <br />
          <input type="submit" value="Validate" />
        </form>
        
        <table className="table">
          <thead>
            <tr>
              <th>History Number</th>
              <th>Validation Result</th>
            </tr>
          </thead>
          <tbody>
            {this.state.array.map((val, i) => 
              <tr key={i}>
                <td>{val.Number}</td>
                <td>{val.Result}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
