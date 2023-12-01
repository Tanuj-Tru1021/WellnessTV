import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const CollectionsDetails = ({ route, navigation }) => {

  const { collections } = route.params
  const imageURL = 'https:' + collections.image.fields.file.url

  return (
    <View style={{ flex: 1 }}>
      <Header
        isHome={false}
        Title={collections.name}
        onPressBack={() => navigation.goBack()}
      />
      <View style={{ paddingBottom: 32 }}>
        <FlatList
          data={collections.videos}
          keyExtractor={item => item.fields.image.sys.id}
          style={{ marginBottom: 32 }}
          ListHeaderComponent={(
            <View>
              <Image
                src={imageURL}
                style={{ height: 350, width: '100%' }}
              />
              <View style={{ marginVertical: 12, marginHorizontal: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: 400, color: 'black' }}>
                  {collections.description}
                </Text>
              </View>
            </View>
          )}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ margin: 8, borderWidth: 2, borderColor: 'lightgrey' }}
                onPress={() => navigation.navigate('VideoDetails', {
                  name: item.fields.title,
                  imageURL: item.fields.image.fields.file.url,
                  description: item.fields.description,
                  videoURL: item.fields.url
                })}
              >
                <Image
                  src={'https:' + item.fields.image.fields.file.url}
                  style={{ height: 300, width: '100%' }}
                />
                <Text style={{
                  fontSize: 20, fontWeight: 500,
                  color: 'black', margin: 4
                }}>
                  {item.fields.title}
                </Text>
                <Text style={{
                  fontSize: 14, fontWeight: 400,
                  color: 'black', marginHorizontal: 4, marginBottom: 8
                }}>
                  {item.fields.description}
                </Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  )
}

export default CollectionsDetails