import { useEffect, useRef, useState } from 'react';
import service from '../services/service';
import 'regenerator-runtime/runtime'

const maxVideoSize = 224;
const LETTERS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '_NOTHING',
  '_SPACE',
];
const THRESHOLD = 5;

const THRESHOLDS = {
  S: 3,
  E: 5,
  A: 5,
  N: 6,
  R: 5,
};
export default function Page() {
  const videoElement = useRef(null);
  const canvasEl = useRef(null);
  const outputCanvasEl = useRef(null);
  let [letter, setLetter] = useState(null);
  let [loading, setLoading] = useState(true);
  let [fps, setFps] = useState(0);
  let [words, setWords] = useState('');

  
  async function processImage() {
    if (
      videoElement !== null &&
      canvasEl !== null &&
      typeof videoElement.current !== 'undefined' &&
      videoElement.current !== null
    ) {
      let frames = 0;
      let start = Date.now();
      let prevLetter = '';
      let count = 0;
      let _words = '';

          while (true) {
        const ctx = canvasEl.current.getContext('2d');
        ctx.drawImage(videoElement.current, 0, 0, maxVideoSize, maxVideoSize);
        const image = ctx.getImageData(0, 0, maxVideoSize, maxVideoSize);
        // Processing image
        const processedImage = await service.imageProcessing(image);
        // Render the processed image to the canvas
        const ctxOutput = outputCanvasEl.current.getContext('2d');
        ctxOutput.putImageData(processedImage.data.payload, 0, 0);

        const prediction = await service.predict(processedImage.data.payload);

        const predictedLetter = prediction.data.payload;
        const letterValue = LETTERS[predictedLetter];

        setLetter(letterValue);
        if (letterValue !== prevLetter) {
          if (
            !THRESHOLDS[prevLetter]
              ? count > THRESHOLD
              : count > THRESHOLDS[prevLetter]
          ) {
            if (prevLetter === '_SPACE') ;//processWord();
            else {
              _words = _words + (prevLetter === '_NOTHING' ? '' : prevLetter);
              setWords(
                (state, props) =>
                  state + (prevLetter === '_NOTHING' ? '' : prevLetter)
              );
            }
          }
          count = 0;
        } else {
          count++;
        }
        prevLetter = letterValue;
        frames++;
        if (frames === 10) {
          setFps(10 / ((Date.now() - start) / 1000));
          frames = 0;
          start = Date.now();
        }
      }

    }

  }

  useEffect(() => {
    async function initCamera() {
      videoElement.current.width = maxVideoSize;
      videoElement.current.height = maxVideoSize;

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: 'environment',
            width: maxVideoSize,
            height: maxVideoSize,
          },
        });
        videoElement.current.srcObject = stream;

        return new Promise((resolve) => {
          videoElement.current.onloadedmetadata = () => {
            resolve(videoElement.current);
          };
        });
      }
      const errorMessage =
        'This browser does not support video capture, or this device does not have a camera';
      alert(errorMessage);
      return Promise.reject(errorMessage);
    }

    async function load() {
      const videoLoaded = await initCamera();
      await service.load();
      videoLoaded.play();
      setTimeout(processImage, 0);
      setLoading(false);
      return videoLoaded;
    }

    load();
  }, []);

  return (
    <div style={{ marginTop: '2em' }}>
      <h1
        className="text-center text-heading"
        style={{ marginBottom: '0.5em',color: 'red' }}
      >
  American Sign Language gesture detection System
      </h1>
      <h6
        className="text-center text-heading"
        style={{ marginBottom: '0.8em', color: 'red'}}
      >  ( Group 04 )
      </h6>
    
<div>
      {loading && (
        <div className="row justify-content-center">
          <div className="col text-center">
            <div
              className="spinner-border"
              style={{ width: '8em', height: '8em', marginBottom: '2em' }}
              role="status"
            ></div>
          </div>
        </div>
      )}
      <div style={{ display: loading ? 'none' : 'block'  }}>
        <div className="row justify-content-center">
          <div className="col-xs-12 text-center">
            <video className="video" playsInline ref={videoElement} />
          </div>
          <canvas
            style={{ display: 'none' }}
            ref={canvasEl}
            width={maxVideoSize}
            height={maxVideoSize}
          ></canvas>
          <canvas
            className="col-xs-12"
            style={{ display: 'none' }}
            ref={outputCanvasEl}
            width={maxVideoSize}
            height={maxVideoSize}
          ></canvas>
        </div>

        <div
          className="row justify-content-center text-center"
          style={{ marginTop: '2em' }}
        >
          <div className="col-xs-12">
            <h5 className="text-letter">Predicted Alphabet:</h5>
            <h4
              className="text-letter"
              style={{
                borderRadius: 10,
                border: '2px solid #FFFFFF',
                padding: '0.5em',
              }}
            >
              {letter}
            </h4>
          </div>
        </div>
        <div
          className="row justify-content-center text-center"
          style={{ marginTop: '2em' }}
        >
          <div className="col-xs-12">
            <h3 className="text-words">Predicted Sentence:</h3>
            <h2
              className="text-words"
              style={{
                borderRadius: 10,
                border: '2px solid #FFFFFF',
                padding: '1em',
              }}
            >
              {words}
            </h2>
          </div>
        </div>
        
      </div>
      
      </div>
   <p  className="text-center " style={{ fontSize:'20px',ontWeight: 'bold', marginTop: '4em' }}>  ©&nbsp; 2022 &nbsp;Made by &nbsp;&nbsp;&nbsp; Rudraksh Sharma  &nbsp; &nbsp;&nbsp;     Gemin Shrestha  &nbsp;&nbsp;&nbsp;      Sagaljyot Singh
</p>
    </div>
  );
}
