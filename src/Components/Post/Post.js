import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {GlobalContext} from '../../services/GlobalContext';
import {globalStyle} from '../../services/GlobalStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import VideoContainer from '../VideoContainer/VideoContainer';
import TwitterTextView from 'react-native-twitter-textview';
import {TouchableOpacity} from 'react-native-gesture-handler';

const window = Dimensions.get('window');

const Post = (props) => {
  const {State, StateDispatch} = React.useContext(GlobalContext);
  const {avatar, dark} = State;
  const {DarkBackground, LightBackground, Darktext, LightText} = globalStyle;
  const {height, width} = window;

  return (
    <View style={styles.postCard}>
      <View
        style={[
          styles.homeProfileContainer,
          dark ? DarkBackground : LightBackground,
        ]}>
        <Image
          source={{uri: props.posterImage}}
          style={styles.homeProfileRoundedImage}
        />
        <View style={styles.homeProfileTextContainer}>
          <Text
            style={[styles.homeProfileNameText, dark ? Darktext : LightText]}>
            {props.posterName}
          </Text>
          <Text
            style={[styles.homeProfileTimeText, dark ? Darktext : LightText]}>
            {props.postTime}&nbsp;.&nbsp;
            <FontAwesome5
              name={'globe-asia'}
              color={dark ? Darktext.color : LightText.color}
            />
          </Text>
        </View>
      </View>
      {props.postText ? (
        <View
          style={[
            styles.postTextContainer,
            dark ? DarkBackground : LightBackground,
          ]}>
          <TwitterTextView
            style={[
              styles.postText,
              {color: dark ? Darktext.color : LightText.color},
            ]}
            hashtagStyle={{color: '#ffa500', fontWeight: 'bold'}}
            mentionStyle={{color: '#55b246', fontWeight: 'bold'}}>
            {props.postText}
          </TwitterTextView>
        </View>
      ) : null}

      {props.url ? (
        <View style={{widht: Dimensions.get('window').width, height: 300}}>
          {props.urlType === 'video' ? (
            <VideoContainer url={props.url} />
          ) : (
            <Image
              source={{uri: props.url}}
              style={[styles.postContent, {width: width, height: 300}]}
            />
          )}
        </View>
      ) : null}

      {!props.saved && (
        <React.Fragment>
          <View
            style={[
              styles.activityContainer,
              dark ? DarkBackground : LightBackground,
            ]}>
            <View
              style={{
                ...styles.activityIconContainer,
                flexDirection: 'column',
              }}>
              <FontAwesome5 name={'heart'} size={20} color={'#ffa500'} />
              <Text
                style={{
                  color: dark ? Darktext.color : LightText.color,
                  top: 5,
                }}>
                like
              </Text>
            </View>
            <View
              style={{
                ...styles.activityIconContainer,
                flexDirection: 'column',
              }}>
              <FontAwesome5 name={'share-alt'} size={20} color={'#ffa500'} />
              <Text
                style={{
                  color: dark ? Darktext.color : LightText.color,
                  top: 5,
                }}>
                share
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => props.save()}
              style={{
                ...styles.activityIconContainer,
                flexDirection: 'column',
              }}>
              <FontAwesome5 name={'clone'} size={20} color={'#ffa500'} />
              <Text
                style={{
                  color: dark ? Darktext.color : LightText.color,
                  top: 5,
                }}>
                save
              </Text>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      )}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postCard: {
    flex: 1,
    marginTop: 0.5,
    backgroundColor: '#ffffff',
  },
  postContainer: {
    backgroundColor: '#000000',
  },
  homeProfileContainer: {
    flexDirection: 'row',
    borderColor: '#ffffff',
    alignItems: 'center',
    padding: 10,
  },
  homeProfileRoundedImage: {
    width: 40,
    height: 40,
    borderRadius: 150 / 2,
  },
  homeProfileNameText: {
    fontSize: 15,
    letterSpacing: 5,
    marginLeft: 10,
    alignContent: 'space-between',
  },
  homeProfileTextContainer: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  homeProfileTimeText: {
    fontSize: 10,
    letterSpacing: 1,
    marginLeft: 10,
  },
  activityContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityIconContainer: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postTextContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    justifyContent: 'center',
    alignContent: 'stretch',
  },
  postText: {
    justifyContent: 'center',
    alignItems: 'baseline',
    alignSelf: 'baseline',
    letterSpacing: 1,
    lineHeight: 25,
  },
});
