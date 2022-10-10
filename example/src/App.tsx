import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { multiply } from 'react-native-teads-sdk-module';
import MyView from '../../src/my-view';
import Teads from '../../src/teads';
import TeadsAdPlacementSettings from '../../src/teads-ad-placement-settings';
import TeadsAdRequestSettings from '../../src/teads-ad-request-settings';
import TeadsInReadAdPlacement from '../../src/teads-inread-ad-placement';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();
  const [showAd, setShowAd] = React.useState<boolean>(false);
  const [adId, setAdId] = React.useState<String>('testid');

  React.useEffect(() => {
    multiply(1, 2).then(setResult);
  }, []);

  var testAdPlacementSetting = new TeadsAdPlacementSettings();
  var testAdRequestSettings = new TeadsAdRequestSettings();
  var placement: TeadsInReadAdPlacement | undefined;

  console.log(TeadsInReadAdPlacement);

  //mettre async/await
  async function onPress(this: any) {
    await testAdPlacementSetting.RNdisableCrashMonitoring();

    console.log('TeadsAdPlacementSettings', testAdPlacementSetting.mapValue);

    await testAdRequestSettings.RNpageUrl('www.example.com');
    console.log('TeadsAdRequestSettings', testAdRequestSettings.mapValue);

    //test Teads
    placement = await Teads.RNcreateInReadPlacement(
      128779,
      testAdPlacementSetting
    );

    await placement?.RNrequestAd(testAdRequestSettings).then(setAdId);
    console.log('TeadsPlacement requestAd', adId);

    //TODO implemente
    multiply(2, 2).then(setResult);
  }
  function onPressAd(this: any) {
    setShowAd(!showAd);
  }

  let ad;
  // if (showAd) {
  //   ad = (
  //     <MyView
  //       style={{
  //         height: 400,
  //         width: 400,
  //       }}
  //       adId={adId}
  //     ></MyView>
  //   );
  // } else {
  //   ad = <></>;
  // }

  showAd
    ? (ad = (
        <MyView
          style={{
            height: 400,
            width: 400,
          }}
          adId={adId}
        ></MyView>
      ))
    : (ad = <></>);

  return (
    <View style={styles.container}>
      <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={onPress}
      />
      <Text>Result: {result}</Text>
      <Button title="show ad" color="#841584" onPress={onPressAd} />
      {ad}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
