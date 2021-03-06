/**
 *
 * @fanz
 */

import React from "react";
import {Badge, Drawer, FontIcon, IconButton, MenuItem, Paper} from 'material-ui';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {MuiThemeProvider} from "material-ui/styles/index";
import 'react-bootstrap'
import UserPage from "./userPage";
import ManagePage from "./managePage";
import {Link} from "react-router";
import './bottom_nav.css';

class BottomNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            open: false,
            name: ''
        }
    }

    reLogin() {
        //清楚登陆信息的缓存
        sessionStorage.clear()

    }


    select = (index) => this.setState({selectedIndex: index});

    adminBtn() {
        return (
            <div className="center">
                <Paper className="paper" zDepth={5}>
                    <h1>公告</h1>
                </Paper>
                <MuiThemeProvider>
                    <Drawer
                        open={this.state.open}
                        width={150}
                        docked={false}
                        openSecondary={true}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <MenuItem>
                            <FontIcon>
                                {sessionStorage.name}
                            </FontIcon>
                        </MenuItem>
                        <MenuItem>修改个人信息</MenuItem>
                        <MenuItem>发布公告</MenuItem>
                        <Link to={'/'} style={{'textDecoration': 'none'}}>
                            <MenuItem
                                onClick={this.reLogin}>重新登录
                            </MenuItem>
                        </Link>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }

    adminPage() {
        const select = this.state.selectedIndex;
        return (
            <div>
                {
                    select === 0 ? <UserPage/>
                        : select === 1 ? <ManagePage/>
                        : this.adminBtn()
                }
            </div>
        )
    }

    componentDidMount() {
        console.log(sessionStorage);
    }

    render() {

        const recentsIcon = <FontIcon className="material-icons">居民信息</FontIcon>;
        const favoritesIcon = <FontIcon className="material-icons">水电费管理</FontIcon>;
        const nearbyIcon = <FontIcon className="material-icons">系统操作</FontIcon>;

        return (
            <MuiThemeProvider>
                <Paper zDepth={1} className="nav_bottom">
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="user"
                            icon={recentsIcon}
                            onClick={() => {
                                this.select(0);
                            }}
                        />
                        <BottomNavigationItem
                            label="Favorites"
                            icon={favoritesIcon}
                            onClick={() => {
                                this.select(1)
                            }}
                        />
                        <BottomNavigationItem
                            label="setting"
                            icon={nearbyIcon}
                            onClick={(open) => {
                                this.select(2);
                                this.setState({open})
                            }}
                        />
                    </BottomNavigation>
                </Paper>
                {
                    this.adminPage()
                }
            </MuiThemeProvider>
        )
    }
}

export default BottomNav