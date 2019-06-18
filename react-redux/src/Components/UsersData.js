import React, {Component} from 'react'
import {
    Text,
    SafeAreaView,
    ScrollView
} from 'react-native'
import UserList from './UserList'
import FAB from 'react-native-fab'
import {connect} from 'react-redux'
import {
    getAllUsers,
    deleteUser
} from '../Action/UserActions'

class UsersData extends Component {

    state = {
        userData: []
    }

    constructor(props) {
        super(props)
        console.disableYellowBox = true;
    }

    componentDidMount = async () => {
        this.props.getAllUsers()
    }

    deleteUser = (id) => {
        this.props.deleteUser(id)
    }

    componentWillReceiveProps(nextProps) {
        debugger
        this.setState({userData: nextProps.userData})
    }

    renderUserData() {
        if (this.state.userData.length > 0) {
            return this.state.userData.map(userRecord =>
                <UserList key={userRecord.id}
                          data={userRecord}
                          deleteUser={(id) => this.deleteUser(id)}
                          navigation={this.props.navigation}
                />
            )
        }
    }

    render() {
        debugger
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView bounces={false}>
                    {this.state.userData != null && this.renderUserData()}
                    {this.state.userData == null && <Text>{"No data found"}</Text>}
                </ScrollView>

                <FAB buttonColor="rgb(28,74,119)" onClickAction={() => this.props.navigation.navigate("AddUser")}/>
            </SafeAreaView>
        )
    }
}

mapStateToProps = state => {
    debugger
    return {
        userData: state.User.userData
    }
}

export default connect(mapStateToProps, {
    getAllUsers,
    deleteUser
})(UsersData)