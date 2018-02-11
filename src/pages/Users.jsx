import React, { Component } from 'react';
// import redux dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from 'redux/modules/users';
import { withDone } from 'react-router-server';

class Users extends Component {

  componentWillMount() {
    // 서버사이드에서도 데이터 로딩이 작동하기 위해서, 데이터 불러오는 작업을 componentWillMount 에서 호출합니다.
    const { UsersActions, data, done } = this.props;
    if(data.length !== 0) return false;
    UsersActions.getUsers().then(done, done);
    
  }

  render() {
    const { data } = this.props;
    // 유저 이름 목록을 생성합니다
    const userList = data.map(
      user => <li key={user.id}>{user.name}</li>
    );

    return (
      <ul>
        {userList}
      </ul>
    );
  }
}

export default withDone(connect(
  (state) => ({
    data: state.users.data
  }),
  (dispatch) => ({
    UsersActions: bindActionCreators(usersActions, dispatch)
  })
)(Users));