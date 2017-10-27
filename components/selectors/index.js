import { createSelector } from 'reselect';
import { getEsSalmo, getFriendlyTextForListType } from '../util';

const getLists = state => state.ui.get('lists');

export const getProcessedLists = createSelector(getLists, lists => {
  var listNames = lists.keySeq().toArray();
  return listNames.map(name => {
    var listMap = lists.get(name);
    return {
      name: name,
      type: getFriendlyTextForListType(listMap.get('type'))
    };
  });
});

const getSalmos = state => {
  return state.ui.get('salmos');
};

const getListFromNavigation = (state, props) => {
  return state.ui.getIn(['lists', props.navigation.state.params.list.name]);
};

export const getSalmosFromList = createSelector(
  getSalmos,
  getListFromNavigation,
  (salmos, listMap) => {
    var result = listMap.map((valor, clave) => {
      if (getEsSalmo(clave) && valor !== null) {
        return salmos.find(s => s.nombre == valor);
      }
      return valor;
    });
    return result;
  }
);

const getContactImportItems = state => state.ui.get('contact_import_items');

const getContacts = state => state.ui.get('contacts');

const ordenAlfabetico = (a, b) => {
  if (a.givenName < b.givenName) {
    return -1;
  }
  if (a.givenName > b.givenName) {
    return 1;
  }
  return 0;
};

const getCurrentRouteFilter = state => {
  const i = state.nav.index;
  const route = state.nav.routes[i];
  return route.params ? route.params.filter : null;
};

export const getCurrentRouteKey = state => {
  return state.nav.routes[state.nav.index].key;
};

export const getCurrentRouteContactsTextFilter = state => {
  return state.ui.getIn(['contacts_text_filter', getCurrentRouteKey(state)]);
};

export const getProcessedContactsForImport = createSelector(
  getContactImportItems,
  getContacts,
  (allContacts, importedContacts) => {
    var items = allContacts.map(c => {
      var found = importedContacts.find(x => x.get('recordID') === c.recordID);
      c.imported = found !== undefined;
      return c;
    });
    items.sort(ordenAlfabetico);
    return items;
  }
);

export const getFilteredContactsForImport = createSelector(
  getProcessedContactsForImport,
  getCurrentRouteContactsTextFilter,
  (contacts, text_filter) => {
    if (text_filter) {
      return contacts.filter(c => {
        return (
          c.givenName.toLowerCase().includes(text_filter.toLowerCase()) ||
          c.familyName.toLowerCase().includes(text_filter.toLowerCase())
        );
      });
    }
    return contacts;
  }
);

export const getProcessedContacts = createSelector(
  getContacts,
  importedContacts => {
    var contactsArray = importedContacts.toJS();
    contactsArray.sort(ordenAlfabetico);
    return contactsArray;
  }
);

export const getCurrentRouteSalmosTextFilter = state => {
  return state.ui.getIn(['salmos_text_filter', getCurrentRouteKey(state)]);
};

export const getCurrentRouteSalmos = createSelector(
  getSalmos,
  getCurrentRouteFilter,
  (salmos, filter) => {
    var items = [];
    if (salmos) {
      if (filter) {
        for (var name in filter) {
          items = salmos.filter(s => s[name] == filter[name]);
        }
      } else {
        items = salmos;
      }
    }
    return items;
  }
);

export const getProcessedSalmos = createSelector(
  getCurrentRouteSalmos,
  getCurrentRouteSalmosTextFilter,
  (salmos, text_filter) => {
    if (text_filter) {
      salmos = salmos.filter(s => {
        return s.nombre.toLowerCase().includes(text_filter.toLowerCase());
      });
    }
    return salmos;
  }
);

export const getShowSalmosBadge = createSelector(
  getCurrentRouteFilter,
  filter => {
    return filter == null || !filter.hasOwnProperty('etapa');
  }
);
