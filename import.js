const fs = require('fs');

fs.readFile('questions.json', (err, data) => {
  const dataJSON = JSON.parse(data);
  let outstring = '';
  for (let i = 0; i < dataJSON.length; i++) {
    const output =
      'INSERT INTO question (id, questionString) VALUES (' +
      i +
      ", '" +
      dataJSON[i].questionString +
      "');\n";
    outstring += output;
  }

  fs.writeFile('out.json', outstring, (err) => {});
});
