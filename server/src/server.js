const app = require("./app");
const port = 3300;

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
