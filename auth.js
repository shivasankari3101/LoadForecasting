      // TODO(developer): Set to client ID and API key from the Developer Console
      const CLIENT_ID = '450336897915-a368nuiihqv1rnk6v44ggfocd372jqu8.apps.googleusercontent.com';
      const API_KEY = 'AIzaSyBFV74bGgi64SPkcZSv-FCgghvD4jnx9WM';

      // Discovery doc URL for APIs used by the quickstart
      const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

      let tokenClient;
      let gapiInited = false;
      let gisInited = false;

      document.getElementById('authorize_button').style.visibility = 'hidden';
     

      /**
       * Callback after api.js is loaded.
       */
      function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
      }

      /**
       * Callback after the API client is loaded. Loads the
       * discovery doc to initialize the API.
       */
      async function initializeGapiClient() {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
      }

      /**
       * Callback after Google Identity Services are loaded.
       */
      function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
      }

      /**
       * Enables user interaction after all libraries are loaded.
       */
      function maybeEnableButtons() {
        if (gapiInited && gisInited) {
          document.getElementById('authorize_button').style.visibility = 'visible';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick() {
        tokenClient.callback = async (resp) => {
          if (resp.error !== undefined) {
            throw (resp);
          }

          for (const current of fileIds) {
            const obj = {};
            for (const val of current.predictions) {
              const content = await readFile(val);
              Object.assign(obj, content);
            }
            nodes.push(obj);
          }

          document.getElementById('authorize_button').style.visibility = 'hidden';
        
          drawChart("nextDay", "next day", 25);
          drawChart("nextWeek", "next week", 175);
          drawChart("nextMonth", "next month", 720);
        };

        if (gapi.client.getToken() === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          tokenClient.requestAccessToken({prompt: ''});
        }

       
      }

      /**
       * Print metadata for first 10 files.
       */
      async function readFile(fileId) {
        let response;
        try {
            response = await gapi.client.drive.files.get({
                fileId: fileId,
                alt: 'media',
            });
            const fileContent = response.result;
            const jsonData = JSON.parse(fileContent);
            return jsonData;

        } catch (err) {
            console.error('Error reading file:', err);
            return;
        }
      }