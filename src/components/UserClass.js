import React from "react";
import UserContext from "../utils/UserContext";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      userInfo: {
        name: "",
        location: "",
        company: "",
      },
    };
    // console.log(this.props.name + " child constructor");
  }

  async componentDidMount() {
    console.log(this.props.name + " child componentDidMount");
    const data = await fetch("https://api.github.com/users/jssourav");
    const json = await data.json();
    this.setState({
      userInfo: json,
    });
  }

  componentWillUnmount() {
    console.log("componentWillUnmount()");
  }

  render() {
    // console.log(this.props.name + " child render");
    const { count, userInfo } = this.state;
    const { name, location, company, avatar_url } = userInfo;
    console.log(userInfo, "userInfo");
    return (
      <div className="user-card">
        <h2>Count: {count}</h2>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          Increment Count
        </button>
        <div>
          <img src={avatar_url} />
        </div>
        <UserContext.Consumer>
          {(data) => <h2>{data.loggedinUser}</h2>}
        </UserContext.Consumer>
        <h2>{name}</h2>
        <h3>Location: {location}</h3>
        <h4>Company: {company}</h4>
      </div>
    );
  }
}
export default UserClass;
