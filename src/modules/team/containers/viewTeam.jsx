import React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import {CONFIG} from 'src/config/index';
import {withRouter} from 'react-router';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import TeamList from 'modules/team/components/TeamList';
import TeamDetails from 'modules/team/components/TeamDetails';
import LoadingIcon from 'components/generic/LoadingIcon';
import * as actionsLogin from 'appRedux/auth/actions/index';
import * as actionsGetTeamData from 'appRedux/team/actions/teamList';

class ViewTeam extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      empList:     [],
      all_Teams:   '',
      active:      'active',
      addNewTeam:  'row',
      viewTeam:    'hidden',
      firstArrow:  'show',
      secondArrow: 'hidden'
    };
    this.openPage = this.openPage.bind(this);
  }
  componentWillMount () {
    this.props.onFetchTeam();
    this.props.onFetchUserDetails('');
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    let isNotValid = isNotUserValid(this.props.route.path, props.logged_user.logged_in, props.policy_documents.policyDocuments);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }

    // if (props.logged_user.logged_in === -1) {
    //   this.props.router.push('/logout');
    // } else {
    //   if (props.logged_user.role === CONFIG.ADMIN) {
    //   } else {
    //     this.props.router.push('/home');
    //   }
    // }
  }

  openPage (toDisplay) {
    if (toDisplay === 'addNewTeam') {
      this.setState({
        addNewTeam:  'row',
        viewTeam:    'hidden',
        firstArrow:  'show',
        secondArrow: 'hidden'
      });
    } else {
      this.setState({
        addNewTeam:  'hidden',
        viewTeam:    'row',
        firstArrow:  'hidden',
        secondArrow: 'show'
      });
    }
  }

  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <div className="app-header white box-shadow">
            <div className="navbar">
              <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
                <i className="material-icons">&#xe5d2;</i>
              </a>
              <div className="navbar-item pull-left h5" id="pageTitle">
                 View Team
              </div>
            </div>
          </div>
          <div className="app-body" id="view">
            <div className="row">
              <div className="col-12">
                <LoadingIcon loading={this.props.frontend.show_loading} />
              </div>
            </div>
            <div className="dker p-x">
              <div className="row">
                <div className="col-sm-6 pull-sm-6">
                  <div className="p-y-md clearfix nav-active-primary">
                    <ul className="nav nav-pills nav-sm">
                      <li onClick={() => { this.openPage('addNewTeam'); }} className={`nav-item ${this.state.active}`}>
                        <a className="nav-link" href="" data-toggle="tab" data-target="#tab_1" aria-expanded="true">All Team</a>
                        <div className={this.state.firstArrow}><span className="arrow bottom b-accent"></span></div>
                      </li>
                      <li onClick={() => { this.openPage('viewTeam'); }} className="nav-item" style={{'marginLeft': '20px'}}>
                        <a className="nav-link" href="" data-toggle="tab" data-target="#tab_2" aria-expanded="false">Team Details</a>
                        <div className={this.state.secondArrow}><span className="arrow bottom b-accent"></span></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="padding">
              <div className={this.state.addNewTeam}>
              <TeamList {...this.props} />;
              </div>
              <div className={this.state.viewTeam}>
                <div className="col-xs-12 p-t p-r b-r">
                  <TeamDetails teamListData={this.props.teamList}
                    fetchUserDetails={this.props.onFetchUserDetails} {...this.props} />;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    frontend:         state.frontend.toJS(),
    logged_user:      state.logged_user.toJS(),
    policy_documents: state.policyDocuments.toJS(),
    usersList:        state.usersList.toJS(),
    employee:         state.empSalaryList.toJS(),
    teamList:         state.teamList.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actionsLogin.isAlreadyLogin());
    },
    onFetchTeam: () => {
      return dispatch(actionsGetTeamData.get_all_team());
    },
    onFetchUserDetails: (selectedTeam) => {
      return dispatch(actionsGetTeamData.get_team_candidate(selectedTeam));
    },
    onSaveTeam: (teams) => {
      return dispatch(actionsGetTeamData.saveTeam(teams));
    }
  };
};

const VisibleViewTeam = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTeam);

const RouterVisibleViewTeam = withRouter(VisibleViewTeam);

export default RouterVisibleViewTeam;
