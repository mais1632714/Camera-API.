import React, { useState, useEffect ,useRef} from 'react';
import { Text, View, TouchableOpacity , StyleSheet,SafeAreaView, TouchableOpacityProps, Modal , Image ,} from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

  export default function App() {
  const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto , setCapturedPhoto] = useState(null);
  const [open , SetOpen] = useState(false);
 
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

async function takePicture(){
  if (camRef){
    const data = await camRef.current.takePictureAsync();
    setCapturedPhoto(data.uri);
    SetOpen(true);
    console.log(data);
  }
}
 let openImagePickerAsync = async  () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    let data = await ImagePicker.launchImageLibraryAsync();
    console.log(data);
  }
  return (
    <SafeAreaView style={styles.container }>
      <Camera
       style={{ flex: 1 }}
        type={type}
        ref ={camRef}
        >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
        </View>
        </Camera>
   
<TouchableOpacity style={styles.button}onPress={ takePicture}>
<Text style={styles.instructions}>  take photo </Text>
<FontAwesome name ="window-close"size={20}color="#fff"/>
  </TouchableOpacity>
 <View style={styles.container}>
      <Image source={{uri :capturedPhoto}} style={styles.logo} />
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>  Photo Gallery </Text>
      </TouchableOpacity>
    </View>

  {capturedPhoto &&
  <Modal
  animationType ="slide"
  transparent={false}
  visible={open}
  >
<View style={{flex: 1, justifyContent:'center', alignItems:'center', margin :20}}>
<TouchableOpacity style={{margin: 10}} onPress={() => SetOpen(false)}>
<FontAwesome name ="window-close"size={50}color="#ff000"/>
</TouchableOpacity>

<Image
style={{ width: '100%', height:300,borderRadius:20}}
source={{uri :capturedPhoto}}
/>
    </View>
    </Modal>
}
</SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent :'center',
  },
  button:{
    justifyContent:'center',
    alignItems :'center',
    margin :20 ,
    borderRadius:10,
    height :20
  }
});