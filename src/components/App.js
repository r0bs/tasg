import React, {Component} from 'react'
import Filter from './Filter'
import Search from '../containers/Search'
import AddTaskContainer from '../containers/AddTaskContainer'
import TasksContainer from '../containers/TasksContainer'
import LoginButtonContainer from '../containers/LoginButtonContainer'
import Tasklists from '../containers/Tasklists'
import MobileTopbar from './MobileTopbar'
import Sidebar from './Sidebar'
import Logo from './Logo'
import ClearFinished from "./ClearFinished"
import UpdateOverdue from "./UpdateOverdue"
import Actions from "./Actions"
//import BottomMenuItem from '../components/BottomMenuItem'

export default class App extends Component {

  componentDidMount() {
    const el = document.getElementById('appload')
    if(el) {
      el.classList.add('hide')
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar>
            <Logo />  
            <LoginButtonContainer />
            <Filter />
            <Search />
            <Actions>
              <ClearFinished />
              <UpdateOverdue />
            </Actions>     
            <Tasklists />
          </Sidebar>

          <MobileTopbar />

          <AddTaskContainer />
          <TasksContainer />

        </div>
      </div>
    )
  }
  
}