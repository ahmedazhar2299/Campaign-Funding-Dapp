# Nobiety - A Campaign Funding Dapp

## Installation

2. Clone the github repository.

   ```bash
   git clone https://github.com/ahmedazhar2299/Crowd-Funding-Dapp.git
   ```

3. Install Truffle globally.
   ```bash
   npm install -g truffle
   ```
4. Run the development console.
   ```bash
   truffle develop
   ```
5. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.

   ```bash
   compile
   migrate
   ```

6. Install dependencies for frontend. Smart contract changes must be manually recompiled and migrated.

   ```bash
   // Change directory to the front-end folder
   cd client/

   // Serves the front-end on http://localhost:3000
   npm install
   or
   yarn
   ```

7. Run the frontend using the following commands.
   ```bash
   npm run start
   or
   yarn start
   ```
