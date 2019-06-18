import React, {Component} from 'react'
import {View, Text, Image, ListView, StatusBar} from 'react-native'
import {connect} from 'react-redux'
import styles from './styles/HomeScreenStyles'
import appStyles from '../theme/ApplicationStyles'
import CocktailRow from '../component/CocktailRow'
import CocktailsActions from '../redux/CocktailsRedux'
import {Images} from '../theme'
import AnimatedEllipsis from 'react-native-animated-ellipsis'

class HomeScreen extends Component {


    componentDidMount() {
        this.props.getAllCocktails();
    }

    componentWillReceiveProps(nextProps) {
        debugger
        if (this.props.cocktails.cocktails !== nextProps.cocktails.cocktails) {

            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            this.setState({
                dataSource: ds.cloneWithRows(nextProps.cocktails.cocktails)
            })
        }
        debugger
    }

    renderRow(details) {
        debugger
        return (
            <CocktailRow {...details} />
        )
    }


    render() {
        const IS_LOADING = this.props.cocktails.fetching === true
        const HAS_ERROR = this.props.cocktails.error === true

        return (
            <View style={appStyles.screen.container}>
                <View style={appStyles.screen.header}>
                    <Image source={Images.logo} style={styles.logo}></Image>
                    <Text style={styles.statusBarTitle}>Cocktails</Text>
                </View>
                {HAS_ERROR && <Text style={styles.infoMessage}>Error fetching data</Text>}
                {IS_LOADING &&
                <View style={{flexDirection: 'row', justifyContent: 'center'}}><Text style={styles.infoMessage}>Making
                    Cocktails </Text><AnimatedEllipsis style={styles.ellipsis}
                                                       minOpacity={0.2}/></View>}
                {!IS_LOADING && !HAS_ERROR &&
                <ListView contentContainerStyle={styles.gridCocktails}
                          dataSource={this.state.dataSource}
                          renderRow={(rowData) => this.renderRow(rowData)}
                />
                }
            </View>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        cocktails: state.cocktails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCocktails: () => dispatch(CocktailsActions.getCocktailsRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)