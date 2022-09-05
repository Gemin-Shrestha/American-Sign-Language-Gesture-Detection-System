// Group 4: Rudraksh Sharma Gemin Shrestha Sagaljyot Singh


import 'regenerator-runtime/runtime'
import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechtoText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
       <div style={{ marginTop: '2em' }}>
      <h1
        className="text-center text-heading"
        style={{ marginBottom: '0.5em',color: 'red',fontSize:'40px',marginLeft:'10px'}}
      >
  Speech to Text Recognition
      </h1>
      <p  className="text-center " style={{ fontSize:'40px',ontWeight: 'bold', marginTop: '4em' }}> {transcript}</p>
    
      </div>
         <p  className="text-center " style={{ fontSize:'40px',ontWeight: 'bold', marginTop: '3em' }}> Microphone: {listening ? 'on' : 'off'}</p>
      <button style={{fontSize:'30px', background:'Red',marginLeft:'430px' ,color:'White'}}onClick={SpeechRecognition.startListening}>Start</button>
      <button style={{fontSize:'30px', background:'Red',marginLeft:'10px',color:'White'}}onClick={SpeechRecognition.stopListening}>Stop</button>
      <button style={{fontSize:'30px', background:'Red',marginLeft:'10px',color:'White'}}onClick={resetTranscript}>Reset</button>
      <p  className="text-center " style={{ fontSize:'20px',ontWeight: 'bold', marginTop: '13em' }}>  ©&nbsp; 2022 &nbsp;Made by &nbsp;&nbsp;&nbsp; Rudraksh Sharma  &nbsp; &nbsp;&nbsp;     Gemin Shrestha  &nbsp;&nbsp;&nbsp;      Sagaljyot Singh
</p>
    </div>
  );
};

export default SpeechtoText;
