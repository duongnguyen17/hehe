// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   Dimensions,
//   useWindowDimensions,
// } from 'react-native';
// import { useBackHandler } from '@react-native-community/hooks';

// const windowDimensions = Dimensions.get('window');
// const screenDimensions = Dimensions.get('screen');

// const App = () => {
//   const [dimensions, setDimensions] = useState({
//     window: windowDimensions,
//     screen: screenDimensions,
//   });

//   const objUseDimen = useWindowDimensions();

//   useEffect(() => {
//     const subscription = Dimensions.addEventListener(
//       'change',
//       ({window, screen}) => {
//         setDimensions({window, screen});
//       },
//     );
//     return () => subscription?.remove();
//   });

//   // useBackHandler(() => {  })

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Window Dimensions useEffect</Text>
//       {Object.entries(dimensions.window).map(([key, value]) => (
//         <Text key={value}>
//           {key} - {value}
//         </Text>
//       ))}
//       <Text style={styles.header}>Use Windows Dimensions</Text>
//       {Object.entries(objUseDimen).map(([key, value]) => (
//         <Text key={value}>
//           {key} - {value}
//         </Text>
//       ))}
//       <Text style={styles.header}>Windows Dimensions</Text>
//       {Object.entries(windowDimensions).map(([key, value]) => (
//         <Text key={value}>
//           {key} - {value}
//         </Text>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 16,
//     marginVertical: 10,
//   },
// });

// export default App;
/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
// import React, {
//   memo,
//   useMemo,
//   useRef,
//   useState,
//   useEffect,
//   useCallback,
// } from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   ScrollView,
//   Button,
//   ActivityIndicator,
//   RefreshControl,
//   TouchableOpacity,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {
//   RecyclerListView,
//   DataProvider,
//   LayoutProvider,
//   BaseScrollView,
// } from 'recyclerlistview'; // Version can be specified in package.json

// const ViewTypes = {
//   FULL: 0,
//   HALF_LEFT: 1,
//   HALF_RIGHT: 2,
// };

// let containerCount = 0;

// const PAGESIZE = 4;

// const {width} = Dimensions.get('window');

// const ListView = memo(() => {
//   const [data, setData] = useState<Array<any>>([]);
//   const [loaded, setLoaded] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   const _layoutProvider = useRef(layoutMaker()).current;

//   const listView = useRef<any>();

//   const dataProvider = useMemo(() => dataProviderMaker(data), [data]);

//   const load = useCallback(
//     async (data: any, more = false) => {
//       try {
//         if (more) setIsLoadingMore(!!more);
//         else setIsLoading(true);

//         const resData = await fake(data);
//         setData(resData as Array<any>);
//       } catch (e) {
//         console.log(e);
//       } finally {
//         if (more) {
//           setIsLoadingMore(false);
//         } else {
//           setIsLoading(false);
//           setIsLoadingMore(false);
//           !loaded && setLoaded(true);
//         }
//       }
//     },
//     [loaded],
//   );

//   const loadMore = () => {
//     console.log('end');
//     load([...data, ...generateArray(PAGESIZE)], true);
//   };

//   const refresh = async () => {
//     load(generateArray(PAGESIZE));
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       //  listView?.scrollTo({y: 300, animated: true});
//     }, 5000);

//     load(generateArray(PAGESIZE));

//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [load]);

//   if (!loaded && isLoading)
//     return (
//       <ActivityIndicator
//         style={{marginTop: '50%', alignSelf: 'center'}}
//         size="large"
//       />
//     );

//   if (!data.length) return null;

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Button title="Refresh" onPress={() => refresh()} />
//       <RecyclerListView
//         ref={listView}
//         scrollViewProps={{
//           refreshControl: (
//             <RefreshControl
//               refreshing={loaded && isLoading}
//               onRefresh={() => refresh()}
//             />
//           ),
//         }}
//         renderFooter={() => <RenderFooter loading={isLoadingMore} />}
//         onEndReached={() => loadMore()}
//         onEndReachedThreshold={1000}
//         externalScrollView={ExternalScrollView}
//         layoutProvider={_layoutProvider}
//         dataProvider={dataProvider}
//         rowRenderer={rowRenderer}
//       />
//       <TouchableOpacity
//         onPress={() => loadMore()}
//         style={{
//           backgroundColor: 'blue',
//           marginBottom: 20,
//           paddingVertical: 20,
//           alignItems: 'center',
//         }}>
//         <Text style={{color: 'white', fontWeight: '700'}}>Load more</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// });

// const layoutMaker = () =>
//   new LayoutProvider(
//     index => {
//       if (index % 3 === 0) {
//         return ViewTypes.FULL;
//       } else if (index % 3 === 1) {
//         return ViewTypes.HALF_LEFT;
//       } else {
//         return ViewTypes.HALF_RIGHT;
//       }
//     },
//     (type, dim) => {
//       switch (type) {
//         case ViewTypes.HALF_LEFT:
//           dim.width = width / 2;
//           dim.height = 160;
//           break;
//         case ViewTypes.HALF_RIGHT:
//           dim.width = width / 2 - 0.001;
//           dim.height = 160;
//           break;
//         case ViewTypes.FULL:
//           dim.width = width;
//           dim.height = 160;
//           break;
//         default:
//           dim.width = 0;
//           dim.height = 0;
//       }
//     },
//   );

// const rowRenderer = (type: string | number, data: any) => {
//   switch (type) {
//     case ViewTypes.HALF_LEFT:
//       return (
//         <CellContainer style={styles.containerGridLeft}>
//           <Text>Data: {data}</Text>
//         </CellContainer>
//       );
//     case ViewTypes.HALF_RIGHT:
//       return (
//         <CellContainer style={styles.containerGridRight}>
//           <Text>Data: {data}</Text>
//         </CellContainer>
//       );
//     case ViewTypes.FULL:
//       return (
//         <CellContainer style={styles.container}>
//           <Text>Data: {data}</Text>
//         </CellContainer>
//       );
//     default:
//       return null;
//   }
// };

// const RenderFooter = ({loading}: {loading: boolean}) =>
//   loading ? (
//     <ActivityIndicator
//       style={{margin: 20, alignSelf: 'center', flex: 1}}
//       size="large"
//     />
//   ) : null;

// const dataProviderMaker = (data: any) =>
//   new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data);

// const generateArray = (n: number) => {
//   let arr = new Array(n);
//   for (let i = 0; i < n; i++) {
//     arr[i] = i;
//   }
//   return arr;
// };

// class ExternalScrollView extends BaseScrollView {
//   scrollTo = (args: any) => {
//     if (this._scrollViewRef) {
//       this._scrollViewRef.scrollTo(...args);
//     }
//   };
//   private _scrollViewRef: any;

//   render() {
//     return (
//       <ScrollView
//         {...this.props}
//         ref={scrollView => {
//           this._scrollViewRef = scrollView;
//         }}
//       />
//     );
//   }
// }

// function CellContainer(props: any) {
//   const {children, ...subProps} = props;
//   return (
//     <View {...subProps}>
//       {children}
//       <Text>Cell Id: {containerCount}</Text>
//     </View>
//   );
// }

// const fake = (data: any) => {
//   return new Promise(function (resolve, reject) {
//     try {
//       setTimeout(() => {
//         resolve(data);
//       }, 3000);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// export default ListView;

// const styles = {
//   container: {
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     flex: 1,
//     backgroundColor: 'orange',
//   },
//   containerGridLeft: {
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     flex: 1,
//     backgroundColor: 'yellow',
//   },
//   containerGridRight: {
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     flex: 1,
//     backgroundColor: 'blue',
//   },
// };

import React, {useEffect} from 'react';
import {View} from 'react-native';
import {AlanView} from '@alan-ai/alan-sdk-react-native';
import {NativeEventEmitter, NativeModules} from 'react-native';
const {AlanManager, AlanEventEmitter} = NativeModules;

const App = () => {
  useEffect(() => {
    const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

    const subscription = alanEventEmitter.addListener('command', data => {
      console.log(`got command event ${JSON.stringify(data)}`);
    });
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <AlanView
      projectid={
        '9bb4f8c665f5985eca79fcc63974b5ef2e956eca572e1d8b807a3e2338fdd0dc/stage'
      }
    />
  );
};

export default App;
