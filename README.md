* In this project, your machine will randomly select an option from a list created by you. You have email/password authentication. You can add or remove 1 option, or you can remove them all. A user can delete or update his account.

* For this project I used Visual Studio Code, my OS is Ubuntu 18.04.
* heroku app link: https://random-decision.herokuapp.com/

* about:
  - To run this project you need to change process.env.RANDOM_DECISION_API (./src/index.js) with your enviroment variable or url. 
  - I created this project using create-react-app tool.
  - I used react lifecycle methods to handle custom functionality that gets executed during the different phases of a component.
  - I used react props system to pass data through components.
  - I run this project in heroku using a buildpack, --buildpack https://github.com/mars/create-react-app-buildpack.git.

* dependencies:
  - axios // used to handle server req.
  - node-sass // used to compile .scss files to css.
  - normalize.css // used for better cross-browser consistency.
  - react-router-dom // used to navigate between different components.
