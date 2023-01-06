import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg'


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: {},
    }
  }

  calculateFaceLocation = (data) => {
    const faces = JSON.parse(data, null, 2).outputs[0].data.regions
    const clarifaiFaces = faces.map(face => face.region_info.bounding_box)
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes =
      clarifaiFaces.map(clarifaiFace => {
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height,
        };
      })
    return boxes
  }


  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
    console.log(boxes)
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "clarifai",
        "app_id": "main"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.input
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key dc909b76df6646348782f475407e883b'
      },
      body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
      .then(response => response.text())
      .then(result =>
        this.displayFaceBox(this.calculateFaceLocation(result))
      )
      .catch(error => console.log('error', error));

  }

  render() {
    return (
      <div className="App" >
        <>
          <div>...</div>
          <ParticlesBg
            color="#FFFFFF"
            num={200}
            type="cobweb"
            bg={true} />
        </>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
