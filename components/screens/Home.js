import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS, Items } from '../database/Database'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Home = ({ navigation }) => {

    const [products, SetProducts] = useState([]);
    const [accessory, setAccesory] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        });

        return unsubscribe;
    }, [navigation])

    const getDataFromDB = () => {
        let productsList = []
        let accessoryList = []
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].category == "product") {
                productsList.push(Items[index])
            } else if (Items[index].category == "accessory") {
                accessoryList.push(Items[index])
            }
        }

        SetProducts(productsList);
        setAccesory(accessoryList);
    }
    //süslü parantezin nedeni buraya geçirilen her datanın bir obje olması bunu biz denicez obje olmayan bir parametre ile
    const ProductCard = ({ data }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductInfo',{ productID : data.id }) }
                style={{
                    width: '48%',
                    marginVertical: 14,
                    alignItems: 'flex-start',
                }}
            >
                <View style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 8,
                    backgroundColor: COLOURS.backgroundLight,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8

                }}>
                    {
                        data.isOff ? (
                            <View style={{
                                position: 'absolute',
                                width: '20%',
                                height: '24%',
                                backgroundColor: COLOURS.green,
                                top: 0,
                                left: 0,
                                borderTopLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text>{data.offPercentage}</Text>
                            </View>
                        ) : null
                    }
                    <Image source={data.productImage}
                        style={
                            {
                                width: '80%',
                                height: '80%',
                                resizeMode: 'contain'
                            }}
                    ></Image>
                </View>

                <Text style={{
                    fontSize: 12,
                    fontWeight: '800',
                    color: COLOURS.black,
                    marginBottom: 2
                }}>{data.productName}</Text>
                {
                    data.category == 'accessory' ? data.isAvailable ? (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <FontAwesome name='circle' style={{
                                fontSize: 12, marginRight: 6, color: COLOURS.green
                            }}></FontAwesome>
                            <Text>Avaliable</Text>
                        </View>
                    ) : (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <FontAwesome name='circle' style={{
                                fontSize: 12, marginRight: 6, color: COLOURS.red
                            }}></FontAwesome>
                            <Text>Unavaliable</Text>
                        </View>
                    ) : null
                }
                <Text>{data.productPrice}</Text>
            </TouchableOpacity >
        )
    }

    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLOURS.white,
        }}>
            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content"></StatusBar>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 16
                }}>
                    <TouchableOpacity>
                        <Entypo name="shopping-bag"
                            style={{
                                fontSize: 18,
                                color: COLOURS.backgroundMedium,
                                padding: 12,
                                borderRadius: 10,
                                backgroundColor: COLOURS.backgroundLight,
                            }}></Entypo>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
                        <MaterialCommunityIcons name="cart"
                            style={{
                                fontSize: 18,
                                color: COLOURS.backgroundMedium,
                                padding: 12,
                                borderRadius: 10,
                                borderColor: COLOURS.backgroundLight
                            }}
                        ></MaterialCommunityIcons>
                    </TouchableOpacity>

                </View>
                <View style={{
                    padding: 16,
                    marginBottom: 10,
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '400',
                        color: COLOURS.black,
                        letterSpacing: 1,
                        marginBottom: 15
                    }}>Hi-Fi Shop & Service</Text>

                    <Text style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: COLOURS.black,
                        letterSpacing: 1,
                    }}>İstanbul'da bir müzik mağazası</Text>
                </View>

                <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 18,
                            color: COLOURS.black,
                            fontWeight: '500',
                            letterSpacing: 1

                        }}>Products</Text>
                        <Text style={{
                            fontSize: 14,
                            color: COLOURS.black,
                            fontWeight: '400',
                            opacity: 0.5,
                            marginLeft: 10
                        }}>41</Text>
                    </View>

                    <Text style={{
                        fontSize: 14,
                        color: COLOURS.blue,
                        fontWeight: '400'
                    }}>See All</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap'
                }}>
                    {
                        products.map((data) => {
                            return (
                                <ProductCard data={data} key={data.id}></ProductCard>
                            )
                        })
                    }
                </View>


                <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 18,
                            color: COLOURS.black,
                            fontWeight: '500',
                            letterSpacing: 1

                        }}>Accessory</Text>
                        <Text style={{
                            fontSize: 14,
                            color: COLOURS.black,
                            fontWeight: '400',
                            opacity: 0.5,
                            marginLeft: 10
                        }}>41</Text>
                    </View>

                    <Text style={{
                        fontSize: 14,
                        color: COLOURS.blue,
                        fontWeight: '400'
                    }}>See All</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap'
                }}>
                    {
                        accessory.map((data) => {
                            return (
                                <ProductCard data={data} key={data.id}></ProductCard>
                            )
                        })
                    }
                </View>
            </ScrollView>

        </View>
    )
}

export default Home