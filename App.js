//import React, {Component} from 'react';
// import {StyleSheet, View, Button, PermissionsAndroid} from 'react-native';
// import {Buffer} from 'buffer';
// import Permission from 'react-native-permissions';
// import Sound from 'react-native-sound';
// import AudioRecord from 'react-native-audio-record';

// export default class App extends Component{
//   sound=null;
//   state={
//     audioFile:'',
//     recording:false,
//     loaded:false,
//     paused:true,
//   };

//   async componentDidMount() {
//     await this.checkPermission();

//     const options={
//       sampleRate:16000,
//       channels:1,
//       bitPerSample:16,
//       wavFile:'test.wav',
//     };

//     AudioRecord.init(options);

//     AudioRecord.on('data',data=>{
//       const chunk=Buffer.from(data,'base64');
//       console.log('chunk size',chunk.byteLength);

//     });

//     checkPermission=async()=>{

//       const granted=await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         {
//           title:"camera permission",
//           message:"application needs to access to the camera",
//           buttonNeutral:"Ask me later",
//           buttonNegative:"cancel",
//           buttonPositive:"ok"
//         }
//       );
//       const p=await Permissions.check('microphone');
//       console.log('permission check',p);
//       if(p==='authorized') return;
//       return this.requestPermission();
//     };

//     requestPermission= async()=>{
//       const p=await Permissions.request('microphone');
//       console.log('permission request',p);
//     };

//     start = () => {
//       console.log('start record');
//       this.setState({audioFile: '',recording:true,loaded:false});
//       AudioRecord:start();
//     };

//     stop=async () =>{
//       if(!this.state.recording) return;
//       console.log('stop record');
//       let audioFile=await AudioRecord.stop();
//       console.log('audioFile',audioFile); 
//       this.setState({audioFile,recording:false});
//     };

//     const load=()=>{
//       return new Promise((resolve,reject)=>{
//         if(!this.state.audioFile){
//           return reject('file path is empty');
//         }
        
        
//         this.sound=new sound(this.state.audioFile,'',error=>{
//           if(error){
//             console.log('failed to load the file',error);
//             return reject(error);
//           }

//           this.setState({loaded:true});
//           return resolve();
//         });

//       });
//     };

//     const play=async() =>{
//       if(!this.state.loaded){
//         try{
//           await this.load();
//         }
//         catch(error){
//           console.log(error);
//         }
//       }

//       this.sound.play(success=>{
//         if(success){
//           console.log('successfully finished playing');
//         }
//         else{
//           console.log('playback failed due to audio decoding errors');

//         }
//         this.setState({paused:true});
//       });
//     }checkPermission() {
//     throw new Error('Method not implemented.');
//   }
// ;

//    pause=()=>{
//     this.sound.pause();
//     this.setState({paused:true});
//    } ;

//    render() {
//     const {recording,paused,audioFile}=this.state;
//     return(
//       <View style={StyleSheet.container}>
//         <View style={StyleSheet.row}>
//           <Button onPress={this.state} title="Record" disabled={recording}/>
//           <Button onPress={this.stop} title="stop" disabled={!recording}/>
//           {paused ? (
//             <Button onPress={this.play} title="play" disabled={!audioFile}/>
            
//           ) :( <Button onPress={this.pause} title="Pause" disabled={!audioFile}/>
//           )}
//         </View>
//       </View>
//     );

//    }
//   }
//   checkPermission() {
//     throw new Error('Method not implemented.');
//   }
// }
//   const styles=StyleSheet.create({
//     container:{
//       flex:1,
//       justifyContent:'center',
//     },
//     row:{
//       flexDirection:'row',
//       justifyContent:'space-evenly',
//     },
//   });
import React, { Component } from 'react';
import { StyleSheet, View, Button, PermissionsAndroid } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';

export default class App extends Component {
  sound = null;
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true,
  };

  async componentDidMount() {
    await this.checkPermission();

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav',
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
    });
  }

  checkPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'This application needs access to your microphone.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    const p = await Permissions.check('microphone');
    console.log('permission check', p);

    if (p === 'authorized') return;

    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
    console.log('permission request', p);
  };

  start = () => {
    console.log('start record');
    this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;

    console.log('stop record');
    const audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);

    this.setState({ audioFile: audioFile, recording: false });
  };

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty');
      }

      this.sound = new Sound(this.state.audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }

        this.setState({ loaded: true });
        return resolve();
      });
    });
  };

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }

      this.setState({ paused: true });
    });

    this.setState({ paused: false });
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };

  render() {
    const { recording, paused, audioFile } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="Pause" disabled={!audioFile}/>
                      )}
                    </View>
                  </View>
                );
            
               }
              }
             
            
              const styles=StyleSheet.create({
                container:{
                  flex:1,
                  justifyContent:'center',
                },
                row:{
                  flexDirection:'row',
                  justifyContent:'space-evenly',
                },
              });
