import React from 'react';
import { connect } from 'react-redux';
import {
  ListItem,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Thumbnail
} from 'native-base';
import Swipeout from 'react-native-swipeout';
import { Alert, FlatList, Platform, View } from 'react-native';
import SearchBarView from './SearchBarView';
import {
  showContactImportDialog,
  syncContact,
  setContactAttribute
} from '../actions';
import AppNavigatorConfig from '../AppNavigatorConfig';
import BaseCallToAction from './BaseCallToAction';
import { getProcessedContacts } from '../selectors';
import commonTheme from '../../native-base-theme/variables/platform';

const unknown = require('../../img/avatar.png');

const CommunityScreen = props => {
  if (props.items.length == 0)
    return (
      <BaseCallToAction
        icon="people"
        title="Lista de la Comunidad"
        text="Puede importar desde tus contactos los nombres de los hermanos de la comunidad y usarlos al crear las listas"
        buttonHandler={() => props.contactImport()}
        buttonText="Importar contactos"
      />
    );
  return (
    <SearchBarView>
      <FlatList
        data={props.items}
        keyExtractor={item => item.recordID}
        renderItem={({ item }) => {
          var contactFullName =
            Platform.OS == 'ios'
              ? `${item.givenName} ${item.familyName}`
              : item.givenName;

          var flags = (
            <View style={{ flexDirection: 'row' }}>
              {item.s === true && (
                <Icon
                  name="musical-notes"
                  style={{ marginRight: 4, color: commonTheme.brandPrimary }}
                />
              )}
            </View>
          );
          var swipeoutBtns = [
            {
              text: 'Salmista',
              type: 'primary',
              onPress: () => {
                props.contactToggleAttibute(item, 's');
              }
            },
            {
              text: 'Eliminar',
              type: 'delete',
              onPress: () => {
                props.contactDelete(item);
              }
            }
          ];
          return (
            <Swipeout
              right={swipeoutBtns}
              backgroundColor="white"
              autoClose={true}>
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    small
                    source={
                      item.hasThumbnail ? { uri: item.thumbnailPath } : unknown
                    }
                  />
                </Left>
                <Body>
                  <Text>{item.givenName}</Text>
                  <Text note>{contactFullName}</Text>
                </Body>
                <Right>{flags}</Right>
              </ListItem>
            </Swipeout>
          );
        }}
      />
    </SearchBarView>
  );
};

const mapStateToProps = state => {
  return {
    items: getProcessedContacts(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    contactDelete: contact => {
      Alert.alert(`Eliminar "${contact.givenName}"`, '¿Confirma el borrado?', [
        {
          text: 'Eliminar',
          onPress: () => dispatch(syncContact(contact, false)),
          style: 'destructive'
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]);
    },
    contactImport: () => {
      dispatch(showContactImportDialog());
    },
    contactToggleAttibute: (contact, attribute) => {
      dispatch(setContactAttribute(contact, attribute));
    }
  };
};

/* eslint-disable no-unused-vars */
const ImportContacts = props => {
  return (
    <Icon
      name="sync"
      style={{
        marginTop: 4,
        marginRight: 8,
        width: 32,
        fontSize: 30,
        textAlign: 'center',
        color: AppNavigatorConfig.navigationOptions.headerTitleStyle.color
      }}
      onPress={() => props.contactImport()}
    />
  );
};

const ImportContactsButton = connect(mapStateToProps, mapDispatchToProps)(
  ImportContacts
);

CommunityScreen.navigationOptions = props => ({
  title: 'Comunidad',
  tabBarIcon: ({ focused, tintColor }) => {
    return (
      <Icon
        name="contacts"
        active={focused}
        style={{ marginTop: 6, color: tintColor }}
      />
    );
  },
  headerRight: <ImportContactsButton />
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunityScreen);