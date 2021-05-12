import React, {useState, useEffect} from 'react';
import { Searchbar, View, Divider} from 'react-native-paper';
import { useStyles } from './styles';
import { PersonList } from './PersonList';
import { light } from './styles';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <>
      <Divider style={{ height:'1%', backgroundColor:'#ffffff1f' }} />
      <Searchbar
        placeholder="Search For Friend"
        onChangeText={onChangeSearch}
        value={searchQuery}
        inputStyle={useStyles.searchBar}
        iconColor={light}
      />
      <PersonList query={searchQuery} navigation={navigation}/>
    </>
  );
};

export {SearchScreen};
