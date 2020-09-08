<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/samwinslow/roughdraft-ai">
    <img src="src/assets/icon-144w.png" alt="Logo" width="144" height="144">
  </a>

  <h3 align="center">roughdraft</h3>

  <p align="center">
    Write smarter & faster with AI
    <br />
    Roughdraft is an AI writing assistant that learns about your topic & writing style.
    <br />
    <a href="http://roughdraft.ai/">View Live Beta</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
  * [Backend](#backend)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Roughdraft is an AI writing assistant that learns about your topic & writing style. It uses GPT-2 under the hood (If you have GPT-3 access and would like to contribute to this project, let me know!)

Although Roughdraft is open-source, we offer model training and hosting services for a monthly fee. See [roughdraft.ai](http://roughdraft.ai/).

### Built With
* [React](https://reactjs.org/)
* [React Router](https://reactrouter.com/)
* [Evergreen UI](https://evergreen.segment.com/) by Segment
* [styled-components](https://styled-components.com/)
* [AWS Amplify SDK](https://docs.amplify.aws/start/q/integration/react)

### Backend (not featured in this repo)
* [RunwayML](https://runwayml.com/)
* [Amazon Cognito](https://aws.amazon.com/cognito/)
* [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)


<!-- GETTING STARTED -->
## Getting Started

If you would like to run this locally, be advised that the backend code is not public at this time (although it will be soon).

### Prerequisites

* [yarn](https://classic.yarnpkg.com/en/)
* [AWS CLI](https://aws.amazon.com/cli/)

### Installation

1. Install packages
```sh
yarn install
```
2. Configure AWS secrets
```sh
amplify init
amplify add auth
amplify add hosting
```
3. Configure DynamoDB REST API: Instructions available soon
4. Start the frontend on localhost
```sh
yarn start
```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/samwinslow/roughdraft-ai/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**, however because I am charging active users for use of the prod environment (master branch), you may wish to fork it instead. If you are excited about this project, contact me and consider joining as a co-founder!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@sambwinslow](https://twitter.com/sambwinslow) - samwinslow `at` nyu `.` edu

Project Link: [https://github.com/samwinslow/roughdraft-ai](https://github.com/samwinslow/roughdraft-ai)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/samwinslow/roughdraft-ai/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/samwinslow/roughdraft-ai/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/samwinslow/roughdraft-ai/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/samwinslow/roughdraft-ai/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/samwinslow/roughdraft-ai/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/samuel-winslow-b4a76084/
