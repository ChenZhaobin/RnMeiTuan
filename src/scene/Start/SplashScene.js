/**
 * Created by liuyan on 2017/12/22.
 */
import React, {Component} from 'react';
import {
    View, Image, Animated, StyleSheet, StatusBar, Easing, AsyncStorage,Dimensions
} from 'react-native';

import NavigationDispatchUtil from '../../navigation/NavigationDispatchUtil';
export default class Splash extends Component {


    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            // scaleAnim: new Animated.Value(1.0),
        }

    }

    componentDidMount() {
        /*app进入逻辑见https://www.processon.com/diagraming/5a44a9a7e4b078cf1ed100d0*/
        this.timer = setTimeout(() => {
            AsyncStorage.multiGet(['isFirst', 'hasChoose'])
                .then((result) => {
                    if (null === result[0][1] || "0" === result[0][1]) {
                        NavigationDispatchUtil.reset(this.props.navigation, 'Guide')
                    } else {
                        if ("1" === result[1][1]) {
                            NavigationDispatchUtil.reset(this.props.navigation, 'Main')
                        } else {
                            NavigationDispatchUtil.reset(this.props.navigation, 'Choose')
                        }
                    }
                })
                .catch((error) => {
                    NavigationDispatchUtil.reset(this.props.navigation, 'Choose')
                });

        }, 3000);

        // this.startAnimation();
    }

    // startAnimation() {
    //     Animated.timing(this.state.scaleAnim, {
    //         toValue: 1.1,
    //         delay: 800,
    //         duration: 2000,
    //         easing: Easing.linear
    //     }).start();
    // }

    componentWillUnmount() {
        // this.timer && clearTimeout(this.timer);
    }


    render() {
        // let imgUrl = {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513922873838&di=dff798e71c22567bdfa873cf21ed16de&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201606%2F26%2F20160626230529_rxJNL.jpeg'};
        return (
            <View style={styles.main}>
                <StatusBar animated={true} hidden={true} translucent={true}/>
                <Image source={require('../../img/splash.png')} resizeMode={Image.resizeMode.cover}
                       style={styles.img}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    img: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }

})