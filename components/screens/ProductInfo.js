import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, Animated, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLOURS, Items } from '../database/Database'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductInfo = ({ route, navigation }) => {

  const { productID } = route.params;
  const [product, setProduct] = useState({});

  const scrollX = new Animated.Value(0);
  const width = Dimensions.get('window').width;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation])


  const getDataFromDB = async () => {
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id == productID) {
        await setProduct(Items[index]);
        return;
      }
    }
  };

  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={item}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };


  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Eşya karta eklendi.',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }

    else {
      let array = [];
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Eşya karta eklendi.',
          ToastAndroid.SHORT,
        );
      } catch (error) {
        return error;
      }
    }
  }

  return (
    <View>
      <StatusBar
        barStyle={'dark-content'} backgroundColor={COLOURS.backgroundLight}
      ></StatusBar>

      <ScrollView>

        <View style={{ width: '100%', backgroundColor: COLOURS.backgroundMedium, padding: 16 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo name='chevron-left' style={{
                fontSize: 18,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.white,
                borderRadius: 50
              }}></Entypo>
            </TouchableOpacity>
          </View>

          <FlatList

            data={product.productImageList ? product.productImageList : null}
            horizontal
            renderItem={(item) => renderProduct(item)}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false },
            )}

          ></FlatList>
        </View>

        <View style={{
          width: '100%',
          padding: 10,
        }}>
          <View style={{
            marginBottom: 20,
            flexDirection: 'row',
          }}>

            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: COLOURS.blue,
                marginRight: 6,
              }}
            />

            <Text style={{
              fontSize: 14,
              color: COLOURS.blue
            }}>Shopping</Text>

          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10
          }}>
            <Text style={{
              letterSpacing: 2,
              fontSize: 24,
              maxWidth: '85%',
              fontWeight: '600',
              color: COLOURS.black
            }}>{product.productName}</Text>

            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: COLOURS.blue,
                backgroundColor: COLOURS.blue + 10,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </View>

          <Text style={{

            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '400',
            letterSpacing: 1,
            opacity: 0.5,
            lineHeight: 20,
            maxWidth: '85%',
            maxHeight: 44,
            marginBottom: 18,

          }}>{product.description}</Text>

        </View>

        <View style={{
          width: '100%',
          backgroundColor: COLOURS.backgroundLight,
          padding: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <View style={{
            width: '80%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{
              width: '20%',
              padding: 16,
              backgroundColor: COLOURS.backgroundLight,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 200,
              marginRight: 10
            }}>
              <Entypo
                name="location-pin"
                style={{
                  fontSize: 16,
                  color: COLOURS.blue,
                }}
              />
            </View>

            <View style={{
            }}>
              <Text>Rustaveli Ave 57,{'\n'}17-001, Batume</Text>
            </View>

          </View>

          <View style={{

          }}>
            <Entypo
              name="chevron-right"
              style={{
                fontSize: 22,
                color: COLOURS.backgroundDark,
              }}
            />
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              maxWidth: '85%',
              color: COLOURS.black,
              marginBottom: 4,
            }}>
            &#8377; {product.productPrice}.00
          </Text>
          <Text>
            Tax Rate 2%~ &#8377;{product.productPrice / 20} (&#8377;
            {product.productPrice + product.productPrice / 20})
          </Text>
        </View>

        <View style={{
          width: '100%',
          marginTop: 15,
          alignItems: 'center',

        }}>
          <TouchableOpacity
            onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
            style={{
              backgroundColor: COLOURS.blue,
              width: '80%',
              alignItems: 'center',
              padding: 20,
              borderRadius: 60

            }}>
            <Text style={{
              fontSize: 14,
              color: COLOURS.white,
              fontWeight: '600',
              textTransform: 'uppercase'
            }}>
              {product.isAvailable ? 'Add to cart' : 'Not Avaliable'}
            </Text>
          </TouchableOpacity>


        </View>



      </ScrollView >
    </View >
  )
}


export default ProductInfo