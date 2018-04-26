## Development mode

The preferred package manager is `yarn`. Install it with `npm i -g yarn`.   
To start development mode run:

    yarn start
    
This will start `webpack-dev-server`, `typescript` compiler and `jest` test runner in watch mode.

## Production build

On CI run:

    yarn build
This will create the production, minified bundle as well as 
run the lint check and tests (in parallel). 
 
