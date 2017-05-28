import React, {Component} from 'react'
import Filter from './Filter'
import Search from '../containers/Search'
import AddTaskContainer from '../containers/AddTaskContainer'
import TaskContainer from '../containers/TaskContainer'
import LoginButtonContainer from '../containers/LoginButtonContainer'
import Tasklists from '../containers/Tasklists'
import Sidebar from '../components/Sidebar'
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
            <LoginButtonContainer />
            <Filter />
            <Search />
            <Tasklists />
          </Sidebar>

          <AddTaskContainer />
          <TaskContainer />

          

        </div>
      </div>
    )
  }
  
}


// <div className="bottom-menu">
//             <BottomMenuItem />
//             <BottomMenuItem />
//             <BottomMenuItem />
//             <BottomMenuItem />
//           </div>